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
        CreateMap<CategoryCreateDto, Category>();
        CreateMap<ManufacturerCreateDto, Manufacturer>();
        CreateMap<ProductCreateDto, Product>()
            .ForMember(dest => dest.Categories, opt => opt.Ignore())
            .ForMember(dest => dest.Manufacturers, opt => opt.Ignore());
        CreateMap<PriceCreateDto, Price>();
        CreateMap<ShopCreateDto, Shop>();

        //Update
        CreateMap<CategoryUpdateDto, Category>();
        CreateMap<ManufacturerUpdateDto, Manufacturer>();
        CreateMap<ProductUpdateDto, Product>()
            .ForMember(dest => dest.Categories, opt => opt.Ignore())
            .ForMember(dest => dest.Manufacturers, opt => opt.Ignore());
        CreateMap<PriceUpdateDto, Price>();
        CreateMap<ShopUpdateDto, Shop>();

        #endregion

        #region модели в DTO

        CreateMap<Shop, ShopResponseDto>();
        CreateMap<Category, CategoryResponseDto>();
        CreateMap<Manufacturer, ManufacturerResponseDto>();
        CreateMap<Product, ProductResponseDto>()
            .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => src.Categories.Select(p => p.Id).ToList()))
            .ForMember(dest => dest.Manufacturers, opt => opt.MapFrom(src => src.Manufacturers.Select(p => p.Id).ToList()));
        CreateMap<Price, PriceResponseDto>();

        #endregion
    }
}
