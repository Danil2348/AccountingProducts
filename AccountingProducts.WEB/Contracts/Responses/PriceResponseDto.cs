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
    public Guid ProductId { get; set; }

    [Display(Name = "Категория")]
    public Guid CategoryId { get; set; }

    [Display(Name = "Производитель")]
    public Guid ManufacturerId { get; set; }

    [Display(Name = "Магазин")]
    public Guid ShopId { get; set; }
}
