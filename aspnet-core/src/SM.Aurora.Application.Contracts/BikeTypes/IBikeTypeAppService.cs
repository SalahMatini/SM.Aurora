using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace SM.Aurora.BikeTypes
{
    public interface IBikeTypeAppService :
        ICrudAppService<
            BikeTypeDto,
            Guid,
            PagedAndSortedResultRequestDto>

    {
    }
}
