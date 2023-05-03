namespace AssetManagerBackend.DTO
{
    public class LoginResult
    {
        public bool Success { get; set; }
        public string? Title { get; set; }
        public string? Message { get; set; }
        public string? Username { get; set; }
        public string? Token { get; set; }
        public int? ExpiresIn { get; set; }
    }
}
