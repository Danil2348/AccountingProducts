using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Responses;

[Display(Name = "Магазин")]
[DataSource(typeof(Shop))]
public class ShopResponseDto : BaseResponseDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
