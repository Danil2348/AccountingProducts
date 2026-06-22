using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts;

[Display(Name = "Продукт")]
public class ProductDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
