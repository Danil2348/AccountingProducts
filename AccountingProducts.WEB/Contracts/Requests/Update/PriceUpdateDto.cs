using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Update;

[Display(Name = "Цена")]
[DataSource(typeof(Price))]
public class PriceUpdateDto : BaseUpdateDto
{
    [Display(Name = "Текущая цена")]
    public decimal CurrentPrice { get; set; }
}
