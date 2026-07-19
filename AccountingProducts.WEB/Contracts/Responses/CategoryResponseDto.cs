using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Responses;

[Display(Name = "Категория")]
public class CategoryResponseDto : BaseResponseDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
