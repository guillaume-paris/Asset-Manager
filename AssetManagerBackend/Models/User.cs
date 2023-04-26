namespace AssetManagerBackend.Models
{
    public class User: Entity
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
    }
}
