using AutoMapper;
using SM.Aurora.Orders;

namespace SM.Aurora.Customers
{
    public class OrderAutoMapperProfile : Profile
    {
        public OrderAutoMapperProfile()
        {
            CreateMap<Order, OrderDto>();
            CreateMap<CreateUpdateOrderDto, Order>();
        }
    }
}
