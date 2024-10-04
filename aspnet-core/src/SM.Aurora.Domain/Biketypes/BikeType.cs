using SM.Aurora.Bikes;
using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;

namespace SM.Aurora.Biketypes
{
    public class BikeType : Entity<Guid>
    {
        public string Name { get; set; }
        public List<Bike> Bike { get; set; } = [];
    }
}
