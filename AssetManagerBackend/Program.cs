using AssetManagerBackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Repositories;
using AssetManagerBackend.Databases;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AssetManagerBackend.Services;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var settings = builder.Configuration;

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter into field the word 'Bearer' following by space and JWT",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});

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

var key = Encoding.ASCII.GetBytes(settings["JwtKey"]);
var expiryDuration = int.Parse(settings["JwtExpiryDurationMinutes"]);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddScoped<IUserAccountRepository, UserAccountRepository>();
builder.Services.AddScoped<IAssetRepository, AssetRepository>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
// Pass expiryDuration to JwtBearerService
builder.Services.AddScoped<IJwtBearerService, JwtBearerService>(provider =>
    new JwtBearerService(provider.GetRequiredService<IConfiguration>(), expiryDuration));
// Add EF Core DbContext to the container with in-memory database
builder.Services.AddDbContext<AssetManagerDbContext>(options =>
    options.UseInMemoryDatabase(databaseName: "MyInMemoryDatabase"));

var app = builder.Build();

static void SeedData(AssetManagerDbContext context)
{
    UserAccount userAccount1 = new()
    {
        Username = "toto",
        Email = "toto@gmail.com",
        Password = "toto123"
    };
    UserAccount userAccount2 = new()
    {
        Username = "tata",
        Email = "tata@gmail.com",
        Password = "tata123"
    };
    User user1 = new()
    {
        FirstName = "Jackie",
        LastName = "Chan",
        Email = "j.chan@gmail.com",
        Role = "Employee"
    };
    User user2 = new()
    {
        FirstName = "Patrick",
        LastName = "Fiori",
        Email = "p.fiori@gmail.com",
        Role = "Director"
    };
    User user3 = new()
    {
        FirstName = "Noe",
        LastName = "Arche",
        Email = "n.arche@gmail.com",
        Role = "Employee"
    };
    Asset asset1 = new()
    {
        Name = "Iphone 14",
        Description = "Use to call your friend",
        Brand = "Apple",
        Price = "1200 €",
        Quantity = "5",
        Category = "Electronics"
    };
    Asset asset2 = new()
    {
        Name = "Bag",
        Description = "Use to carry things",
        Brand = "Eastpack",
        Price = "40 €",
        Quantity = "200",
        Category = "Furniture"
    };
    Asset asset3 = new()
    {
        Name = "Pen",
        Description = "Use to write things",
        Brand = "BIC",
        Price = "2 €",
        Quantity = "100",
        Category = "Furniture"
    };
    Asset asset4 = new()
    {
        Name = "Highlighter",
        Description = "Use to highlight things",
        Brand = "BIC",
        Price = "3 €",
        Quantity = "150",
        Category = "Furniture"
    };
    AssetManagement assetManagement1 = new()
    {
        User = user1,
        Asset = asset2
    };
    AssetManagement assetManagement2 = new()
    {
        User = user1,
        Asset = asset1
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

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetService<AssetManagerDbContext>();
SeedData(context!);

app.Run();
