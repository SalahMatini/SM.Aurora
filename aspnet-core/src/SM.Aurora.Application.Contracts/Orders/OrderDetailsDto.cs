using SM.Aurora.Bikes;
using SM.Aurora.Customers;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace SM.Aurora.Orders
{
    public class OrderDetailsDto : EntityDto<Guid>
    {
        public DateTime OrderDate { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public string ShippingAddress { get; set; }
        public Guid CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public List<BikeDto> Bikes { get; set; }
    }
}
