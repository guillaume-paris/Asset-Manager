using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly IRepository<Asset> _repository;

        public AssetsController(IRepository<Asset> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public List<Asset> GetAssets()
        {
            return _repository.GetAll().ToList();
        }

        [HttpGet("{id}")]
        public async Task<Asset?> GetAsset(int id)
        {
            return await _repository.GetById(id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsset(int id)
        {
            var res = await _repository.Delete(id);
            if (res == -1)
            {
                return NotFound(new DTO.ActionResponse
                {
                    Success = false,
                    Title = "User not found",
                    Message = "There is no user for this id."
                });
            }
            return Ok(new DTO.ActionResponse
            {
                Success = true,
                Title = "Deletion successful",
                Message = "You have deleted an asset."
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddAsset(Asset asst)
        {
            var res = await _repository.Create(asst);
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
                Title = "Creation successful",
                Message = "You have created an new asset."
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsset(Asset newAsst)
        {
            var res = await _repository.Update(newAsst.Id, newAsst);
            if (res == -1)
            {
                return NotFound(new DTO.ActionResponse
                {
                    Success = false,
                    Title = "User not found",
                    Message = "There is no user for this id."
                });
            }
            return Ok(new DTO.ActionResponse
            {
                Success = true,
                Title = "Update successful",
                Message = "You have updated an asset."
            });
        }
    }
}
