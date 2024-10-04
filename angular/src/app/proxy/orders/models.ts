import type { EntityDto, FullAuditedEntityDto } from '@abp/ng.core';
import type { OrderStatus } from './order-status.enum';
import type { CustomerDto } from '../customers/models';
import type { BikeDto } from '../bikes/models';

export interface CreateUpdateOrderDto extends EntityDto<string> {
  orderDate?: string;
  orderStatus: OrderStatus;
  shippingAddress: string;
  customerId: string;
  bikeIds: string[];
}

export interface OrderDetailsDto extends EntityDto<string> {
  orderDate?: string;
  orderStatus: OrderStatus;
  shippingAddress?: string;
  customerId?: string;
  customer: CustomerDto;
  bikes: BikeDto[];
}

export interface OrderDto extends FullAuditedEntityDto<string> {
  orderDate?: string;
  orderStatus: OrderStatus;
  shippingAddress?: string;
  customerId?: string;
  customer: CustomerDto;
  bikeIds: string[];
}
