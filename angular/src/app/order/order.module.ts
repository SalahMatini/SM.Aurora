import { NgModule } from '@angular/core';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from '../shared/shared.module';
import { CreateUpdateOrderComponent } from './create-update-order/create-update-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { DeleteOrderDialogComponent } from './delete-order-dialog/delete-order-dialog.component';

@NgModule({
  declarations: [
    OrderComponent,
    CreateUpdateOrderComponent,
    OrderDetailsComponent,
    DeleteOrderDialogComponent
  ],
  imports: [
    SharedModule,
    OrderRoutingModule
  ],
})
export class OrderModule { }
