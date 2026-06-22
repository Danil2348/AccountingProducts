using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts;

[Display(Name = "Цена")]
public class PriceDto
{
    [Display(Name = "Текущая цена")]
    public decimal CurrentPrice { get; set; }
}
