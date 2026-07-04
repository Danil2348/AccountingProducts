using AccountingProducts.Domain.Models;
using System.Linq.Expressions;

namespace AccountingProducts.Application.Common.Interfaces.Repositories;

public interface IBaseRepository<T> where T : class
{
    public IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter = null,
        params Expression<Func<T, object>>[] includes);
    public T GetById(Guid id);
    public T Create(T entity);
    public T Update(T entity);
    public bool Delete(Guid id);
    public bool Save();
}
