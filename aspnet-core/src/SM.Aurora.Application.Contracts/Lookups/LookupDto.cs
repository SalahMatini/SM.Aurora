using System;
using Volo.Abp.Application.Dtos;

namespace SM.Aurora.Lookups
{
    public class LookupDto : EntityDto<Guid>
    {
        public string? Name { get; set; }
    }
}
