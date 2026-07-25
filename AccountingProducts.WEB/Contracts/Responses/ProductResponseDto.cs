using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Responses;

[Display(Name = "Продукт")]
public class ProductResponseDto : BaseResponseDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }

    [Display(Name = "Категории")]
    public List<CategoryResponseDto> Categories { get; set; }

    [Display(Name = "Производели")]
    public List<ManufacturerResponseDto> Manufacturers { get; set; }
}
