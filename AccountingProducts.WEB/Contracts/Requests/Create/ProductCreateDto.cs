using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Create;

[Display(Name = "Продукт")]
public class ProductCreateDto : BaseCreateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }

    [Display(Name = "Категории")]
    public List<Guid> CategoriyIds { get; set; }

    [Display(Name = "Производели")]
    public List<Guid> ManufacturerIds { get; set; }
}
