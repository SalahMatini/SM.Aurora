using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace SM.Aurora.Orders
{
    public class CreateUpdateOrderDto : EntityDto<Guid>
    {
        public DateTime OrderDate { get; set; } = DateTime.Now;

        [Required]
        public OrderStatus OrderStatus { get; set; }

        [Required]
        [StringLength(256)]
        public string ShippingAddress { get; set; }

        [Required]

        public Guid CustomerId { get; set; }

        public List<Guid> BikeIds { get; set; } = [];

    }
}
