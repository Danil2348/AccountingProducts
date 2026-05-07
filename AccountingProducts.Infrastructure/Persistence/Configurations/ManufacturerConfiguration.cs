using AccountingProducts.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AccountingProducts.Infrastructure.Persistence.Configurations;

public class ManufacturerConfiguration : IEntityTypeConfiguration<Manufacturer>
{
    public void Configure(EntityTypeBuilder<Manufacturer> builder)
    {
        builder.HasKey(m => m.Id);

        builder.Property(m => m.Name)
            .HasMaxLength(250);
    }
}
