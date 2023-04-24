using AssetManagerBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetManagementsController : ControllerBase
    {
        private readonly AssetManagementDbContext _context;

        public AssetManagementsController(AssetManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<AssetManagement> GetAssetManagements()
        {
            return _context.AssetManagements.ToList();
        }

        [HttpGet("{id}")]
        public AssetManagement GetAssetManagement(int id)
        {
            return _context.AssetManagements.SingleOrDefault(u => u.Id == id)!;
        }

        [HttpDelete]
        public IActionResult DeleteAssetManagement(int id)
        {
            var asstMngmnt = _context.AssetManagements.SingleOrDefault(u => u.Id == id);
            if (asstMngmnt == null)
            {
                return NotFound("AssetManagement with the id: " + id + " does not exist");
            }
            _context.AssetManagements.Remove(asstMngmnt);
            _context.SaveChanges();
            return Ok("AssetManagement with the id: " + id + " has been deleted successfully");
        }

        [HttpPost]
        public IActionResult AddAssetManagement(AssetManagement asstMngmnt)
        {
            _context.AssetManagements.Add(asstMngmnt);
            _context.SaveChanges();
            return Created("api/AssetManagements/" + asstMngmnt.Id, asstMngmnt);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAssetManagement(int id)
        {
            var asstMngmnt = _context.AssetManagements.SingleOrDefault(u => u.Id == id);
            if (asstMngmnt == null)
            {
                return NotFound("AssetManagement with the id: " + id + " does not exist");
            }
            _context.Update(asstMngmnt);
            _context.SaveChanges();
            return Ok("AssetManagement with the id: " + id + "has been updated successfully");
        }
    }
}
