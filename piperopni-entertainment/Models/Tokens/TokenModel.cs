using System.ComponentModel.DataAnnotations;

namespace piperopni_entertainment_api.Models.Tokens
{
    public class TokenModel
    {
        [Key]
        public int TokenId { get; set; }
        public string Name { get; set; }
        public string Key { get; set; }
    }
}
