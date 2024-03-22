using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace SM.Aurora.Customers
{
    public interface ICustomerAppService :
        ICrudAppService< //Defines CRUD methods
        CustomerDetailsDto,
        CustomerDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateCustomerDto,
        CreateUpdateCustomerDto>
    {

    }
}
