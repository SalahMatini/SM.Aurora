using System;
using Volo.Abp.Application.Dtos;

namespace SM.Aurora.Orders
{
    public class CustomerLookupDto : AuditedEntityDto<Guid>
    {
        public string FullName { get; set; }
    }
}
