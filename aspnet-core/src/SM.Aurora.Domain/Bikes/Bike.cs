using SM.Aurora.Biketypes;
using SM.Aurora.OrderBikes;
using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace SM.Aurora.Bikes
{
    public class Bike : AuditedAggregateRoot<Guid>
    {
        public string Brand { get; set; }
        public string Model { get; set; }

        public Guid BikeTypeId { get; set; }
        public BikeType BikeType { get; set; }

        public string Color { get; set; }
        public int ReleaseYear { get; set; }
        public double Price { get; set; }

        public List<OrderBike> OrderBikes { get; set; } = [];



        public string Title
        {
            get
            {
                return $"{Brand} {Model}";
            }
        }
    }
}
