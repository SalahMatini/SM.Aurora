using SM.Aurora.Biketypes;
using SM.Aurora.Lookups;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace SM.Aurora.BikeTypes
{
    public class BikeTypeAppService :
        CrudAppService<
            BikeType,
            BikeTypeDto,
            Guid,
            PagedAndSortedResultRequestDto>,
        IBikeTypeAppService
    {

        public BikeTypeAppService(IRepository<BikeType, Guid> repository) : base(repository) { }

        public async Task<IEnumerable<LookupDto>> GetBikeTypeLookup()
        {
            await CheckGetPolicyAsync();

            var bikeTypes = await Repository.ToListAsync();

            var bikeTypeLookup = bikeTypes.Select(b => new LookupDto()
            {
                Id = b.Id,
                Name = b.Name,
            });

            return bikeTypeLookup;
        }
    }
}
