using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Create;

[Display(Name = "Цена")]
public class PriceCreateDto : BaseCreateDto
{
    [Display(Name = "Текущая цена")]
    public decimal CurrentPrice { get; set; }

    [Display(Name = "Продукт")]
    public Guid ProductId { get; set; }

    [Display(Name = "Категория")]
    public Guid CategoryId { get; set; }

    [Display(Name = "Производитель")]
    public Guid ManufacturerId { get; set; }

    [Display(Name = "Магазин")]
    public Guid ShopId { get; set; }
}
