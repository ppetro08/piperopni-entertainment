using piperopni_entertainment_api.Models.Tokens;

namespace piperopni_entertainment_api.Services.Abstractions
{
    public interface ITokenService
    {
        public IEnumerable<TokenModel> GetAll();
    }
}
