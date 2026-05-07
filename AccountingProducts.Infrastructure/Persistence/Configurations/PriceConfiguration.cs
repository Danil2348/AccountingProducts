using AccountingProducts.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AccountingProducts.Infrastructure.Persistence.Configurations;

public class PriceConfiguration : IEntityTypeConfiguration<Price>
{
    public void Configure(EntityTypeBuilder<Price> builder)
    {
        builder.HasKey(p => p.Id);

        builder.HasIndex(p => new
        {
            p.ProductId,
            p.CategoryId,
            p.ManufacturerId,
            p.ShopId
        }).IsUnique();

        builder.Property(p => p.CurrentPrice)
            .HasPrecision(18, 2)
            .IsRequired();

        builder.Property(p => p.OldPrice)
            .HasPrecision(18, 2);

        builder.HasOne(p => p.Product)
            .WithMany(p => p.Prices)
            .HasForeignKey(p => p.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(p => p.Category)
            .WithMany(c => c.Prices)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(p => p.Manufacturer)
            .WithMany(m => m.Prices)
            .HasForeignKey(p => p.ManufacturerId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(p => p.Shop)
            .WithMany(s => s.Prices)
            .HasForeignKey(p => p.ShopId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
