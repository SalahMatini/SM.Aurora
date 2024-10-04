import type { BikeTypeDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../lookups/models';

@Injectable({
  providedIn: 'root',
})
export class BikeTypeService {
  apiName = 'Default';
  

  create = (input: BikeTypeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BikeTypeDto>({
      method: 'POST',
      url: '/api/app/bike-type',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/bike-type/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BikeTypeDto>({
      method: 'GET',
      url: `/api/app/bike-type/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getBikeTypeLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: '/api/app/bike-type/bike-type-lookup',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<BikeTypeDto>>({
      method: 'GET',
      url: '/api/app/bike-type',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: BikeTypeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BikeTypeDto>({
      method: 'PUT',
      url: `/api/app/bike-type/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
