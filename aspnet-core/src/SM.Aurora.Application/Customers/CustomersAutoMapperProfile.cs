using AutoMapper;

namespace SM.Aurora.Customers
{
    public class BikeTypeAutoMapperProfile : Profile
    {
        public BikeTypeAutoMapperProfile()
        {
            CreateMap<Customer, CustomerDto>();
            CreateMap<Customer, CustomerDetailsDto>();
            CreateMap<CreateUpdateCustomerDto, Customer>();
        }
    }
}
