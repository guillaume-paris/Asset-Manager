namespace AssetManagerBackend.Models
{
    public class AssetManagement : Entity
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int AssetId { get; set; }
        public Asset Asset { get; set; }
    }
}
