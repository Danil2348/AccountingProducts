using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Update;

[Display(Name = "Производитель")]
[DataSource(typeof(Manufacturer))]
public class ManufacturerUpdateDto : BaseUpdateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
