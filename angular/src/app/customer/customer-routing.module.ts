import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { authGuard, permissionGuard } from '@abp/ng.core';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

const routes: Routes = [
  { path: '', component: CustomerComponent, canActivate: [authGuard, permissionGuard] },
  { path: 'create', component: CreateCustomerComponent },
  { path: 'edit/:id', component: EditCustomerComponent },
  { path: 'details/:id', component: CustomerDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
