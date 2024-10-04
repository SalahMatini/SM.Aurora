import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeTypeComponent } from './bike-type.component';
import { CreateUpdateBikeTypeComponent } from './create-update-bike-type/create-update-bike-type.component';

const routes: Routes = [
  {
    path: '',
    component: BikeTypeComponent
  },
  {
    path: 'create',
    component: CreateUpdateBikeTypeComponent
  },
  {
    path: 'edit/:id',
    component: CreateUpdateBikeTypeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BikeTypeRoutingModule { }
