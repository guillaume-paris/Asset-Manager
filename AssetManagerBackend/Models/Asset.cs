﻿namespace AssetManagerBackend.Models
{
    public class Asset : Entity
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Brand { get; set; }
        public string? Price { get; set; }
        public string? Quantity { get; set; }
        public string? Category { get; set; }
    }
}
