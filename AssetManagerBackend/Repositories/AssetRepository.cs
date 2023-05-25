using AssetManagerBackend.Databases;
using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace AssetManagerBackend.Repositories
{
    public class AssetRepository : Repository<Asset>, IAssetRepository
    {
        private readonly AssetManagerDbContext _context;
        private readonly IRepository<AssetManagement> _assetManagementRepository;

        public AssetRepository(AssetManagerDbContext context, IRepository<AssetManagement> assetManagementRepository) : base(context)
        {
            _context = context;
            _assetManagementRepository = assetManagementRepository;
        }

        public async Task<(List<Asset>, int)> GetFreeAssets()
        {
            var managedAssets = _assetManagementRepository.GetAll().Select(am => am.AssetId).ToList();
            var allAssets = await _context.Assets.ToListAsync();
            var freeAssets = allAssets.Where(a => !managedAssets.Contains(a.Id)).ToList();

            return (freeAssets, freeAssets.Count);
        }
    }
}
