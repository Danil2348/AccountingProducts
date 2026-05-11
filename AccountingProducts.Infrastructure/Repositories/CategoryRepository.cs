using AccountingProducts.Application.Common.Interfaces.Repositories;
using AccountingProducts.Domain.Models;

namespace AccountingProducts.Infrastructure.Repositories;

public class CategoryRepository(AppDbContext appDbContext) :
    BaseRepository<Category>(appDbContext), ICategoryRepository
{ }
