using AssetManagerBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AssetManagerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccountsController : ControllerBase
    {
        private readonly AssetManagementDbContext _context;

        private class LoginResult
        {
            public bool Success { get; set; }
            public string? Title { get; set; }
            public string? Message { get; set; }
            public string? Username { get; set; }
            public string? Token { get; set; }
            public int? ExpiresIn { get; set; }
        }

        public UserAccountsController(AssetManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<UserAccount> GetUserAccounts()
        {
            return _context.UserAccounts.ToList();
        }

        [HttpGet("{id}")]
        public UserAccount GetUserAccount(int id)
        {
            return _context.UserAccounts.SingleOrDefault(e => e.Id == id)!;
        }

        [HttpPost("login")]
        public IActionResult IsUserAccountExist(UserAccount usrAccnt) 
        {
            var usrAcnt = _context.UserAccounts.SingleOrDefault(d => (d.Username == usrAccnt.Username && d.Password == usrAccnt.Password) || (d.Email == usrAccnt.Email && d.Password == usrAccnt.Password));
            if (usrAcnt == null)
            {
                return NotFound(new LoginResult
                {
                    Success = false,
                    Title = "Incorrect credentials",
                    Message = "User credentials is not matching with an existing one.",
                    Username = string.Empty,
                    Token = string.Empty,
                    ExpiresIn = 0
                });
            }
            return Ok(new LoginResult
            {
                Success = true,
                Title = "Login successful",
                Message = "You have log in to your account.",
                Username = usrAcnt.Username,
                Token = "test-token",
                ExpiresIn = 12000
            });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUserAccount(int id)
        {
            var usrAccnt = _context.UserAccounts.SingleOrDefault(d => d.Id == id);
            if (usrAccnt == null)
            {
                return NotFound(new LoginResult
                {
                    Success = false,
                    Title = "Something went wrong",
                    Message = "Oops, something went wrong server side. Please try again later.",
                    Username = string.Empty,
                    Token = string.Empty,
                    ExpiresIn = 0
                });
            }
            _context.UserAccounts.Remove(usrAccnt);
            _context.SaveChanges();
            return Ok("UserAccount with the id: " + id + " has been deleted successfully");
        }

        [HttpPost]
        public IActionResult AddUserAccount(UserAccount usrAccnt)
        {
            if (_context.UserAccounts.Add(usrAccnt) == null)
            {
                
            }
            _context.SaveChanges();
            return Ok(new LoginResult
            {
                Success = true,
                Title = "Register successful",
                Message = "You have created successfully a new account.",
                Username = usrAccnt.Username,
                Token = "test-token",
                ExpiresIn = 12000
            });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUserAccount(int id)
        {
            var usrAcnt = _context.UserAccounts.SingleOrDefault(d => d.Id == id);
            if (usrAcnt == null)
            {
                return NotFound("UserAccount with the id: " + id + " does not exist");
            }
            _context.Update(usrAcnt);
            _context.SaveChanges();
            return Ok("UserAccount with the id: " + id + "has been updated successfully");
        }
    }
}
