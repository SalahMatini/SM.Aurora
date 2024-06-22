using SM.Aurora.Customers;
using SM.Aurora.OrderBikes;
using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace SM.Aurora.Orders
{
    public class Order : FullAuditedAggregateRoot<Guid>
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public OrderStatus OrderStatus { get; set; }
        public string ShippingAddress { get; set; }

        public Customer Customer { get; set; }
        public Guid CustomerId { get; set; }

        public List<OrderBike> OrderBikes { get; set; } = [];



    }
}
