using AccountingProducts.Application.Common.Interfaces.Repositories;
using AccountingProducts.Domain.Models;

namespace AccountingProducts.Infrastructure.Repositories;

public class ShopRepository(AppDbContext appDbContext) :
    BaseRepository<Shop>(appDbContext), IShopRepository
{ }
