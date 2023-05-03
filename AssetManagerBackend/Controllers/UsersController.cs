using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IRepository<User> _repository;

        public UsersController(IRepository<User> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public List<User> GetUsers()
        {
            return _repository.GetAll().ToList();
        }

        [HttpGet("{id}")]
        public async Task<User?> GetUser(int id)
        {
            return await _repository.GetById(id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var res = await _repository.Delete(id);
            if (res == -1)
            {
                return NotFound(new DTO.ActionResult
                {
                    Success = false,
                    Title = "Something went wrong",
                    Message = "Oops, something went wrong server side. Please try again later."
                });
            }
            return Ok(new DTO.ActionResult
            {
                Success = true,
                Title = "Deletion successful",
                Message = "You have deleted a user."
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(User usr)
        {
            var res = await _repository.Create(usr);
            if (res == -1)
            {
                return NotFound(new DTO.ActionResult
                {
                    Success = false,
                    Title = "Something went wrong",
                    Message = "Oops, something went wrong server side. Please try again later."
                });
            }
            return Ok(new DTO.ActionResult
            {
                Success = true,
                Title = "Creation successful",
                Message = "You have created a new user."
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(User newUsr)
        {
            var res = await _repository.Update(newUsr.Id, newUsr);
            if (res == -1)
            {
                return NotFound(new DTO.ActionResult
                {
                    Success = false,
                    Title = "Something went wrong",
                    Message = "Oops, something went wrong server side. Please try again later."
                });
            }
            return Ok(new DTO.ActionResult
            {
                Success = true,
                Title = "Update successful",
                Message = "You have updated a user."
            });
        }
    }
}
