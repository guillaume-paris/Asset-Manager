using System.Security.Claims;

namespace AssetManagerBackend.Interfaces
{
    public interface IJwtBearerService
    {
        string GenerateToken(IEnumerable<Claim> claims);
        double GetExpiryDuration();
    }
}
