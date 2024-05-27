import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { CreateUpdateOrderComponent } from './create-update-order/create-update-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent
  },
  {
    path: 'details',
    component: OrderDetailsComponent
  },
  {
    path: 'create',
    component: CreateUpdateOrderComponent
  },
  {
    path: 'edit/:id',
    component: CreateUpdateOrderComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
