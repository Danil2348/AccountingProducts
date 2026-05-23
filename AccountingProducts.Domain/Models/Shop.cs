namespace AccountingProducts.Domain.Models;

public class Shop : Base
{
    public string Name { get; set; }
    public List<Price> Prices { get; set; }
}
