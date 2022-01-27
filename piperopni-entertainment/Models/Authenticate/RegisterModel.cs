using piperopni_entertainment_api.Models;
using System.ComponentModel.DataAnnotations;

namespace piperopni_entertainment_api.Authenticate
{
    public class RegisterModel: IUser
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
    }
}
