using AssetManagerBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AssetManagementDbContext _context;

        public UsersController(AssetManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        [HttpGet("{id}")]
        public User GetUser(int id)
        {
            return _context.Users.SingleOrDefault(u => u.Id == id)!;
        }

        [HttpDelete]
        public IActionResult DeleteUser(int id)
        {
            var usr = _context.Users.SingleOrDefault(u =>u.Id == id);
            if (usr == null)
            {
                return NotFound("User with the id: " + id + " does not exist");
            }
            _context.Users.Remove(usr);
            _context.SaveChanges();
            return Ok("User with the id: " + id + " has been deleted successfully");
        }

        [HttpPost]
        public IActionResult AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return Created("api/Users/" + user.Id, user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id)
        {
            var usr = _context.Users.SingleOrDefault(u => u.Id == id);
            if (usr == null)
            {
                return NotFound("User with the id: " + id + " does not exist");
            }
            _context.Update(usr);
            _context.SaveChanges();
            return Ok("User with the id: " + id + "has been updated successfully");
        }
    }
}
