namespace AssetManagerBackend.DTOs
{
    public class AssetManagementDTO
    {
        public string User { get; set; } = "";
        public string Asset { get; set; } = "";
        public int Id { get; set; }
        public string CreatedAt { get; set; } = "";
        public string? CreatedBy { get; set; }
    }

    public class CreateEditAssetManagementDTO
    {
        public string User { get; set; } = "";
        public string Asset { get; set; } = "";
        public int Id { get; set; }
    }
}
