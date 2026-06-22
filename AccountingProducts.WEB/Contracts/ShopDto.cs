using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts;

[Display(Name = "Магазин")]
public class ShopDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
