import type { CreateUpdateOrderDto, OrderDetailsDto, OrderDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiName = 'Default';
  

  create = (createUpdateOrderDto: CreateUpdateOrderDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDetailsDto>({
      method: 'POST',
      url: '/api/app/order',
      body: createUpdateOrderDto,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/order/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDetailsDto>({
      method: 'GET',
      url: `/api/app/order/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<OrderDto>>({
      method: 'GET',
      url: '/api/app/order',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListByCustomer = (customerId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDto[]>({
      method: 'GET',
      url: `/api/app/order/by-customer/${customerId}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateOrderDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDetailsDto>({
      method: 'PUT',
      url: `/api/app/order/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
