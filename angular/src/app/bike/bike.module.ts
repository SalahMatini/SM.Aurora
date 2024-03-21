import { NgModule } from '@angular/core';
import { BikeRoutingModule } from './bike-routing.module';
import { BikeComponent } from './bike.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BikeComponent],
  imports: [SharedModule, BikeRoutingModule],
})
export class BikeModule {}
