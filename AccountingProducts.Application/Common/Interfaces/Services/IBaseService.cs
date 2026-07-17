using System.Linq.Expressions;

namespace AccountingProducts.Application.Common.Interfaces.Services;

public interface IBaseService<T> where T : class
{
    public IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter = null,
        params Expression<Func<T, object>>[] includes);
    public bool Delete(Guid id);
    public T Create(T entity);
    public T Update(T entity);
}
