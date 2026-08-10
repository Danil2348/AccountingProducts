using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Responses;

[Display(Name = "Продукт")]
[DataSource(typeof(Product))]
public class ProductResponseDto : BaseResponseDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }

    [Display(Name = "Категории")]
    [DataSource(typeof(Category))]
    public List<CategoryResponseDto> Categories { get; set; }

    [Display(Name = "Производели")]
    [DataSource(typeof(Manufacturer))]
    public List<ManufacturerResponseDto> Manufacturers { get; set; }
}
