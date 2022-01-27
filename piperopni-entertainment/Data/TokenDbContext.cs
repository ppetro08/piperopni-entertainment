using Microsoft.EntityFrameworkCore;
using piperopni_entertainment_api.Models;
using piperopni_entertainment_api.Models.Configuration;
using piperopni_entertainment_api.Models.Tokens;

namespace piperopni_entertainment_api.Data
{
    public class TokenDbContext : DbContext
    {
        public IConfiguration _configuration { get; }

        public DbSet<TokenModel> Tokens { get; set; }

        public TokenDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionStringSettings = _configuration.GetSection("ConnectionStrings").Get<ConnectionStringSettingsModel>();
            optionsBuilder.UseMySql(connectionStringSettings.DefaultConnection, ServerVersion.AutoDetect(connectionStringSettings.DefaultConnection));
        }
    }
}
