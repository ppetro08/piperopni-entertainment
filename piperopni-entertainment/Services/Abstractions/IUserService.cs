using piperopni_entertainment_api.Authenticate;
using piperopni_entertainment_api.Models;
using piperopni_entertainment_api.Models.Authenticate;

namespace piperopni_entertainment_api.Services.Abstractions
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
}
