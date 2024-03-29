import { mapEnumToOptions } from '@abp/ng.core';

export enum OrderStatus {
  Pending = 0,
  Processing = 1,
  Shipped = 2,
  Delivered = 3,
  Cancelled = 4,
}

export const orderStatusOptions = mapEnumToOptions(OrderStatus);
