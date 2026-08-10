using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Responses;

[Display(Name = "Категория")]
[DataSource(typeof(Category))]
public class CategoryResponseDto : BaseResponseDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
