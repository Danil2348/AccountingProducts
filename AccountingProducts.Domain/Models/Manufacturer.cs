namespace AccountingProducts.Domain.Models;

public class Manufacturer : Base
{
    public string Name { get; set; }
    public List<Product> Products { get; set; }
    public List<Price> Prices { get; set; }
}
