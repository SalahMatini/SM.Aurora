using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace SM.Aurora.Bikes;

public interface IBikeAppService :
    ICrudAppService<
        BikeDetailsDto,
        BikeDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateBikeDto,
        CreateUpdateBikeDto>
{

}
