using AccountingProducts.Domain.Models;
using AccountingProducts.WEB.Contracts.Requests.Create;
using AccountingProducts.WEB.Contracts.Requests.Update;
using AccountingProducts.WEB.Contracts.Responses;
using AutoMapper;

namespace AccountingProducts.WEB.Mapping;

public class MappingProfile: Profile
{
    public MappingProfile()
    {
        #region DTO в модели

        //Create
        CreateMap<CategoryCreateDto, Category>()
            .ForMember(dest => dest.Products, opt => opt.Ignore());
        CreateMap<ManufacturerCreateDto, Manufacturer>()
            .ForMember(dest => dest.Products, opt => opt.Ignore());
        CreateMap<ProductCreateDto, Product>()
            .ForMember(dest => dest.Categories, opt => opt.Ignore())
            .ForMember(dest => dest.Manufacturers, opt => opt.Ignore());
        CreateMap<PriceCreateDto, Price>();
        CreateMap<ShopCreateDto, Shop>();

        //Update
        CreateMap<CategoryUpdateDto, Category>()
            .ForMember(dest => dest.Products, opt => opt.Ignore());
        CreateMap<ManufacturerUpdateDto, Manufacturer>()
            .ForMember(dest => dest.Products, opt => opt.Ignore());
        CreateMap<ProductUpdateDto, Product>()
            .ForMember(dest => dest.Categories, opt => opt.Ignore())
            .ForMember(dest => dest.Manufacturers, opt => opt.Ignore());
        CreateMap<PriceUpdateDto, Price>();
        CreateMap<ShopUpdateDto, Shop>();

        #endregion

        #region модели в DTO

        CreateMap<Shop, ShopResponseDto>();
        CreateMap<Category, CategoryResponseDto>()
            .ForMember(dest => dest.ProductIds, opt => opt.MapFrom(src => src.Products.Select(p => p.Id).ToList()));
        CreateMap<Manufacturer, ManufacturerResponseDto>()
            .ForMember(dest => dest.ProductIds, opt => opt.MapFrom(src => src.Products.Select(p => p.Id).ToList()));
        CreateMap<Product, ProductResponseDto>()
            .ForMember(dest => dest.CategoryIds, opt => opt.MapFrom(src => src.Categories.Select(p => p.Id).ToList()))
            .ForMember(dest => dest.ManufacturerIds, opt => opt.MapFrom(src => src.Manufacturers.Select(p => p.Id).ToList()));
        CreateMap<Price, PriceResponseDto>();

        #endregion
    }
}
