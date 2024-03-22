import { mapEnumToOptions } from '@abp/ng.core';

export enum Gender {
  Male = 0,
  Female = 1,
  MentallyIll = 2,
}

export const genderOptions = mapEnumToOptions(Gender);
