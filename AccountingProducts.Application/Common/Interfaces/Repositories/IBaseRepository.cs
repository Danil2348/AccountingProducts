namespace AccountingProducts.Application.Common.Interfaces.Repositories;

public interface IBaseRepository<T> where T : class
{
    public IEnumerable<T> GetAll();
    public T Create(T entity);
    public T Update(T entity);
    public bool Delete(Guid id);
    public bool Save();
}
