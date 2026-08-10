using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Update;

[Display(Name = "Магазин")]
[DataSource(typeof(Shop))]
public class ShopUpdateDto : BaseUpdateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
