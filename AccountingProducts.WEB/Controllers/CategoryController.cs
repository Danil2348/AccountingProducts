using AccountingProducts.Application.Common.Interfaces.Services;
using AccountingProducts.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace AccountingProducts.WEB.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController(ICategoryService service) : BaseController<Category>(service)
{ }
