import { NgModule } from '@angular/core';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'; // add this line
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

@NgModule({
  declarations: [CustomerComponent,
    CreateCustomerComponent,
    EditCustomerComponent,
    CustomerDetailsComponent
  ],
  imports: [SharedModule, CustomerRoutingModule, NgbDatepickerModule],
})
export class CustomerModule { }
