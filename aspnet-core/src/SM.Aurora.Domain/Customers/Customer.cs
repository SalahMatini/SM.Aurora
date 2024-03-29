using SM.Aurora.Shared;
using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace SM.Aurora.Customers
{
    public class Customer : FullAuditedAggregateRoot<Guid>
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Country Country { get; set; }
        public string Address { get; set; }



        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }

        }

        public int Age
        {
            get
            {
                DateTime today = DateTime.Today;
                TimeSpan ageSpan = today - DateOfBirth;


                int age = (int)Math.Floor(ageSpan.TotalDays / 365.25);

                return age;
            }
        }

    }
}
