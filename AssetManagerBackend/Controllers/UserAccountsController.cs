using AssetManagerBackend.DTO;
using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;  // Ajout pour les revendications

namespace AssetManagerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccountsController : ControllerBase
    {
        private readonly IUserAccountRepository _repository;
        private readonly IJwtBearerService _jwtBearerService; 

        public UserAccountsController(IUserAccountRepository repository, IJwtBearerService jwtBearerService)
        {
            _repository = repository;
            _jwtBearerService = jwtBearerService; 
        }

        [HttpGet]
        [Authorize]
        public List<UserAccount> GetUserAccounts()
        {
            return _repository.GetAll().ToList();
        }

        [HttpPost("login")]
        public async Task<IActionResult> IsUserAccountExist(DTO.Login login)
        {
            UserAccount? userAccount = await _repository.IsUserAccountExist(login.Username!, login.Email!, login.Password!);
            if (userAccount == null)
            {
                return NotFound(new DTO.LoginResult
                {
                    Success = false,
                    Title = "Wrong credentials",
                    Message = "Incorrect password or the user account does not exist.",
                    Username = "",
                    Token = "",
                    ExpiresIn = 0
                });
            }

            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier, userAccount.Id.ToString()),
                new Claim(ClaimTypes.Name, userAccount.Username),
            };

            var token = _jwtBearerService.GenerateToken(claims);

            return Ok(new DTO.LoginResult
            {
                Success = true,
                Title = "Login successful",
                Message = "You have log into your account successfully.",
                Username = userAccount.Username,
                Token = token,
                ExpiresIn = _jwtBearerService.GetExpiryDuration()  
            });
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<UserAccount?> GetUserAccount(int id)
        {
            return await _repository.GetById(id);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUserAccount(int id)
        {
            var res = await _repository.Delete(id);
            if (res == -1)
            {
                return NotFound(new DTO.ActionResponse
                {
                    Success = false,
                    Title = "Something went wrong",
                    Message = "Oops, something went wrong server side. Please try again later."
                });
            }
            return Ok(new DTO.ActionResponse
            {
                Success = true,
                Title = "Deletion successful",
                Message = "You have deleted a user account."
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddUserAccount(DTO.Login login)
        {
            UserAccount usrAcnt = new UserAccount
            {
                Username = login.Username,
                Email = login.Email,
                Password = login.Password,
            };

            var res = await _repository.Create(usrAcnt);
            if (res == -1)
            {
                return NotFound(new DTO.LoginResult
                {
                    Success = false,
                    Title = "Something went wrong",
                    Message = "Oops, something went wrong server side. Please try again later.",
                    Username = "",
                    Token = "",
                    ExpiresIn = 0
                });
            }

            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier, res.ToString()),
                new Claim(ClaimTypes.Name, usrAcnt.Username),
            };

            var token = _jwtBearerService.GenerateToken(claims);

            return Ok(new DTO.LoginResult
            {
                Success = true,
                Title = "Registration successful",
                Message = "You have registered a new user account.",
                Username = usrAcnt.Username,
                Token = token,
                ExpiresIn = _jwtBearerService.GetExpiryDuration()
            });
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateUserAccount(UserAccount newUsrAcnt)
        {
            var res = await _repository.Update(newUsrAcnt.Id, newUsrAcnt);
            if (res == -1)
            {
                return NotFound(new DTO.ActionResponse
                {
                    Success = false,
                    Title = "Something went wrong",
                    Message = "Oops, something went wrong server side. Please try again later."
                });
            }
            return Ok(new DTO.ActionResponse
            {
                Success = true,
                Title = "Update successful",
                Message = "You have updated a user account."
            });
        }
    }
}
