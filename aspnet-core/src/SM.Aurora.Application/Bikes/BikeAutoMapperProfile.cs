using AutoMapper;
using SM.Aurora.Bikes;

namespace SM.Aurora.Bikes;

public class BikeAutoMapperProfile : Profile
{
    public BikeAutoMapperProfile()
    {
        CreateMap<Bike, BikeDto>();
        CreateMap<CreateUpdateBikeDto, Bike>();
    }
}