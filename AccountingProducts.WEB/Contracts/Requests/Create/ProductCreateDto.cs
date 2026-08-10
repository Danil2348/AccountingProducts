using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Create;

[Display(Name = "Продукт")]
[DataSource(typeof(Product))]
public class ProductCreateDto : BaseCreateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }

    [Display(Name = "Категории")]
    [DataSource(typeof(Category))]
    public List<Guid> Categories { get; set; }

    [Display(Name = "Производели")]
    [DataSource(typeof(Manufacturer))]
    public List<Guid> Manufacturers { get; set; }
}
