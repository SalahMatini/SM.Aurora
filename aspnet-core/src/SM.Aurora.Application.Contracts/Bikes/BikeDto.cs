using System;
using Volo.Abp.Application.Dtos;

namespace SM.Aurora.Bikes
{
    public class BikeDto : EntityDto<Guid>
    {
        public string Brand { get; set; }

        public string Model { get; set; }

        public BikeType Type { get; set; }

        public string Color { get; set; }

        public int ReleaseYear { get; set; }

        public double Price { get; set; }
    }
}
