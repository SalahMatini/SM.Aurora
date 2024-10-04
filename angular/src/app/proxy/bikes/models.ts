import type { EntityDto } from '@abp/ng.core';
import type { BikeTypeDto } from '../bike-types/models';

export interface BikeDetailsDto extends EntityDto<string> {
  brand?: string;
  model?: string;
  color?: string;
  releaseYear: number;
  price: number;
  bikeTypeId?: string;
  bikeType: BikeTypeDto;
}

export interface BikeDto extends EntityDto<string> {
  brand?: string;
  model?: string;
  color?: string;
  releaseYear: number;
  price: number;
  bikeTypeId?: string;
  bikeType: BikeTypeDto;
}

export interface CreateUpdateBikeDto {
  brand: string;
  model: string;
  color: string;
  releaseYear: number;
  price: number;
  bikeTypeId: string;
}
