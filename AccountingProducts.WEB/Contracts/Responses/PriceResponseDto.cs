using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Responses;

[Display(Name = "Цена")]
public class PriceResponseDto
{
    [Display(Name = "Текущая цена")]
    public decimal CurrentPrice { get; set; }

    [Display(Name = "Старая цена")]
    public decimal OldPrice { get; set; }

    [Display(Name = "Продукт")]
    public ProductResponseDto ProductId { get; set; }

    [Display(Name = "Категория")]
    public CategoryResponseDto CategoryId { get; set; }

    [Display(Name = "Производитель")]
    public ManufacturerResponseDto ManufacturerId { get; set; }

    [Display(Name = "Магазин")]
    public ShopResponseDto ShopId { get; set; }
}
