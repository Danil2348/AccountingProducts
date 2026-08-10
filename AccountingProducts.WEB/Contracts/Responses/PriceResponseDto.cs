using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Responses;

[Display(Name = "Цена")]
[DataSource(typeof(Price))]
public class PriceResponseDto
{
    [Display(Name = "Текущая цена")]
    public decimal CurrentPrice { get; set; }

    [Display(Name = "Старая цена")]
    public decimal OldPrice { get; set; }

    [Display(Name = "Продукт")]
    [DataSource(typeof(Product))]
    public ProductResponseDto Product { get; set; }

    [Display(Name = "Категория")]
    [DataSource(typeof(Category))]
    public CategoryResponseDto Category { get; set; }

    [Display(Name = "Производитель")]
    [DataSource(typeof(Manufacturer))]
    public ManufacturerResponseDto Manufacturer { get; set; }

    [Display(Name = "Магазин")]
    [DataSource(typeof(Shop))]
    public ShopResponseDto Shop { get; set; }
}
