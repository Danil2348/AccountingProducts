using AccountingProducts.Application.Common.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace AccountingProducts.WEB.Controllers;

[Route("api/[controller]")]
[ApiController]
public abstract class BaseController<T>(IBaseService<T> service) : ControllerBase where T : class
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(service.GetAll());
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        return Ok(service.Delete(id));
    }

    [HttpPost("create")]
    public IActionResult Create([FromBody] T entity)
    {
        return Ok(service.Create(entity));
    }

    [HttpPost("update")]
    public IActionResult Update([FromBody] T entity)
    {
        return Ok(service.Create(entity));
    }
}
