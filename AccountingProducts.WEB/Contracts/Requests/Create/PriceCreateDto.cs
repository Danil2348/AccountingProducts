using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Create;

[Display(Name = "Цена")]
[DataSource(typeof(Price))]
public class PriceCreateDto : BaseCreateDto
{
    [Display(Name = "Текущая цена")]
    public decimal CurrentPrice { get; set; }

    [Display(Name = "Продукт")]
    [DataSource(typeof(Product))]
    public Guid ProductId { get; set; }

    [Display(Name = "Категория")]
    [DataSource(typeof(Category))]
    public Guid CategoryId { get; set; }

    [Display(Name = "Производитель")]
    [DataSource(typeof(Manufacturer))]
    public Guid ManufacturerId { get; set; }

    [Display(Name = "Магазин")]
    [DataSource(typeof(Shop))]
    public Guid ShopId { get; set; }
}
