using SM.Aurora.Permissions;
using System;
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
    public BikeAppService(IRepository<Bike, Guid> repository)
        : base(repository)
    {
        GetPolicyName = AuroraPermissions.Bikes.Default;
        GetListPolicyName = AuroraPermissions.Bikes.Default;
        CreatePolicyName = AuroraPermissions.Bikes.Create;
        UpdatePolicyName = AuroraPermissions.Bikes.Edit;
        DeletePolicyName = AuroraPermissions.Bikes.Delete;
    }
}
