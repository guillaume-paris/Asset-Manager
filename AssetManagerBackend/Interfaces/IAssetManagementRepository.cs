using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;

public interface IAssetManagementRepository : IRepository<AssetManagement>
{
    IQueryable<AssetManagement> GetAllWithUsersAndAssets();
    Task<AssetManagement> GetByIdWithUserAndAsset(int id);
    Task<AssetManagement> CreateWithUserAndAsset(string user, string asset);
    Task<AssetManagement> UpdateWithUserAndAsset(string user, string asset, int id);
}
