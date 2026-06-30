using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Create;

[Display(Name = "Категория")]
public class CategoryCreateDto : BaseCreateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }

    [Display(Name = "Продукты")]
    public List<Guid> ProductIds { get; set; }
}
