using SM.Aurora.Bikes;
using SM.Aurora.Orders;
using System;
using Volo.Abp.Domain.Entities;

namespace SM.Aurora.OrderBikes
{
    public class OrderBike : Entity<Guid>
    {
        public Guid OrderId { get; set; }
        public Order Order { get; set; }

        public Guid BikeId { get; set; }
        public Bike Bike { get; set; }

    }
}
