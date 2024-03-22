import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService, CustomerDto, CustomerDetailsDto } from '@proxy/customers';
import { countryOptions, genderOptions } from '@proxy/shared';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class CustomerComponent implements OnInit {
  customer = { items: [], totalCount: 0 } as PagedResultDto<CustomerDto>;

  isModalOpen = false;
  form: FormGroup;

  genders = genderOptions;
  countries = countryOptions;

  selectedCustomer = {} as CustomerDetailsDto;

  constructor(
    public readonly list: ListService,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  createCustomer() {
    this.selectedCustomer = {} as CustomerDetailsDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editCustomer(id: string) {
    this.customerService.get(id).subscribe(customer => {
      this.selectedCustomer = customer;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedCustomer.id
      ? this.customerService.update(this.selectedCustomer.id, this.form.value)
      : this.customerService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.customerService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  //#region Private Functions

  private loadCustomers(): void {
    const customerStreamCreator = query => this.customerService.getList(query);

    this.list.hookToQuery(customerStreamCreator).subscribe(response => {
      this.customer = response;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      firstName: [this.selectedCustomer.firstName || '', Validators.required],
      lastName: [this.selectedCustomer.lastName || '', Validators.required],
      dateOfBirth: [
        this.selectedCustomer.dateOfBirth ? new Date(this.selectedCustomer.dateOfBirth) : null,
        Validators.required,
      ],
      gender: [this.selectedCustomer.gender || null, Validators.required],
      email: [this.selectedCustomer.email || '', Validators.required],
      phoneNumber: [this.selectedCustomer.phoneNumber || '', Validators.required],
      country: [this.selectedCustomer.country || null, Validators.required],
      address: [this.selectedCustomer.address || '', Validators.required],
    });
  }
  //#endregion
}
