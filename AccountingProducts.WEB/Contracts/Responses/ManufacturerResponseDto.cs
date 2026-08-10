using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Responses;

[Display(Name = "Производитель")]
[DataSource(typeof(Manufacturer))]
public class ManufacturerResponseDto : BaseResponseDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }
}
