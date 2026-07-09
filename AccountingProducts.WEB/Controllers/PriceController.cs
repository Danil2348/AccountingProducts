using AccountingProducts.Application.Common.Interfaces.Services;
using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Contracts.Requests.Create;
using AccountingProducts.WEB.Contracts.Requests.Update;
using AccountingProducts.WEB.Contracts.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AccountingProducts.WEB.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PriceController(IPriceService service, IMapper mapper) :
    BaseController<Price, PriceCreateDto, PriceUpdateDto, PriceResponseDto>(service, mapper)
{
    [HttpGet]
    public override IActionResult GetAll()
    {
        var entities = service.GetAll(
            null, 
            p => p.Product,
            p => p.Manufacturer,
            p => p.Category,
            p => p.Shop);
        var entitiesDto = mapper.Map<List<PriceResponseDto>>(entities);
        return Ok(entitiesDto);
    }
}