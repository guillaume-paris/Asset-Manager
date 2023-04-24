using Microsoft.EntityFrameworkCore;

namespace AssetManagerBackend.Models
{
    public class AssetManagementDbContext: DbContext
    {
        public AssetManagementDbContext(DbContextOptions options): base(options) 
        {
        
        }

        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<AssetManagement> AssetManagements { get; set; }
    }
}
