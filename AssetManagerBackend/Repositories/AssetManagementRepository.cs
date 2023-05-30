using AssetManagerBackend.Databases;
using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace AssetManagerBackend.Repositories
{
    public class AssetManagementRepository : Repository<AssetManagement>, IAssetManagementRepository
    {
        private readonly AssetManagerDbContext _context;

        public AssetManagementRepository(AssetManagerDbContext context) : base(context)
        {
            _context = context;
        }

        public IQueryable<AssetManagement> GetAllWithUsersAndAssets()
        {
            return _context.AssetManagements
                .Include(am => am.User)
                .Include(am => am.Asset);
        }

        public async Task<AssetManagement> GetByIdWithUserAndAsset(int id)
        {
            var assetManagement = await _context.AssetManagements
                .Include(am => am.User)
                .Include(am => am.Asset)
                .FirstOrDefaultAsync(am => am.Id == id);

            if (assetManagement == null)
            {
                throw new Exception($"No AssetManagement found with ID {id}");
            }

            return assetManagement;
        }

        public async Task<AssetManagement> CreateWithUserAndAsset(string fullName, string asset)
        {
            var names = fullName.Split(' ');
            if (names.Length != 2)
            {
                throw new ArgumentException("User must be in the format 'FirstName LastName'");
            }

            var firstName = names[0];
            var lastName = names[1];

            var userEntity = await _context.Users.FirstOrDefaultAsync(u => u.FirstName == firstName && u.LastName == lastName);
            var assetEntity = await _context.Assets.FirstOrDefaultAsync(a => a.Name == asset);

            if (userEntity == null || assetEntity == null)
            {
                return null;
            }

            var assetManagement = new AssetManagement
            {
                UserId = userEntity.Id,
                AssetId = assetEntity.Id
            };

            _context.AssetManagements.Add(assetManagement);
            await _context.SaveChangesAsync();

            return assetManagement;
        }

        public async Task<AssetManagement> UpdateWithUserAndAsset(string fullName, string asset, int id)
        {
            var names = fullName.Split(' ');
            if (names.Length != 2)
            {
                throw new ArgumentException("User must be in the format 'FirstName LastName'");
            }

            var firstName = names[0];
            var lastName = names[1];

            var userEntity = await _context.Users.FirstOrDefaultAsync(u => u.FirstName == firstName && u.LastName == lastName);
            var assetEntity = await _context.Assets.FirstOrDefaultAsync(a => a.Name == asset);

            if (userEntity == null || assetEntity == null)
            {
                return null;
            }

            var assetManagement = await _context.AssetManagements.FirstOrDefaultAsync(am => am.Id == id);

            if (assetManagement == null)
            {
                throw new Exception($"No AssetManagement found with ID {id}");
            }

            assetManagement.UserId = userEntity.Id;
            assetManagement.AssetId = assetEntity.Id;

            await _context.SaveChangesAsync();

            return assetManagement;
        }

    }
}
