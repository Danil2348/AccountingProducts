using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Update;

[Display(Name = "Категория")]
[DataSource(typeof(Category))]
public class CategoryUpdateDto : BaseUpdateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
