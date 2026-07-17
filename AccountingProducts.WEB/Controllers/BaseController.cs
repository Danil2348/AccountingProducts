using AccountingProducts.Application.Common.Interfaces.Services;
using AccountingProducts.Domain.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AccountingProducts.WEB.Controllers;

[Route("api/[controller]")]
[ApiController]
public abstract class BaseController<TEntity, TDto>(IBaseService<TEntity> service, IMapper mapper) : ControllerBase
    where TEntity : Base
    where TDto : class
{
    [HttpGet]
    public virtual IActionResult GetAll()
    {
        var entities = service.GetAll();
        var entitiesDto = mapper.Map<List<TDto>>(entities);
        return Ok(entitiesDto);
    }

    [HttpDelete("delete/{id}")]
    public virtual IActionResult Delete(Guid id)
    {
        return Ok(service.Delete(id));
    }

    [HttpPost("create")]
    public virtual IActionResult Create([FromBody] TDto entityDto)
    {
        var entity = mapper.Map<TEntity>(entityDto);
        mapper.Map(entityDto, service.Create(entity));
        return Ok(entityDto);
    }

    [HttpPut("update")]
    public virtual IActionResult Update(Guid id, [FromBody] TDto entityDto)
    {
        var entity = service.GetAll(e => e.Id == id).FirstOrDefault();
        mapper.Map(entityDto, entity);
        mapper.Map(service.Update(entity), entityDto);
        return Ok(entityDto);
    }
}
