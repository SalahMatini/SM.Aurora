using SM.Aurora.Lookups;
using SM.Aurora.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace SM.Aurora.Customers
{
    public class CustomerAppService :
        CrudAppService<
            Customer,
            CustomerDetailsDto,
            CustomerDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateUpdateCustomerDto,
            CreateUpdateCustomerDto
            >, ICustomerAppService
    {
        public CustomerAppService(IRepository<Customer, Guid> CustomerRepository)
        : base(CustomerRepository)
        {
            GetPolicyName = AuroraPermissions.Customers.Default;
            GetListPolicyName = AuroraPermissions.Customers.Default;
            CreatePolicyName = AuroraPermissions.Customers.Create;
            UpdatePolicyName = AuroraPermissions.Customers.Edit;
            DeletePolicyName = AuroraPermissions.Customers.Delete;
        }

        public async Task<IEnumerable<LookupDto>> GetCustomerLookup()
        {
            await CheckGetPolicyAsync();

            var customers = await Repository.ToListAsync();

            var customerLookup = customers.Select(c => new LookupDto()
            {
                Id = c.Id,
                Name = $"{c.FirstName} - {c.LastName}"
            });
            return customerLookup;

        }

    }
}
