using AccountingProducts.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AccountingProducts.Infrastructure.Persistence.Configurations;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Name)
            .HasMaxLength(250);
    }
}
