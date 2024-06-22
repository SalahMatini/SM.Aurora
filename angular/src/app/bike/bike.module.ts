import { NgModule } from '@angular/core';
import { BikeRoutingModule } from './bike-routing.module';
import { BikeComponent } from './bike.component';
import { SharedModule } from '../shared/shared.module';
import { CreateBikeComponent } from './create-bike/create-bike.component';
import { EditBikeComponent } from './edit-bike/edit-bike.component';

@NgModule({
  declarations: [BikeComponent,
    CreateBikeComponent,
    EditBikeComponent
  ],
  imports: [SharedModule, BikeRoutingModule],
})
export class BikeModule { }
