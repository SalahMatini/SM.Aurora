import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BikeService } from '@proxy/bikes';
import { CustomerService } from '@proxy/customers';
import { LookupDto } from '@proxy/lookups';
import { OrderService, orderStatusOptions } from '@proxy/orders';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html'
})
export class CreateOrderComponent implements OnInit {

  form: FormGroup;

  orderStatuses = orderStatusOptions;

  customerLookup: LookupDto[];
  bikeLookup: LookupDto[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private customerServie: CustomerService,
    private bikeService: BikeService,
  ) { }

  ngOnInit() {
    this.buildform();
    this.loadLookups();
  }


  save() {                  //void??//

    if (this.form.invalid)
      return;

    this.orderService.create(this.form.value).subscribe(() => {
      this.router.navigate(['/orders']);
    });
  }


  //#region Private Functions

  private buildform() {
    this.form = this.fb.group(
      {
        customerId: ['', Validators.required],
        bikeIds: ['', Validators.required],
        orderStatus: [null, Validators.required],
        shippingAddress: ["", Validators.required],
      }
    );
    console.log('Form built successfully.');
  }

  private loadLookups() {
    this.loadBikeLookup();
    this.loadCustomerLookup();
  }

  private loadCustomerLookup() {
    this.customerServie.getCustomerLookup().subscribe({
      next: (customerLookupFromApi: LookupDto[]) => {
        this.customerLookup = customerLookupFromApi;
      }
    })
  }

  private loadBikeLookup() {
    this.bikeService.getBikeLookup().subscribe({
      next: (bikeLookupFromApi: LookupDto[]) => {
        this.bikeLookup = bikeLookupFromApi;
      }
    })
  }

  //#endregion

}


