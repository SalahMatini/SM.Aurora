using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace SM.Aurora.Bikes;

public interface IBikeAppService :
    ICrudAppService< //Defines CRUD methods
        BikeDto, //Used to show bikes
        Guid, //Primary key of the bike entity
        PagedAndSortedResultRequestDto, //Used for paging/sorting
        CreateUpdateBikeDto> //Used to create/update a bike
{

}
