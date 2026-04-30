using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingProducts.Domain.Models;

public class Price
{
    public Guid Id { get; set; }
    public decimal OldPrice { get; set; }    
    public decimal CurrentPrice { get; set; }     
    public Guid ProductId { get; set; }
    public Guid CategoryId { get; set; }
    public Guid ManufacturerId { get; set; }
    public Guid ShopId { get; set; }    
    public Product Product { get; set; }
    public Category Category { get; set; }
    public Manufacturer Manufacturer { get; set; }
    public Shop Shop { get; set; }

}
