using SM.Aurora.Biketypes;
using SM.Aurora.Lookups;
using SM.Aurora.Orders;
using SM.Aurora.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;

namespace SM.Aurora.Bikes;

public class BikeAppService :
    CrudAppService<
        Bike,
        BikeDetailsDto,
        BikeDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateBikeDto,
        CreateUpdateBikeDto>,
    IBikeAppService
{
    private readonly IRepository<Bike, Guid> _bikeRepository;
    private readonly IRepository<BikeType, Guid> _bikeTypeRepository;
    private readonly IRepository<Order, Guid> _orderRepository;

    public BikeAppService(IRepository<Bike, Guid> bikeRepository,
            IRepository<BikeType, Guid> bikeTypeRepository,
        IRepository<Order, Guid> orderRepository
        )
        : base(bikeRepository)
    {
        _bikeRepository = bikeRepository;
        _bikeTypeRepository = bikeTypeRepository;
        _orderRepository = orderRepository;
        GetPolicyName = AuroraPermissions.Bikes.Default;
        GetListPolicyName = AuroraPermissions.Bikes.Default;
        CreatePolicyName = AuroraPermissions.Bikes.Create;
        UpdatePolicyName = AuroraPermissions.Bikes.Edit;
        DeletePolicyName = AuroraPermissions.Bikes.Delete;
    }

    protected override async Task<IQueryable<Bike>> CreateFilteredQueryAsync(PagedAndSortedResultRequestDto input)
    {
        return await ReadOnlyRepository.WithDetailsAsync(b => b.BikeType);
    }

    public override async Task<BikeDetailsDto> GetAsync(Guid id)
    {
        // Fetch the bike
        var bike = await _bikeRepository.GetAsync(id);
        if (bike == null)
        {
            throw new EntityNotFoundException(typeof(Bike), id);
        }

        // Fetch the related BikeType
        var bikeType = await _bikeTypeRepository.GetAsync(bike.BikeTypeId);
        if (bikeType != null)
        {
            bike.BikeType = bikeType;
        }

        return ObjectMapper.Map<Bike, BikeDetailsDto>(bike);
    }


    public async Task<IEnumerable<LookupDto>> GetBikeLookup()
    {
        await CheckGetPolicyAsync();

        var bikes = await Repository.ToListAsync();

        var bikeLookup = bikes.Select(b => new LookupDto()
        {
            Id = b.Id,
            Name = $"{b.Brand} - {b.Model}"
        });

        return bikeLookup;
    }

    public async Task<List<BikeDto>> GetListByOrderAsync(Guid orderId)
    {
        // Fetch the order
        var order = await _orderRepository.GetAsync(orderId);

        //var order = orderQuery
        //                .Include()

        if (order == null)
        {
            throw new EntityNotFoundException(typeof(Order), orderId);
        }

        // Fetch the related OrderBikes
        var orderBikes = order.OrderBikes.ToList();
        var bikeIds = orderBikes.Select(ob => ob.BikeId).ToList();

        // Fetch the related Bikes
        var bikes = await _bikeRepository.GetListAsync(b => bikeIds.Contains(b.Id));

        // Map to DTO
        return ObjectMapper.Map<List<Bike>, List<BikeDto>>(bikes);
    }


}
