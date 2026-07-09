using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Responses;

[Display(Name = "Производитель")]
public class ManufacturerResponseDto : BaseResponseDto
{
    [Display(Name = "Название")]
    public string Name { get; set; }

    [Display(Name = "Продукты")]
    public List<Guid> Products { get; set; }
}
