using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetManagementsController : ControllerBase
    {
        private readonly IRepository<AssetManagement> _repository;

        public AssetManagementsController(IRepository<AssetManagement> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public List<AssetManagement> GetAssetManagements()
        {
            return _repository.GetAll().ToList();
        }

        [HttpGet("{id}")]
        public async Task<AssetManagement?>GetAssetManagement(int id)
        {
            return await _repository.GetById(id);
        }

        [HttpGet("pagination")]
        public IActionResult GetAssetManagements(int pageIndex = 1, int pageSize = 10)
        {
            var totalAssetsManagement = _repository.GetAll().Count();
            var assetsManagementPaged = _repository.GetAll()
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new
            {
                totalAssetsManagement,
                assetsManagementPaged
            };

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssetManagement(int id)
        {
            var res = await _repository.Delete(id);
            if (res == -1)
            {
                return NotFound(new DTO.ActionResponse
                {
                    Success = false,
                    Title = "Link not found",
                    Message = "There is no link for this id."
                });
            }
            return Ok(new DTO.ActionResponse
            {
                Success = true,
                Title = "Deletion successful",
                Message = "You have deleted a link."
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddAssetManagement(AssetManagement asstMngmnt)
        {
            var res = await _repository.Create(asstMngmnt);
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
                Message = "You have created a new link."
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAssetManagement(AssetManagement newAsstMngmnt)
        {
            var res = await _repository.Update(newAsstMngmnt.Id, newAsstMngmnt);
            if (res == -1)
            {
                return NotFound(new DTO.ActionResponse
                {
                    Success = false,
                    Title = "Link not found",
                    Message = "There is no link for this id."
                });
            }
            return Ok(new DTO.ActionResponse
            {
                Success = true,
                Title = "Update successful",
                Message = "You have updated a link."
            });
        }
    }
}
