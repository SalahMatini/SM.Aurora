using System;
using Volo.Abp.Application.Dtos;

namespace SM.Aurora.Orders
{
    public class OrderDto : FullAuditedEntityDto<Guid>
    {

        public int OrderId { get; set; }

        public DateTime OrderDate { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public string ShippingAddress { get; set; }

    }
}
