using AssetManagerBackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Repositories;
using AssetManagerBackend.Databases;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddScoped<IUserAccountRepository, UserAccountRepository>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
// Add EF Core DbContext to the container with in-memory database
builder.Services.AddDbContext<AssetManagerDbContext>(options =>
    options.UseInMemoryDatabase(databaseName: "MyInMemoryDatabase"));

var app = builder.Build();

static void SeedData(AssetManagerDbContext context)
{
    UserAccount userAccount1 = new()
    {
        Id = 1,
        Username = "toto",
        Email = "toto@gmail.com",
        Password = "toto123"
    };
    UserAccount userAccount2 = new()
    {
        Id = 2,
        Username = "tata",
        Email = "tata@gmail.com",
        Password = "tata123"
    };
    User user1 = new()
    {
        Id = 1,
        FirstName = "Jackie",
        LastName = "Chan",
        Email = "j.chan@gmail.com",
        Role = "Employee"
    };
    User user2 = new()
    {
        Id = 2,
        FirstName = "Patrick",
        LastName = "Fiori",
        Email = "p.fiori@gmail.com",
        Role = "Director"
    };
    User user3 = new()
    {
        Id = 3,
        FirstName = "Noe",
        LastName = "Arche",
        Email = "n.arche@gmail.com",
        Role = "Employee"
    };
    Asset asset1 = new()
    {
        Id = 1,
        Name = "Iphone 14",
        Description = "Use to call your friend",
        Brand = "Apple",
        Price = "1200 €",
        Quantity = "5",
        Category = "Electronics"
    };
    Asset asset2 = new()
    {
        Id = 2,
        Name = "Bag",
        Description = "Use to carry things",
        Brand = "Eastpack",
        Price = "40 €",
        Quantity = "200",
        Category = "Furniture"
    };
    Asset asset3 = new()
    {
        Id = 3,
        Name = "Pen",
        Description = "Use to write things",
        Brand = "BIC",
        Price = "2 €",
        Quantity = "100",
        Category = "Furniture"
    };
    Asset asset4 = new()
    {
        Id = 4,
        Name = "Highlighter",
        Description = "Use to highlight things",
        Brand = "BIC",
        Price = "3 €",
        Quantity = "150",
        Category = "Furniture"
    };
    AssetManagement assetManagement1 = new()
    {
        Id = 1,
        User = "Jackie Chan",
        Asset = "Bag"
    };
    AssetManagement assetManagement2 = new()
    {
        Id = 2,
        User = "Jackie Chan",
        Asset = "Pen"
    };
    context.Add(userAccount1);
    context.Add(userAccount2);
    context.Add(user1);
    context.Add(user2);
    context.Add(user3);
    context.Add(asset1);
    context.Add(asset2);
    context.Add(asset3);
    context.Add(asset4);
    context.Add(assetManagement1);
    context.Add(assetManagement2);
    context.SaveChanges();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");

app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetService<AssetManagerDbContext>();
SeedData(context!);

app.Run();
