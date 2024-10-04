import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeService } from '@proxy/bikes';
import { CustomerService } from '@proxy/customers';
import { LookupDto } from '@proxy/lookups';
import { OrderDetailsDto, OrderDto, OrderService, orderStatusOptions } from '@proxy/orders';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html'
})
export class EditOrderComponent implements OnInit {

  orderId: string;
  order: OrderDetailsDto;
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
    this.setOrderId();
    this.buildForm();
    this.loadLookups();
    this.loadOrder();
  }

  save(): void {

    if (this.form.invalid)
      return;

    this.orderService.update(this.orderId, this.form.value).subscribe(() => {
      this.router.navigate(['/orders']);
    });
  }

  //#region Private Functions

  private buildForm(): void {
    this.form = this.fb.group({
      id: [0],
      customerId: ['', Validators.required],
      bikeIds: [[], Validators.required],
      orderStatus: [null, Validators.required],
      shippingAddress: ["", Validators.required],
    });
  }

  private setOrderId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
    }
  }

  private loadOrder() {
    this.orderService.get(this.orderId).subscribe({
      next: (orderDetailsFromApi: OrderDetailsDto) => {

        this.order = orderDetailsFromApi;
        this.patchOrderDetails(orderDetailsFromApi)
      }
    });
  }

  private loadLookups(): void {

    this.loadCustomerLookup();
    this.loadBikelookup();
  }

  private loadCustomerLookup(): void {

    this.customerService.getCustomerLookup().subscribe({

      next: (customerLookupFromApi: LookupDto[]) => {
        this.customerLookup = customerLookupFromApi;
      }
    })
  }

  private loadBikelookup(): void {

    this.bikeService.getBikeLookup().subscribe({
      next: (bikeLookupFromApi: LookupDto[]) => {

        this.bikeLookup = bikeLookupFromApi;
      }
    })
  }

  private patchOrderDetails(orderDetails: OrderDetailsDto): void {

    this.form.patchValue({
      id: this.order.id,
      customerId: this.order.customerId,
      bikeIds: this.order.bikes.map(({ id }) => id),
      orderStatus: this.order.orderStatus,
      shippingAddress: this.order.shippingAddress
    });

  }

  //#endregion
}
