using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace SM.Aurora.Bikes
{
    public class Bike : AuditedAggregateRoot<Guid>
    {
        public string Brand { get; set; }
        public string Model { get; set; }
        public BikeType Type { get; set; }
        public string Color { get; set; }
        public int ReleaseYear { get; set; }
        public double Price { get; set; }



        public string Title
        {
            get
            {
                return $"{Brand} {Model}";
            }
        }
    }
}
