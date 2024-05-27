import type { BikeDto, CreateUpdateBikeDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../lookups/models';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  apiName = 'Default';
  

  create = (input: CreateUpdateBikeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BikeDto>({
      method: 'POST',
      url: '/api/app/bike',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/bike/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BikeDto>({
      method: 'GET',
      url: `/api/app/bike/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getBikeLookup = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: '/api/app/bike/bike-lookup',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<BikeDto>>({
      method: 'GET',
      url: '/api/app/bike',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateBikeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BikeDto>({
      method: 'PUT',
      url: `/api/app/bike/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
