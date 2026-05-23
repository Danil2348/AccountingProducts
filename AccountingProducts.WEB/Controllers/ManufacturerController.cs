using AccountingProducts.Application.Common.Interfaces.Services;
using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Contracts;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AccountingProducts.WEB.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ManufacturerController(IManufacturerService service, IMapper mapper) : 
    BaseController<Manufacturer, ManufacturerDto>(service, mapper)
{ }
