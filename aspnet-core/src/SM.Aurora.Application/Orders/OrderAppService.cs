using SM.Aurora.Bikes;
using SM.Aurora.OrderBikes;
using SM.Aurora.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;


namespace SM.Aurora.Orders
{
    public class OrderAppService :
        CrudAppService<
            Order,
            OrderDetailsDto,
            OrderDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateUpdateOrderDto,
            CreateUpdateOrderDto>,
        IOrderAppService
    {
        private readonly IRepository<Order, Guid> _orderRepository;
        private readonly IRepository<Bike, Guid> _bikeRepository;

        public OrderAppService(
            IRepository<Order, Guid> orderRepository,
            IRepository<Bike, Guid> bikeRepository
            ) : base(orderRepository)
        {
            GetPolicyName = AuroraPermissions.Orders.Default;
            GetListPolicyName = AuroraPermissions.Orders.Default;
            CreatePolicyName = AuroraPermissions.Orders.Create;
            UpdatePolicyName = AuroraPermissions.Orders.Edit;
            DeletePolicyName = AuroraPermissions.Orders.Delete;

            _orderRepository = orderRepository;
            this._orderRepository = orderRepository;
            this._bikeRepository = bikeRepository;
        }

        protected override async Task<IQueryable<Order>> CreateFilteredQueryAsync(PagedAndSortedResultRequestDto input)
        {
            await CheckGetListPolicyAsync();

            return await ReadOnlyRepository.WithDetailsAsync(o => o.Customer);
        }

        public async Task<List<OrderDto>> GetListByCustomerAsync(Guid customerId)
        {
            await CheckGetListPolicyAsync();

            var orderQuery = await _orderRepository.GetQueryableAsync();

            var customerOrders = orderQuery
                                    .Where(order => order.CustomerId == customerId)
                                    .ToList();

            return ObjectMapper.Map<List<Order>, List<OrderDto>>(customerOrders);
        }

        public override async Task<OrderDetailsDto> GetAsync(Guid id)
        {
            await CheckGetPolicyAsync();

            var order = await GetOrderById(id);

            if (order == null)
            {
                throw new UserFriendlyException($"Order with Id: {id} not found!");
            }

            return await MapToGetOutputDtoAsync(order);
        }

        public override async Task<OrderDetailsDto> CreateAsync(CreateUpdateOrderDto createUpdateOrderDto)
        {
            await CheckCreatePolicyAsync();

            var order = await MapToEntityAsync(createUpdateOrderDto);

            await Repository.InsertAsync(order, autoSave: true);

            UpdateOrderBikes(order, createUpdateOrderDto.BikeIds);

            await Repository.UpdateAsync(order);

            return await MapToGetOutputDtoAsync(order);
        }

        public override async Task<OrderDetailsDto> UpdateAsync(Guid id, CreateUpdateOrderDto createUpdateOrderDto)
        {
            await CheckUpdatePolicyAsync();

            if (id != createUpdateOrderDto.Id)
            {
                throw new UserFriendlyException("Id is not the same as Dto.Id");
            }

            var order = await GetOrderById(createUpdateOrderDto.Id);

            if (order == null)
            {
                throw new UserFriendlyException($"Order with Id: {id} not found!");
            }

            ObjectMapper.Map(createUpdateOrderDto, order);

            UpdateOrderBikes(order, createUpdateOrderDto.BikeIds);

            await Repository.UpdateAsync(order);

            return await MapToGetOutputDtoAsync(order);
        }

        #region Private Methods

        private async void UpdateOrderBikes(Order order, List<Guid> bikeIds)
        {
            var bikes = await GetBikesByIds(bikeIds);

            var orderBikes = new List<OrderBike>();

            foreach (var bike in bikes)
            {
                var orderBike = new OrderBike
                {
                    BikeId = bike.Id,
                    OrderId = order.Id
                };
                orderBikes.Add(orderBike);
            }

            order.OrderBikes.Clear();

            order.OrderBikes.AddRange(orderBikes);
        }

        private async Task<List<Bike>> GetBikesByIds(List<Guid> bikeIds)
        {
            var bikesQuery = await _bikeRepository.GetQueryableAsync();

            bikesQuery = bikesQuery.Where(b => bikeIds.Contains(b.Id));

            var bikes = bikesQuery.ToList();

            return bikes;
        }

        private async Task<Order?> GetOrderById(Guid id)
        {
            var orderQuery = await _orderRepository.WithDetailsAsync();

            var order = orderQuery
                            .Where(o => o.Id == id)
                            .SingleOrDefault();

            return order;
        }

        #endregion

    }

}
