namespace AccountingProducts.Application.Common.Interfaces.Services;

public interface IBaseService<T> where T : class
{
    public IEnumerable<T> GetAll();
    public T GetById(Guid id);
    public bool Delete(Guid id);
    public T Create(T entity);
    public T Update(T entity);
}
