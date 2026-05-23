namespace AccountingProducts.Domain.Models;

public abstract class Base
{
    public Guid Id { get; set; } = Guid.NewGuid();
}
