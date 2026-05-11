using AccountingProducts.Application.Common.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AccountingProducts.Infrastructure.Repositories;

public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
{
    protected readonly AppDbContext _appDbContext;
    protected readonly DbSet<T> _dbSet;

    protected BaseRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
        _dbSet = appDbContext.Set<T>();
    }

    public T Create(T entity)
    {
        _dbSet.Add(entity);
        Save();
        return entity;
    }

    public bool Delete(Guid id)
    {
        var entity = _dbSet.Find(id);
        _dbSet.Remove(entity);
        return Save();
    }

    public IEnumerable<T> GetAll()
    {
        return _dbSet.ToList();
    }

    public bool Save()
    {
        return _appDbContext.SaveChanges() > 0;
    }

    public T Update(T entity)
    {
        _dbSet.Update(entity);
        Save();
        return entity;
    }
}
