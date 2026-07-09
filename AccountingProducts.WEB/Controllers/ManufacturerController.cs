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
public class ManufacturerController(IManufacturerService service, IProductService productService, IMapper mapper) :
    BaseController<Manufacturer, ManufacturerCreateDto, ManufacturerUpdateDto, ManufacturerResponseDto>(service, mapper)
{
    [HttpGet]
    public override IActionResult GetAll()
    {
        var entities = service.GetAll(null, p => p.Products);
        var entitiesDto = mapper.Map<List<ManufacturerResponseDto>>(entities);
        return Ok(entitiesDto);
    }

    [HttpPost("create")]
    public override IActionResult Create([FromBody] ManufacturerCreateDto createEntity)
    {
        var entity = mapper.Map<Manufacturer>(createEntity);
        entity.Products = FillLinks(createEntity.Products, productService);
        var responseEntity = mapper.Map<ManufacturerResponseDto>(service.Create(entity));
        return Ok(responseEntity);
    }

    [HttpPut("update")]
    public override IActionResult Update(Guid id, [FromBody] ManufacturerUpdateDto updateEntity)
    {
        var entity = service.GetById(id);
        mapper.Map(updateEntity, entity);
        entity.Products = FillLinks(updateEntity.Products, productService);
        var responseEntity = mapper.Map<ManufacturerResponseDto>(service.Update(entity));
        return Ok(responseEntity);
    }
}
