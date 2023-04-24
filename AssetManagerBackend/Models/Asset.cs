namespace AssetManagerBackend.Models
{
    public class Asset
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Brand { get; set; }
        public string? Price { get; set; }
        public string? Quantity { get; set; }
        public string? Category { get; set; }
    }
}
