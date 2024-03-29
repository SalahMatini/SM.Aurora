using System;
using System.ComponentModel.DataAnnotations;

namespace SM.Aurora.Orders
{
    public class CreateUpdateOrderDto
    {
        public DateTime OrderDate { get; set; } = DateTime.Now;

        [Required]
        public OrderStatus OrderStatus { get; set; }

        [Required]
        [StringLength(256)]
        public string ShippingAddress { get; set; }

    }
}
