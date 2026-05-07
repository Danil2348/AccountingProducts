using AccountingProducts.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AccountingProducts.Infrastructure.Persistence.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name)
            .HasMaxLength(250);

        builder
            .HasMany(p => p.Categories)
            .WithMany(c => c.Products);

        builder
            .HasMany(p => p.Manufacturers)
            .WithMany(m => m.Products);
    }
}
