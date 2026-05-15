using AccountingProducts.Application.Common.Interfaces.Repositories;
using AccountingProducts.Application.Common.Interfaces.Services;

namespace AccountingProducts.Application.Services;

public abstract class BaseService<T>(IBaseRepository<T> repository) : IBaseService<T> where T : class
{
    public T Create(T entity)
    {
        return repository.Create(entity);
    }

    public bool Delete(Guid id)
    {
        return repository.Delete(id);
    }

    public IEnumerable<T> GetAll()
    {
        return repository.GetAll();
    }

    public T Update(T entity)
    {
        return repository.Update(entity);
    }
}
