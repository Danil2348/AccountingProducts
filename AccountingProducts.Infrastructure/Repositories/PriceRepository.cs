using AccountingProducts.Application.Common.Interfaces.Repositories;
using AccountingProducts.Domain.Models;

namespace AccountingProducts.Infrastructure.Repositories;

public class PriceRepository(AppDbContext appDbContext) :
    BaseRepository<Price>(appDbContext), IPriceRepository
{ }
