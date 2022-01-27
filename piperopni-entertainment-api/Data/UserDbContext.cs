using Microsoft.EntityFrameworkCore;
using piperopni_entertainment_api.Models;
using piperopni_entertainment_api.Models.Configuration;

namespace piperopni_entertainment_api.Database
{
    public class UserDbContext : DbContext
    {
        public IConfiguration _configuration { get; }

        public DbSet<UserModel> Users { get; set; }

        public UserDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionStringSettings = _configuration.GetSection("ConnectionStrings").Get<ConnectionStringSettingsModel>();
            optionsBuilder.UseMySql(connectionStringSettings.DefaultConnection, ServerVersion.AutoDetect(connectionStringSettings.DefaultConnection));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>()
                .Property(p => p.CreateDate)
                .HasDefaultValueSql()
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<UserModel>()
                .Property(p => p.UpdateDate)
                .HasDefaultValueSql()
                .ValueGeneratedOnUpdate();
        }
    }
}
