import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule
  ],
})
export class MaterialModule { }
