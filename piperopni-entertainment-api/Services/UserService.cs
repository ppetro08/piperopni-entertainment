﻿using AutoMapper;
using piperopni_entertainment_api.Database;
using piperopni_entertainment_api.Models;
using WebApi.Helpers;
using piperopni_entertainment_api.Models.Authenticate;
using piperopni_entertainment_api.Authenticate;
using piperopni_entertainment_api.Services;
using piperopni_entertainment_api.Data;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

namespace piperopni_entertainment_api.Providers
{
    public interface IUserService
    {
        public IEnumerable<UserModel> GetAll();
        public UserModel GetUserById(int id);
        public UserModel? GetUserByEmail(string email);
        public UserModel? GetConfirmedUserByEmail(string email);
        public void Register(RegisterModel registerModel);
        public void ConfirmRegistration(ConfirmRegistrationModel confirmRegistrationModel);
        public AuthenticateResponseModel AuthenticateUser(AuthenticateModel loginModel);
    }

    public class UserService : IUserService
    {
        private readonly UserDbContext _userDbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        public readonly EmailConfirmationDbContext _emailConfirmationDbContext;

        public UserService(
            UserDbContext userDbContext,
            EmailConfirmationDbContext emailConfirmationDbContext,
            IMapper mapper, 
            IConfiguration configuration, 
            IEmailService emailService
        )
        {
            _userDbContext = userDbContext;
            _emailConfirmationDbContext = emailConfirmationDbContext;
            _mapper = mapper;
            _configuration = configuration;
            _emailService = emailService;
        }

        public IEnumerable<UserModel> GetAll()
        {
            return _userDbContext.Users;
        }

        public UserModel GetUserById(int id)
        {
            var user = _userDbContext.Users.SingleOrDefault(u => u.UserId == id);

            if (user == null)
            {
                throw new AppException($"No user exists with the id of {id}.");
            }

            return user;
        }

        public UserModel? GetUserByEmail(string email)
        {
            var user = _userDbContext.Users.SingleOrDefault(u => u.Email == email);
            return user;
        }

        public UserModel? GetConfirmedUserByEmail(string email)
        {
            var user = _userDbContext.Users.SingleOrDefault(u => u.Email == email && u.EmailConfirmed);
            return user;
        }

        public int Create(RegisterModel createUserModel)
        {
            if (_userDbContext.Users.Any(u => u.Email == createUserModel.Email))
            {
                throw new AppException($"User with the email {createUserModel.Email} already exists.");
            }

            var user = _mapper.Map<UserModel>(createUserModel);
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            var test = _userDbContext.Users.Add(user);
            _userDbContext.SaveChanges();
            return test.Entity.UserId;
        }

        public void Register(RegisterModel registerModel)
        {
            var existingUser = GetUserByEmail(registerModel.Email);
            if (existingUser != null)
            {
                throw new AppException($"Username {registerModel.Email} is already taken.");
            }
            // TODO:P - rollback if errors

            var userId = Create(registerModel);
            var token = Guid.NewGuid();
            var emailConfirmation = new EmailConfirmationModel
            {
                Token = token,
                UserId = userId,
            };
            _emailConfirmationDbContext.Add(emailConfirmation);
            _emailConfirmationDbContext.SaveChanges();

            _emailService.SendEmailAsync(registerModel.Email, "Piperopni Entertainment Registration", $"http://localhost:4200/authentication/confirm-registration?userId={userId}&token={token}");
        }

        public void ConfirmRegistration(ConfirmRegistrationModel confirmRegistrationModel)
        {
            var emailConfirmation = _emailConfirmationDbContext.EmailConfirmations.SingleOrDefault(ec => ec.UserId == confirmRegistrationModel.UserId);
            if (emailConfirmation == null || emailConfirmation.Token.ToString() != confirmRegistrationModel.Token)
            {
                throw new AppException("Email registration token no longer valid.");
            }

            var user = _userDbContext.Users.Single(u => u.UserId == confirmRegistrationModel.UserId);
            user.EmailConfirmed = true;
            _userDbContext.Update(user);
            _userDbContext.SaveChanges();
        }

        public AuthenticateResponseModel AuthenticateUser(AuthenticateModel loginModel)
        {
            var user = GetConfirmedUserByEmail(loginModel.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginModel.Password, user.Password))
            {
                throw new AppException($"Username or password is incorrect.");
            }

            var response = _mapper.Map<AuthenticateResponseModel>(user);
            response.Token = generateJwtToken(user);
            return response;
        }

        private string generateJwtToken(UserModel user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("Jwt:Key").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Audience = _configuration["Jwt:Issuer"],
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = _configuration["Jwt:Issuer"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.UserId.ToString()) }),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
