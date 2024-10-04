import { NgModule } from '@angular/core';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from '../shared/shared.module';
import { DeleteOrderDialogComponent } from './delete-order-dialog/delete-order-dialog.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [
    OrderComponent,
    CreateOrderComponent,
    EditOrderComponent,
    DeleteOrderDialogComponent,
    OrderDetailsComponent
  ],
  imports: [
    SharedModule,
    OrderRoutingModule
  ],
})
export class OrderModule { }
