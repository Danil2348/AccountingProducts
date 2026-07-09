using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Create;

[Display(Name = "Производитель")]
public class ManufacturerCreateDto : BaseCreateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }

    [Display(Name = "Продукты")]
    public List<Guid> Products { get; set; }
}
