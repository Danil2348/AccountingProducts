using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingProducts.Domain.Models;

public class Product
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<Category> Categories { get; set; }
    public List<Manufacturer> Manufacturers { get; set; }
}
