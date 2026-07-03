using AccountingProducts.Application.Common.Interfaces.Repositories;
using AccountingProducts.Application.Common.Interfaces.Services;
using System.Linq.Expressions;

namespace AccountingProducts.Application.Services;

public abstract class BaseService<T>(IBaseRepository<T> repository) : IBaseService<T> where T : class
{
    public virtual T Create(T entity)
    {
        return repository.Create(entity);
    }

    public virtual bool Delete(Guid id)
    {
        return repository.Delete(id);
    }

    public virtual IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter = null,
        params Expression<Func<T, object>>[] includes)
    {
        return repository.GetAll(filter, includes);
    }

    public virtual T GetById(Guid id)
    {
        return repository.GetById(id);
    }

    public virtual T Update(T entity)
    {
        return repository.Update(entity);
    }
}
