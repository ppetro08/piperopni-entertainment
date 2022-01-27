using Microsoft.AspNetCore.Mvc;
using piperopni_entertainment_api.Attributes;
using piperopni_entertainment_api.Services.Abstractions;

namespace piperopni_entertainment_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll(); 
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult UserById(int id)
        {
            var user = _userService.GetUserById(id);
            return Ok(user);
        }

        [HttpGet(nameof(CurrentUser))]
        public IActionResult CurrentUser()
        {
            return Ok(HttpContext.Items["User"]);
        }
    }
}
