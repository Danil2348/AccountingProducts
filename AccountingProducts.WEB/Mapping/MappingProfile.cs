using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Contracts;
using AutoMapper;

namespace AccountingProducts.WEB.Mapping;

public class MappingProfile: Profile
{
    public MappingProfile()
    {
        //DTO в модели
        CreateMap<ShopDto, Shop>();
        CreateMap<CategoryDto, Category>();
        CreateMap<ManufacturerDto, Manufacturer>();
        CreateMap<ProductDto, Product>();
        CreateMap<PriceDto, Price>();

        //модели в DTO
        CreateMap<Shop, ShopDto>();
        CreateMap<Category, CategoryDto>();
        CreateMap<Manufacturer, ManufacturerDto>();
        CreateMap<Product, ProductDto>();
        CreateMap<Price, PriceDto>();
    }
}
