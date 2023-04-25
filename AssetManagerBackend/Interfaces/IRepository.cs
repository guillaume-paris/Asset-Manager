namespace AssetManagerBackend.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<bool> Exists(int id);

        IQueryable<TEntity> GetAll();

        Task<TEntity?> GetById(int id);

        Task<int> Create(TEntity entity);

        Task<int> Update(int id);

        Task<int> Delete(int id);
    }
}
