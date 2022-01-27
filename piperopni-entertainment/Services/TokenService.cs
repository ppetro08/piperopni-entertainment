using piperopni_entertainment_api.Data;
using piperopni_entertainment_api.Models.Tokens;
using piperopni_entertainment_api.Services.Abstractions;

namespace piperopni_entertainment_api.Providers
{
    public class TokenService : ITokenService
    {
        private readonly TokenDbContext _tokenDbContext;

        public TokenService(TokenDbContext tokenDbContext)
        {
            _tokenDbContext = tokenDbContext;
        }

        public IEnumerable<TokenModel> GetAll()
        {
            return _tokenDbContext.Tokens;
        }
    }
}
