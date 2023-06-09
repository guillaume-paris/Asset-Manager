﻿using AssetManagerBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace AssetManagerBackend.Databases
{
    public class AssetManagerDbContext : DbContext
    {
        public AssetManagerDbContext(DbContextOptions options) : base(options) { }

        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<AssetManagement> AssetManagements { get; set; }
    }
}
