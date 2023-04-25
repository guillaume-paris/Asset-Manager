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

/*builder.Services.AddScoped<IUserAccountRepository, UserAccountRepository>();*/
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
    context.Add(userAccount1);
    context.Add(userAccount2);
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
