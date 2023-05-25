using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AssetManagerBackend.Services
{
    public class JwtBearerService : IJwtBearerService
    {
        private readonly SymmetricSecurityKey _key;
        private readonly double _expiryDurationInMinutes;

        public JwtBearerService(IConfiguration config, double expiryDurationInMinutes)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtKey"]));
            _expiryDurationInMinutes = expiryDurationInMinutes;
        }

        public string GenerateToken(IEnumerable<Claim> claims)
        {
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(_expiryDurationInMinutes),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public double GetExpiryDuration()
        {
            return _expiryDurationInMinutes * 60;
        }
    }
}
