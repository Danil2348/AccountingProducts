using AccountingProducts.Application.Common.Interfaces.Repositories;
using AccountingProducts.Application.Common.Interfaces.Services;
using AccountingProducts.Domain.Models;

namespace AccountingProducts.Application.Services;

public class ShopService(IShopRepository repository) :
    BaseService<Shop>(repository), IShopService
{ }
