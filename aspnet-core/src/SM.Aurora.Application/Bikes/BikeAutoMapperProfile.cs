using AutoMapper;

namespace SM.Aurora.Bikes;

public class BikeAutoMapperProfile : Profile
{
    public BikeAutoMapperProfile()
    {
        CreateMap<Bike, BikeDto>();
        CreateMap<CreateUpdateBikeDto, Bike>();
        CreateMap<Bike, BikeDetailsDto>();
    }
}