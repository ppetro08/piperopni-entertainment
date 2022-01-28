using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using piperopni_entertainment_api.Authenticate;
using piperopni_entertainment_api.Models.Authenticate;
using piperopni_entertainment_api.Services.Abstractions;

namespace piperopni_entertainment_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IUserService _userService;

        public IMapper _mapper { get; }

        public AuthenticateController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost(nameof(Login))]
        public IActionResult Login([FromBody] AuthenticateModel data)
        {
            var user = _userService.AuthenticateUser(data);

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost(nameof(Register))]
        public IActionResult Register([FromBody] RegisterModel data)
        {
            _userService.Register(data);

            return Ok(new
            {
                Message = "User registered"
            });
        }

        [AllowAnonymous]
        [HttpPost(nameof(ConfirmRegistration))]
        public IActionResult ConfirmRegistration([FromBody] ConfirmRegistrationModel data)
        {
            _userService.ConfirmRegistration(data);

            return Ok(new
            {
                Message = "Confirmed user registration"
            });
        }
    }
}
