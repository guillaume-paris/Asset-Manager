using AssetManagerBackend.Databases;
using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace AssetManagerBackend.Repositories
{
    public class UserAccountRepository : Repository<UserAccount>, IUserAccountRepository
    {
        public UserAccountRepository(AssetManagerDbContext context) : base(context)
        {
        }
        public async Task<UserAccount?> IsUserAccountExist(string Username, string Email, string password)
        {
            UserAccount? foundEntity = await _context.Set<UserAccount>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => (x.Username == Username || x.Email == Email) && x.Password == password);

            if (foundEntity != null)
            {
                return foundEntity;
            }

            return null;
        }
    }
}
