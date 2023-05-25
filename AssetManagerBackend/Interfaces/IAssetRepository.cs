using AssetManagerBackend.Models;

namespace AssetManagerBackend.Interfaces
{
    public interface IAssetRepository: IRepository<Asset>
    {
        Task<(List<Asset>, int)> GetFreeAssets();
    }
}
