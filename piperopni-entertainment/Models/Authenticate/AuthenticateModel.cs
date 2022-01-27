using System.ComponentModel.DataAnnotations;

namespace piperopni_entertainment_api.Authenticate
{
    public class AuthenticateModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
