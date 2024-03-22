using SM.Aurora.Permissions;
using System;
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
        public CustomerAppService(IRepository<Customer, Guid> repository)
        : base(repository)
        {
            GetPolicyName = AuroraPermissions.Customers.Default;
            GetListPolicyName = AuroraPermissions.Customers.Default;
            CreatePolicyName = AuroraPermissions.Customers.Create;
            UpdatePolicyName = AuroraPermissions.Customers.Edit;
            DeletePolicyName = AuroraPermissions.Customers.Delete;
        }
    }
}
