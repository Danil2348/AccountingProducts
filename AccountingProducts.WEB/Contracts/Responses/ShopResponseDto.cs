using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Responses;

[Display(Name = "Магазин")]
public class ShopResponseDto : BaseResponseDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
