using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Requests.Create;

[Display(Name = "Производитель")]
[DataSource(typeof(Manufacturer))]
public class ManufacturerCreateDto : BaseCreateDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
