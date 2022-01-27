using Microsoft.AspNetCore.Mvc;
using piperopni_entertainment_api.Services.Abstractions;

namespace piperopni_entertainment_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokensController : ControllerBase
    {
        private readonly ITokenService _tokenService;

        public TokensController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var tokens = _tokenService.GetAll();
            return Ok(tokens);
        }
    }
}
