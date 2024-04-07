import type { OrderStatus } from './order-status.enum';
import type { AuditedEntityDto, FullAuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateOrderDto {
  orderDate?: string;
  orderStatus: OrderStatus;
  shippingAddress: string;
  customerId?: string;
}

export interface CustomerLookupDto extends AuditedEntityDto<string> {
  fullName?: string;
}

export interface OrderDto extends FullAuditedEntityDto<string> {
  orderId: number;
  orderDate?: string;
  orderStatus: OrderStatus;
  shippingAddress?: string;
  customer: CustomerLookupDto;
  customerId?: string;
  customerFullName?: string;
}
