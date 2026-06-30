using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Update;

[Display(Name = "Цена")]
public class PriceUpdateDto : BaseUpdateDto
{
    [Display(Name = "Текущая цена")]
    public decimal CurrentPrice { get; set; }
}
