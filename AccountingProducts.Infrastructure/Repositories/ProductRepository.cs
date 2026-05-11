using AccountingProducts.Application.Common.Interfaces.Repositories;
using AccountingProducts.Domain.Models;

namespace AccountingProducts.Infrastructure.Repositories;

public class ProductRepository(AppDbContext appDbContext) :
    BaseRepository<Product>(appDbContext), IProductRepository
{ }
