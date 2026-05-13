namespace AccountingProducts.Domain.Models;

public class Shop
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<Price> Prices { get; set; }
}
