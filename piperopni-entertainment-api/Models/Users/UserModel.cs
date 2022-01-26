using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace piperopni_entertainment_api.Models
{
    public class UserModel: IUser
    {
        [Key]
        public int UserId { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        [JsonIgnore]
        public string Password { get; set;} 
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
