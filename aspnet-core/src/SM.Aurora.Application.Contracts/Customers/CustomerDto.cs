using System;
using SM.Aurora.Shared;
using Volo.Abp.Application.Dtos;

namespace SM.Aurora.Customers
{
    public class CustomerDto : FullAuditedEntityDto<Guid>
    {
        public string FullName { get; set; }

        public int Age { get; set; }

        public Gender Gender { get; set; }

        public Country Country { get; set; }

        public string Email { get; set; }
    }
}
