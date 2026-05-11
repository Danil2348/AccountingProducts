using AccountingProducts.Application.Common.Interfaces.Repositories;
using AccountingProducts.Domain.Models;

namespace AccountingProducts.Infrastructure.Repositories;

public class ManufacturerRepository(AppDbContext appDbContext) :
    BaseRepository<Manufacturer>(appDbContext), IManufacturerRepository
{ }
