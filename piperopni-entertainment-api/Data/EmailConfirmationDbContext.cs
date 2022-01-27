using Microsoft.EntityFrameworkCore;
using piperopni_entertainment_api.Models.Authenticate;
using piperopni_entertainment_api.Models.Configuration;

namespace piperopni_entertainment_api.Data
{
    public class EmailConfirmationDbContext : DbContext
    {
        public IConfiguration _configuration { get; }

        public DbSet<EmailConfirmationModel> EmailConfirmations { get; set; }

        public EmailConfirmationDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // TODO:P - Better way to do this so it's not repeated in every context file
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionStringSettings = _configuration.GetSection("ConnectionStrings").Get<ConnectionStringSettingsModel>();
            optionsBuilder.UseMySql(connectionStringSettings.DefaultConnection, ServerVersion.AutoDetect(connectionStringSettings.DefaultConnection));
        }
    }
}
