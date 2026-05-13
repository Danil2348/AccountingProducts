namespace AccountingProducts.Domain.Models;

public class Product
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<Category> Categories { get; set; }
    public List<Manufacturer> Manufacturers { get; set; }
    public List<Price> Prices { get; set; }
}
