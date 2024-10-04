import type { EntityDto, FullAuditedEntityDto } from '@abp/ng.core';
import type { Gender } from '../shared/gender.enum';
import type { Country } from '../shared/country.enum';

export interface CreateUpdateCustomerDto extends EntityDto<string> {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  email: string;
  phoneNumber: string;
  country: Country;
  address: string;
}

export interface CustomerDetailsDto extends FullAuditedEntityDto<string> {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  age: number;
  gender: Gender;
  email?: string;
  phoneNumber?: string;
  country: Country;
  address?: string;
}

export interface CustomerDto extends FullAuditedEntityDto<string> {
  fullName?: string;
  age: number;
  gender: Gender;
  country: Country;
  email?: string;
}
