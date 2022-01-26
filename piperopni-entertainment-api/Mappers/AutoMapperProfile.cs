using AutoMapper;
using piperopni_entertainment_api.Authenticate;
using piperopni_entertainment_api.Models;
using piperopni_entertainment_api.Models.Authenticate;

namespace piperopni_entertainment_api.Mappers
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<RegisterModel, UserModel>();
            CreateMap<UserModel, AuthenticateResponseModel>();

            // User -> AuthenticateResponse
            //CreateMap<User, AuthenticateResponse>();

            // RegisterRequest -> User
            //CreateMap<RegisterRequest, User>();

            // UpdateRequest -> User
            //CreateMap<UpdateRequest, User>()
            //    .ForAllMembers(x => x.Condition(
            //        (src, dest, prop) =>
            //        {
            //            // ignore null & empty string properties
            //            if (prop == null) return false;
            //            if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

            //            return true;
            //        }
            //    ));
        }
    }
}
