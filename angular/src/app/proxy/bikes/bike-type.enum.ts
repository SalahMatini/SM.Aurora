import { mapEnumToOptions } from '@abp/ng.core';

export enum BikeType {
  MountainBike = 0,
  RoadBike = 1,
  HybridBike = 2,
  EBike = 3,
}

export const bikeTypeOptions = mapEnumToOptions(BikeType);
