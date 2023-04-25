namespace AssetManagerBackend.DTO
{
    public class DTO
    {
        public class Login
        {
            public string? Username { get; set; }
            public string? Email { get; set; }
            public string? Password { get; set; }
        }
        public class LoginResult
        {
            public bool Success { get; set; }
            public string? Title { get; set; }
            public string? Message { get; set; }
            public string? Username { get; set; }
            public string? Token { get; set; }
            public int? ExpiresIn { get; set; }
        }

        public class ActionResult
        {
            public bool Success { get; set; }
            public string? Title { get; set; }
            public string? Message { get; set; }
        }
    }
}
