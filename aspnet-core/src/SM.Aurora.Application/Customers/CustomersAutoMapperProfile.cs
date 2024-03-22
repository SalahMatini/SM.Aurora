using AutoMapper;

namespace SM.Aurora.Customers
{
    public class CustomersAutoMapperProfile : Profile
    {
        public CustomersAutoMapperProfile()
        {
            CreateMap<Customer, CustomerDto>();
            CreateMap<Customer, CustomerDetailsDto>();
            CreateMap<CreateUpdateCustomerDto, Customer>();
        }
    }
}
