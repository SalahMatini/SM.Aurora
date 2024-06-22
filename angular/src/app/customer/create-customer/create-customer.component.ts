import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '@proxy/customers';
import { countryOptions, genderOptions } from '@proxy/shared';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  providers: [provideNativeDateAdapter()]
})
export class CreateCustomerComponent implements OnInit {

  form: FormGroup;
  genders = genderOptions;
  countries = countryOptions;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  save() {
    if (this.form.invalid)
      return;


    this.customerService.create(this.form.value).subscribe(() => {
      this.router.navigate(['/customers']);
    });
  }


  //#region Private Functions

  private buildForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [null, Validators.required,],
      gender: [null, Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      country: [null, Validators.required],
      address: ['', Validators.required],
    });

  };

  //#endregion

}
