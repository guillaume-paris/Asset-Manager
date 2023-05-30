using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AssetManagerBackend.DTOs;

namespace AssetManagerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AssetManagementsController : ControllerBase
    {
        private readonly IAssetManagementRepository _repository;

        public AssetManagementsController(IAssetManagementRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public List<AssetManagementDTO> GetAssetManagements()
        {
            var assetManagements = _repository.GetAllWithUsersAndAssets().ToList();

            var assetManagementDTOs = assetManagements.Select(am => new AssetManagementDTO
            {
                User = $"{am.User.FirstName} {am.User.LastName}",
                Asset = am.Asset.Name,
                Id = am.Id,
                CreatedAt = am.CreatedAt.ToString("yyyy-MM-ddTHH:mm:ss"),
                CreatedBy = am.CreatedBy
            }).ToList();

            return assetManagementDTOs;
        }

        [HttpGet("count")]
        public int GetAssetManagementCount()
        {
            return _repository.GetAllWithUsersAndAssets().Count();
        }

        [HttpGet("{id}")]
        public async Task<AssetManagement?> GetAssetManagement(int id)
        {
            return await _repository.GetByIdWithUserAndAsset(id);
        }

        [HttpGet("pagination")]
        public IActionResult GetAssetManagements(int pageIndex = 1, int pageSize = 10)
        {
            var totalAssetsManagement = _repository.GetAllWithUsersAndAssets().Count();
            var assetsManagementPaged = _repository.GetAllWithUsersAndAssets()
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
        public async Task<IActionResult> AddAssetManagement(CreateEditAssetManagementDTO newAsstMngmnt)
        {
            var res = await _repository.CreateWithUserAndAsset(newAsstMngmnt.User, newAsstMngmnt.Asset);
            if (res == null)
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
        public async Task<IActionResult> UpdateAssetManagement(CreateEditAssetManagementDTO editAsstMngmnt)
        {
            var res = await _repository.UpdateWithUserAndAsset(editAsstMngmnt.User, editAsstMngmnt.Asset, editAsstMngmnt.Id);
            if (res == null)
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
                Message = "You have updated a link."
            });
        }
    }
}
