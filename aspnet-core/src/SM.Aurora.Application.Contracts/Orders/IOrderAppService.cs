using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace SM.Aurora.Orders
{
    public interface IOrderAppService :
        ICrudAppService<
        OrderDetailsDto,
        OrderDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateOrderDto,
        CreateUpdateOrderDto>
    {
    }
}
