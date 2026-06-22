using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts;

[Display(Name = "Категория")]
public class CategoryDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
