import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeService } from '@proxy/bikes';
import { CustomerService } from '@proxy/customers';
import { LookupDto } from '@proxy/lookups';
import { OrderDto, OrderService, orderStatusOptions } from '@proxy/orders';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html'
})
export class EditOrderComponent implements OnInit {

  id: string;
  form: FormGroup;
  orderStatuses = orderStatusOptions;


  customerLookup: LookupDto[];
  bikeLookup: LookupDto[] = [];

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private bikeService: BikeService,
  ) { }

  ngOnInit(): void {
    this.loadOrder();
    this.loadLookups();
  }


  save(): void {                  //void??//

    if (this.form.invalid)
      return;

    this.customerService.update(this.id, this.form.value).subscribe(() => {
      this.router.navigate(['/orders']);
    });
  }

  //#region Private Functions

  private buildForm(order: OrderDto) {
    this.form = this.fb.group({
      customerId: [, Validators.required],
      orderStatus: [order.orderStatus, Validators.required],
      shippingAddress: [order.shippingAddress, Validators.required],
    });
    console.log('Form built successfully.');
  }

  loadOrder() {
    this.activatedRoute.params
      .pipe(
        filter(params => params.id),
        tap(({ id }) => (this.id = id)),
        switchMap(({ id }) => this.orderService.get(id)),
        tap(order => this.buildForm(order))
      ).
      subscribe();
  }

  private loadLookups(): void {
    this.loadCustomerLookup();
    this.loadBikelookup();
  }

  private loadCustomerLookup() {
    this.customerService.getCustomerLookup().subscribe({
      next: (customerLookupFromApi: LookupDto[]) => {
        this.customerLookup = customerLookupFromApi;
      }
    })
  }

  private loadBikelookup() {
    this.bikeService.getBikeLookup().subscribe({
      next: (bikeLookupFromApi: LookupDto[]) => {
        this.bikeLookup = bikeLookupFromApi;
      }
    })
  }

  //#endregion
}
