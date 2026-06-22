using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts;

[Display(Name = "Производитель")]
public class ManufacturerDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
