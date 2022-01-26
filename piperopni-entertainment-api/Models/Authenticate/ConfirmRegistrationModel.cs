using System.ComponentModel.DataAnnotations;

namespace piperopni_entertainment_api.Models.Authenticate
{
    public class ConfirmRegistrationModel
    {
        [Required]
        public int UserId { get; set; }
        [Required]

        public string Token { get; set; }
    }
}
