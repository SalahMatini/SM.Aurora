import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetailsDto, CustomerDto, CustomerService } from '@proxy/customers';
import { countryOptions, genderOptions } from '@proxy/shared';
import { filter, switchMap, tap } from 'rxjs';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  providers: [provideNativeDateAdapter()]
})
export class EditCustomerComponent implements OnInit {

  id: string;
  form: FormGroup;
  countries = countryOptions;
  genders = genderOptions;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.loadCustomer();
  }

  save(): void {                  //void??//

    if (this.form.invalid)
      return;

    this.customerService.update(this.id, this.form.value).subscribe(() => {
      this.router.navigate(['/customers']);
    });
  }

  //#region Private Functions

  private buildForm(customer: CustomerDetailsDto): void {     // why it's void here?? //
    this.form = this.fb.group({
      firstName: [customer.firstName, Validators.required],
      lastName: [customer.lastName, Validators.required],
      dateOfBirth: [customer.dateOfBirth, Validators.required,],
      gender: [customer.gender, Validators.required],
      email: [customer.email, Validators.required],
      phoneNumber: [customer.phoneNumber, Validators.required],
      country: [customer.country, Validators.required],
      address: [customer.address, Validators.required],
    });
    console.log('Form built successfully.');
  }

  private loadCustomer() {
    this.activatedRoute.params
      .pipe(
        filter(params => params.id),
        tap(({ id }) => (this.id = id)),
        switchMap(({ id }) => this.customerService.get(id)),
        tap(customer => this.buildForm(customer))
      ).
      subscribe();
  }

  //#endregion

}
