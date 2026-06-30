using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Update;

[Display(Name = "Магазин")]
public class ShopUpdateDto : BaseUpdateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
