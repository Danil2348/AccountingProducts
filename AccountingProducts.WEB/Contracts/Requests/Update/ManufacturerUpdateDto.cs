using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Update;

[Display(Name = "Производитель")]
public class ManufacturerUpdateDto : BaseUpdateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
