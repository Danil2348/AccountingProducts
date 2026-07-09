using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Update;

[Display(Name = "Категория")]
public class CategoryUpdateDto : BaseUpdateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }

    [Display(Name = "Продукты")]
    public List<Guid> Products { get; set; }
}
