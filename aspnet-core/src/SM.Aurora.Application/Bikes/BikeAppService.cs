using SM.Aurora.Lookups;
using SM.Aurora.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace SM.Aurora.Bikes;

public class BikeAppService :
    CrudAppService<
        Bike, //The Bike entity
        BikeDto, //Used to show bikes
        Guid, //Primary key of the bike entity
        PagedAndSortedResultRequestDto, //Used for paging/sorting
        CreateUpdateBikeDto>, //Used to create/update a bike
    IBikeAppService //implement the IBikeAppService
{
    public BikeAppService(IRepository<Bike, Guid> bikeRepository
        )
        : base(bikeRepository)
    {
        GetPolicyName = AuroraPermissions.Bikes.Default;
        GetListPolicyName = AuroraPermissions.Bikes.Default;
        CreatePolicyName = AuroraPermissions.Bikes.Create;
        UpdatePolicyName = AuroraPermissions.Bikes.Edit;
        DeletePolicyName = AuroraPermissions.Bikes.Delete;
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
}
