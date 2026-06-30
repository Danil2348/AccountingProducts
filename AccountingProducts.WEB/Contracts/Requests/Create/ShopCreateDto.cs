using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Create;

[Display(Name = "Магазин")]
public class ShopCreateDto : BaseCreateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
