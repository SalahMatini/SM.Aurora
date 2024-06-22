using System;
using Volo.Abp.Application.Dtos;

namespace SM.Aurora.Orders
{
    public class OrderDetailsDto : EntityDto<Guid>
    {
        public int OrderId { get; set; }

        public DateTime OrderDate { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public string ShippingAddress { get; set; }

        public Guid CustomerId { get; set; }

        public string CustomerFullName { get; set; }

    }
}
