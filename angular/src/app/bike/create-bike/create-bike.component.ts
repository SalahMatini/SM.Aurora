import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BikeService, bikeTypeOptions } from '@proxy/bikes';

@Component({
  selector: 'app-create-bike',
  templateUrl: './create-bike.component.html'
})
export class CreateBikeComponent implements OnInit {


  form: FormGroup;
  bikeTypes = bikeTypeOptions;



  constructor(
    private fb: FormBuilder,
    private bikeService: BikeService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buildForm();
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
      type: [null, Validators.required],
      color: ['', Validators.required],
      releaseYear: [null, Validators.required],
      price: [null, Validators.required],
    });
    console.log('Form built successfully.');
  }

  //#region

}
