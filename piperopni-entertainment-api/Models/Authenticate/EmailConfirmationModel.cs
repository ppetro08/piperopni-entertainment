using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace piperopni_entertainment_api.Models.Authenticate
{
    [Table("email_confirmation")]
    public class EmailConfirmationModel
    {
        [Key]
        public int EmailConfirmationId { get; set; }
        public int UserId { get; set; }
        public Guid Token { get; set; }
    }
}
