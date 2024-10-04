import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BikeTypeService } from '@proxy/bike-types';
import { BikeService } from '@proxy/bikes';
import { LookupDto } from '@proxy/lookups';

@Component({
  selector: 'app-create-bike',
  templateUrl: './create-bike.component.html'
})
export class CreateBikeComponent implements OnInit {


  form: FormGroup;
  bikeTypeLookup: LookupDto[];

  constructor(
    private fb: FormBuilder,
    private bikeService: BikeService,
    private router: Router,
    private bikeTypeSvc: BikeTypeService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loadBikeTypeLookup();
  }


  save() {
    if (this.form.invalid)
      return;


    this.bikeService.create(this.form.value).subscribe(() => {
      this.router.navigate(['/bikes']);
    });
  }


  //#region Private Functions

  private buildForm() {
    this.form = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      bikeTypeId: ['', Validators.required],
      color: ['', Validators.required],
      releaseYear: [null, Validators.required],
      price: [null, Validators.required],
    });
    console.log('Form built successfully.');
  }

  private loadBikeTypeLookup() {
    this.bikeTypeSvc.getBikeTypeLookup().subscribe({
      next: (bikeTypeLookupFromApi: LookupDto[]) => {
        this.bikeTypeLookup = bikeTypeLookupFromApi;
      }
    })
  }

  //#region

}
