using SM.Aurora.Permissions;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;


namespace SM.Aurora.Orders
{
    public class OrderAppService :
        CrudAppService<
            Order,
            OrderDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateUpdateOrderDto
        >,
        IOrderAppService
    {

        public OrderAppService(
            IRepository<Order, Guid> repository)
        : base(repository)
        {
            GetPolicyName = AuroraPermissions.Orders.Default;
            GetListPolicyName = AuroraPermissions.Orders.Default;
            CreatePolicyName = AuroraPermissions.Orders.Create;
            UpdatePolicyName = AuroraPermissions.Orders.Edit;
            DeletePolicyName = AuroraPermissions.Orders.Delete;
        }

        public override async Task<OrderDto> CreateAsync(CreateUpdateOrderDto createUpdateOrderDto)
        {
            await CheckCreatePolicyAsync();

            var order = await MapToEntityAsync(createUpdateOrderDto);

            await Repository.InsertAsync(order, autoSave: true);

            return await MapToGetOutputDtoAsync(order);
        }

    }
}