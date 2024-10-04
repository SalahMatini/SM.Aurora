import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeComponent } from './bike.component';
import { authGuard, permissionGuard } from '@abp/ng.core';
import { CreateBikeComponent } from './create-bike/create-bike.component';
import { EditBikeComponent } from './edit-bike/edit-bike.component';
import { BikeDetailsComponent } from './bike-details/bike-details.component';

const routes: Routes = [
  { path: '', component: BikeComponent, canActivate: [authGuard, permissionGuard] },
  { path: 'create', component: CreateBikeComponent },
  { path: 'edit/:id', component: EditBikeComponent },
  { path: 'details/:id', component: BikeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BikeRoutingModule { }
