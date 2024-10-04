using SM.Aurora.Shared;
using System;
using Volo.Abp.Application.Dtos;

namespace SM.Aurora.Customers
{
    public class CustomerDetailsDto : FullAuditedEntityDto<Guid>
    {
        public string FullName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTimeOffset DateOfBirth { get; set; }

        public int Age { get; set; }

        public Gender Gender { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public Country Country { get; set; }

        public string Address { get; set; }
    }
}
