using AutoMapper;
using SM.Aurora.Biketypes;

namespace SM.Aurora.BikeTypes
{
    public class BikeTypeAutoMapperProfile : Profile
    {
        public BikeTypeAutoMapperProfile()
        {
            CreateMap<BikeType, BikeTypeDto>().ReverseMap();
        }
    }
}
