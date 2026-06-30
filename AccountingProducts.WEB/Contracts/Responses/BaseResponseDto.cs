using System.ComponentModel.DataAnnotations;

namespace AccountingProducts.WEB.Contracts.Responses;

public class BaseResponseDto
{
    [Display(Name = "Id")]
    public Guid Id { get; set; }
}
