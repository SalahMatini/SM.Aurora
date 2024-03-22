using System;
using System.ComponentModel.DataAnnotations;
using SM.Aurora.Shared;

namespace SM.Aurora.Customers
{
    public class CreateUpdateCustomerDto
    {
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public Gender Gender { get; set; }

        [Required]
        [StringLength(256)]
        public string Email { get; set; }

        [Required]
        [StringLength(20)]
        public string PhoneNumber { get; set; }

        [Required]
        public Country Country { get; set; }

        [Required]
        [StringLength(256)]
        public string Address { get; set; }
    }
}
