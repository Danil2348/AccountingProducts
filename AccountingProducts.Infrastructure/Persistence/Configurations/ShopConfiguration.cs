using AccountingProducts.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AccountingProducts.Infrastructure.Persistence.Configurations;

public class ShopConfiguration : IEntityTypeConfiguration<Shop>
{
    public void Configure(EntityTypeBuilder<Shop> builder)
    {
        builder.HasKey(s => s.Id);

        builder.Property(s => s.Name)
            .HasMaxLength(250);
    }
}
