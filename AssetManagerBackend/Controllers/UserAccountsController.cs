using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccountsController : ControllerBase
    {
        private readonly IUserAccountRepository _repository;

        public UserAccountsController(IUserAccountRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public List<UserAccount> GetUserAccounts()
        {
            return _repository.GetAll().ToList();
        }

        [HttpPost("login")]
        public async Task<IActionResult> IsUserAccountExist(DTO.DTO.Login login)
        {
            UserAccount? userAccount = await _repository.IsUserAccountExist(login.Username!, login.Email!, login.Password!);
            if (userAccount == null)
            {
                return NotFound(new DTO.DTO.ActionResult
                {
                    Success = false,
                    Title = "Something went wrong",
                    Message = "Oops, something went wrong server side. Please try again later."
                });
            }
            return Ok(new DTO.DTO.LoginResult
            {
                Success = true,
                Title = "Login successful",
                Message = "You have log into your account successfully.",
                Username = userAccount.Username,
                Token = "test-token",
                ExpiresIn = 0
            });
        }

        [HttpGet("{id}")]
        public async Task<UserAccount?> GetUserAccount(int id)
        {
            return await _repository.GetById(id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAccount(int id)
        {
            var res = await _repository.Delete(id);
            if (res == -1)
            {
                return NotFound(new DTO.DTO.ActionResult
                {
                    Success = false,
                    Title = "Something went wrong",
                    Message = "Oops, something went wrong server side. Please try again later."
                });
            }
            return Ok(new DTO.DTO.ActionResult
            {
                Success = true,
                Title = "Deletion successful",
                Message = "You have deleted a user account."
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddUserAccount(UserAccount usrAcnt)
        {
            var res = await _repository.Create(usrAcnt);
            if (res == -1)
            {
                return NotFound(new DTO.DTO.ActionResult
                {
                    Success = false,
                    Title = "Something went wrong",
                    Message = "Oops, something went wrong server side. Please try again later."
                });
            }
            return Ok(new DTO.DTO.LoginResult
            {
                Success = true,
                Title = "Creation successful",
                Message = "You have created a new user account.",
                Username = usrAcnt.Username,
                Token = "test-token-register",
                ExpiresIn = 0
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserAccount(int id)
        {
            var res = await _repository.Update(id);
            if (res == -1)
            {
                return NotFound(new DTO.DTO.ActionResult
                {
                    Success = false,
                    Title = "Something went wrong",
                    Message = "Oops, something went wrong server side. Please try again later."
                });
            }
            return Ok(new DTO.DTO.ActionResult
            {
                Success = true,
                Title = "Update successful",
                Message = "You have updated a user account."
            });
        }
    }
}
