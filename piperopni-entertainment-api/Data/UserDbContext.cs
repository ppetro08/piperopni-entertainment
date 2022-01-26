using Microsoft.EntityFrameworkCore;
using piperopni_entertainment_api.Models;

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
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
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
