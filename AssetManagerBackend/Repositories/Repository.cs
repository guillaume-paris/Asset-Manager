using AssetManagerBackend.Databases;
using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace AssetManagerBackend.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity
    {
        protected readonly AssetManagerDbContext _context;

        public Repository(AssetManagerDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Exists(int id)
        {
            var foundEntity = await _context.Set<TEntity>().AsNoTracking().FirstOrDefaultAsync(x => x.Id.Equals(id));

            if (foundEntity != null)
            {
                _context.Entry(foundEntity).State = EntityState.Detached;

                return true;
            }

            return false;
        }

        public IQueryable<TEntity> GetAll()
        {
            return _context.Set<TEntity>().AsNoTracking();
        }

        public async Task<TEntity?> GetById(int id)
        {
            return await _context.Set<TEntity>().AsNoTracking().Where(e => e.Id == id).FirstOrDefaultAsync();
        }

        public async Task<int> Create(TEntity entity)
        {
            await _context.Set<TEntity>().AddAsync(entity);

            await _context.SaveChangesAsync();

            return entity.Id;
        }

        public async Task<int> Update(int id)
        {
            var entity = await GetById(id);

            if (entity == null)
            {
                return -1;
            }
            _context.Set<TEntity>().Update(entity);
            await _context.SaveChangesAsync();
            return entity.Id;
        }

        public async Task<int> Delete(int id)
        {
            var entity = await GetById(id);

            if (entity == null)
            {
                return -1;
            }
            _context.Set<TEntity>().Remove(entity);
            await _context.SaveChangesAsync();
            return id;
        }
    }
}
