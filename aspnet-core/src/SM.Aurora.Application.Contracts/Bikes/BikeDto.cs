using SM.Aurora.BikeTypes;
using System;
using Volo.Abp.Application.Dtos;

namespace SM.Aurora.Bikes
{
    public class BikeDto : EntityDto<Guid>
    {
        public string Brand { get; set; }

        public string Model { get; set; }

        public string Color { get; set; }

        public int ReleaseYear { get; set; }

        public double Price { get; set; }

        public Guid BikeTypeId { get; set; }

        public BikeTypeDto BikeType { get; set; }
    }
}
