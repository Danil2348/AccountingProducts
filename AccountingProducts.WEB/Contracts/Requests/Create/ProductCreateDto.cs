using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Create;

[Display(Name = "Продукт")]
public class ProductCreateDto : BaseCreateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }

    [Display(Name = "Категории")]
    public List<Guid> Categories { get; set; }

    [Display(Name = "Производели")]
    public List<Guid> Manufacturers { get; set; }
}
