using AssetManagerBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly AssetManagementDbContext _context;

        public AssetsController(AssetManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<Asset> GetAssets()
        {
            return _context.Assets.ToList();
        }

        [HttpGet("{id}")]
        public Asset GetAsset(int id)
        {
            return _context.Assets.SingleOrDefault(u => u.Id == id)!;
        }

        [HttpDelete]
        public IActionResult DeleteAsset(int id)
        {
            var asst = _context.Assets.SingleOrDefault(u => u.Id == id);
            if (asst == null)
            {
                return NotFound("Asset with the id: " + id + " does not exist");
            }
            _context.Assets.Remove(asst);
            _context.SaveChanges();
            return Ok("Asset with the id: " + id + " has been deleted successfully");
        }

        [HttpPost]
        public IActionResult AddAsset(Asset asset)
        {
            _context.Assets.Add(asset);
            _context.SaveChanges();
            return Created("api/Assets/" + asset.Id, asset);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAsset(int id)
        {
            var asst = _context.Assets.SingleOrDefault(u => u.Id == id);
            if (asst == null)
            {
                return NotFound("Asset with the id: " + id + " does not exist");
            }
            _context.Update(asst);
            _context.SaveChanges();
            return Ok("Asset with the id: " + id + "has been updated successfully");
        }
    }
}
