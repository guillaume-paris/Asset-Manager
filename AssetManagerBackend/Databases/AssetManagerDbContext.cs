using AssetManagerBackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.ValueGeneration;

public class DateTimeGenerator : ValueGenerator<DateTime>
{
    public override DateTime Next(EntityEntry entry) => DateTime.UtcNow;
    public override bool GeneratesTemporaryValues => false;
}

namespace AssetManagerBackend.Databases
{
    public class AssetManagerDbContext : DbContext
    {
        public AssetManagerDbContext(DbContextOptions options) : base(options) { }

        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<AssetManagement> AssetManagements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Entity>()
                .Property(e => e.CreatedAt)
                .ValueGeneratedOnAdd()
                .HasValueGenerator<DateTimeGenerator>()
                .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Throw);
            modelBuilder.Entity<Entity>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();

        }
    }
}
