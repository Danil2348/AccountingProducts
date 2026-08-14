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
public class ProductController(IProductService service, ICategoryService categoryService, IManufacturerService manufacturerService,
    IMapper mapper) :
    BaseController<Product, ProductCreateDto, ProductUpdateDto, ProductResponseDto>(service, mapper)
{
    [HttpGet]
    public override IActionResult GetAll()
    {
        var entities = service.GetAll(
            null,
            p => p.Categories,
            p => p.Manufacturers);
        var entitiesDto = mapper.Map<List<ProductResponseDto>>(entities);
        return Ok(entitiesDto);
    }

    [HttpPost("create")]
    public override IActionResult Create([FromBody] ProductCreateDto createEntity)
    {
        var entity = mapper.Map<Product>(createEntity);
        entity.Categories = FillLinks(createEntity.Categories, categoryService);
        entity.Manufacturers = FillLinks(createEntity.Manufacturers, manufacturerService);
        var responseEntity = mapper.Map<ProductResponseDto>(service.Create(entity));
        return Ok(responseEntity);
    }

    [HttpPut("update/{id}")]
    public override IActionResult Update(Guid id, [FromBody] ProductUpdateDto updateEntity)
    {
        var entity = service.GetAll(e => e.Id == id).FirstOrDefault();
        mapper.Map(updateEntity, entity);
        entity.Categories = FillLinks(updateEntity.Categories, categoryService);
        entity.Manufacturers = FillLinks(updateEntity.Manufacturers, manufacturerService);
        var responseEntity = mapper.Map<ProductResponseDto>(service.Update(entity));
        return Ok(responseEntity);
    }
}
