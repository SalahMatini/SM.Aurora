import type { OrderStatus } from './order-status.enum';
import type { FullAuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateOrderDto {
  orderDate?: string;
  orderStatus: OrderStatus;
  shippingAddress: string;
}

export interface OrderDto extends FullAuditedEntityDto<string> {
  orderId: number;
  orderDate?: string;
  orderStatus: OrderStatus;
  shippingAddress?: string;
}
