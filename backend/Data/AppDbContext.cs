using CrudApi.Models;
using Microsoft.EntityFrameworkCore;
namespace CrudApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Person> People => Set<Person>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>(entity =>
            {
                entity.Property(p => p.Name).HasMaxLength(100).IsRequired();
                entity.Property(p => p.Address).HasMaxLength(255).IsRequired();
                entity.Property(p => p.State).HasMaxLength(100).IsRequired();
                entity.Property(p => p.District).HasMaxLength(100).IsRequired();
                entity.Property(p => p.Language).HasMaxLength(20).IsRequired();
                entity.Property(p => p.DateOfBirth).HasColumnType("date");
            });
        }
    }

}
