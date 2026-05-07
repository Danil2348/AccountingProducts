using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AccountingProducts.Domain.Models;
using AccountingProducts.Infrastructure.Persistence.Configurations;

namespace AccountingProducts.Infrastructure;
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Manufacturer> Manufacturers { get; set; }
    public DbSet<Shop> Shops { get; set; }
    public DbSet<Price> Prices { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new ProductConfiguration());
        modelBuilder.ApplyConfiguration(new CategoryConfiguration());
        modelBuilder.ApplyConfiguration(new ManufacturerConfiguration());
        modelBuilder.ApplyConfiguration(new ShopConfiguration());
        modelBuilder.ApplyConfiguration(new PriceConfiguration());
        base.OnModelCreating(modelBuilder);
    }
}
