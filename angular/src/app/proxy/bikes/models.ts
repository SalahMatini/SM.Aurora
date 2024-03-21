import type { AuditedEntityDto } from '@abp/ng.core';
import type { BikeType } from './bike-type.enum';

export interface BikeDto extends AuditedEntityDto<string> {
  brand?: string;
  model?: string;
  type: BikeType;
  color?: string;
  releaseYear: number;
  price: number;
}

export interface CreateUpdateBikeDto {
  brand: string;
  model: string;
  type: BikeType;
  color: string;
  releaseYear: number;
  price: number;
}
