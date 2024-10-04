import type { EntityDto } from '@abp/ng.core';

export interface BikeTypeDto extends EntityDto<string> {
  name?: string;
}
