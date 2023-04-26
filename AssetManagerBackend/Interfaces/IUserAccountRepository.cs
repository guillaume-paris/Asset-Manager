using AssetManagerBackend.Models;

namespace AssetManagerBackend.Interfaces
{
    public interface IUserAccountRepository: IRepository<UserAccount>
    {
        Task<UserAccount?> IsUserAccountExist(string Username, string Email, string password);
    }
}
