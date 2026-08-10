using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Create;

[Display(Name = "Магазин")]
[DataSource(typeof(Shop))]
public class ShopCreateDto : BaseCreateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
