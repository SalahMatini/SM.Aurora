import { NgModule } from '@angular/core';

import { BikeTypeRoutingModule } from './bike-type-routing.module';
import { BikeTypeComponent } from './bike-type.component';
import { SharedModule } from '../shared/shared.module';
import { CreateUpdateBikeTypeComponent } from './create-update-bike-type/create-update-bike-type.component';
import { BikeTypeDetailsComponent } from './bike-type-details/bike-type-details.component';


@NgModule({
  declarations: [
    BikeTypeComponent,
    CreateUpdateBikeTypeComponent,
    BikeTypeDetailsComponent
  ],
  imports: [
    SharedModule,
    BikeTypeRoutingModule
  ]
})
export class BikeTypeModule { }
