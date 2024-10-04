using AutoMapper;
using System.Linq;

namespace SM.Aurora.Orders
{
    public class OrderAutoMapperProfile : Profile
    {
        public OrderAutoMapperProfile()
        {
            CreateMap<Order, OrderDto>();

            CreateMap<CreateUpdateOrderDto, Order>();

            CreateMap<Order, OrderDetailsDto>()
                .ForMember(orderDetailsDto => orderDetailsDto.Bikes,
                            opts => opts.MapFrom(order => order.OrderBikes.Select(ob => ob.Bike)));
        }
    }
}
