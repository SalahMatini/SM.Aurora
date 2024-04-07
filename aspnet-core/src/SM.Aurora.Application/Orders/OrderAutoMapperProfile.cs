using AutoMapper;
using SM.Aurora.Customers;

namespace SM.Aurora.Orders
{
    public class OrderAutoMapperProfile : Profile
    {
        public OrderAutoMapperProfile()
        {
            CreateMap<Order, OrderDto>();
            CreateMap<CreateUpdateOrderDto, Order>();
            CreateMap<Customer, CustomerLookupDto>();
        }
    }
}
