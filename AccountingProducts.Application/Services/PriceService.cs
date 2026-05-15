using AccountingProducts.Application.Common.Interfaces.Repositories;
using AccountingProducts.Application.Common.Interfaces.Services;
using AccountingProducts.Domain.Models;
using System.Xml.Linq;

namespace AccountingProducts.Application.Services;

public class PriceService(IPriceRepository repository) :
    BaseService<Price>(repository), IPriceService
{ }
