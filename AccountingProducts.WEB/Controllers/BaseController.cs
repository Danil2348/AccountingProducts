using AccountingProducts.Application.Common.Interfaces.Services;
using AccountingProducts.Application.Services;
using AccountingProducts.Domain.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AccountingProducts.WEB.Controllers;

[Route("api/[controller]")]
[ApiController]
public abstract class BaseController<TEntity, TCreateDto, TUpdateDto, TResponseDto>
    (IBaseService<TEntity> service, IMapper mapper) : ControllerBase
    where TEntity : class
    where TCreateDto : class
    where TUpdateDto : class
    where TResponseDto : class
{
    [HttpGet]
    public virtual IActionResult GetAll()
    {
        var entities = service.GetAll();
        var entitiesDto = mapper.Map<List<TResponseDto>>(entities);
        return Ok(entitiesDto);
    }

    [HttpDelete("delete/{id}")]
    public virtual IActionResult Delete(Guid id)
    {
        return Ok(service.Delete(id));
    }

    [HttpPost("create")]
    public virtual IActionResult Create([FromBody] TCreateDto entityDto)
    {
        var entity = mapper.Map<TEntity>(entityDto);
        var responseEntity = mapper.Map<TResponseDto>(service.Create(entity));
        return Ok(responseEntity);
    }

    [HttpPut("update")]
    public virtual IActionResult Update(Guid id, [FromBody] TUpdateDto entityDto)
    {
        var entity = service.GetById(id);
        mapper.Map(entityDto, entity);
        var responseEntity = mapper.Map<TResponseDto>(service.Update(entity));
        return Ok(responseEntity);
    }

    protected virtual List<T> FillLinks<T>(List<Guid> guidEntities, IBaseService<T> linkService) where T : Base
    {
        return guidEntities.Any() ? linkService.GetAll(l => guidEntities.Contains(l.Id)).ToList() : [];
    }
}
