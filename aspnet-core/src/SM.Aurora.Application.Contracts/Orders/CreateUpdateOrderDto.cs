using System;
using System.Collections.Generic;
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

        public Guid CustomerId { get; set; }

        public List<int> BikeIds { get; set; } = [];

    }
}
