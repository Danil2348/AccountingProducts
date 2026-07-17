using AccountingProducts.Application.Common.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

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

    public virtual T Create(T entity)
    {
        _dbSet.Add(entity);
        Save();
        return entity;
    }

    public virtual bool Delete(Guid id)
    {
        var entity = _dbSet.Find(id);
        _dbSet.Remove(entity);
        return Save();
    }

    public IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter = null, params Expression<Func<T, object>>[] includes)
    {
        var query = _dbSet.AsQueryable();

        if (filter != null)
            query = query.Where(filter);

        foreach (var include in includes)
            query = query.Include(include);

        return query.ToList();
    }

    public virtual bool Save()
    {
        return _appDbContext.SaveChanges() > 0;
    }

    public virtual T Update(T entity)
    {
        _dbSet.Update(entity);
        Save();
        return entity;
    }
}
