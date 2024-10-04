using System;
using Volo.Abp.Application.Dtos;

namespace SM.Aurora.BikeTypes
{
    public class BikeTypeDto : EntityDto<Guid>
    {
        public string Name { get; set; }
    }
}
