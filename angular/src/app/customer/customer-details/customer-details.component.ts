import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetailsDto, CustomerService } from '@proxy/customers';
import { OrderDto, OrderService } from '@proxy/orders';
import { genderOptions } from '@proxy/shared';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',

})
export class CustomerDetailsComponent implements OnInit {

  customerId!: string;
  customer?: CustomerDetailsDto;
  gender = genderOptions;
  orders: OrderDto[] = [];

  constructor(
    private customerSvc: CustomerService,
    private activatedRoute: ActivatedRoute,
    private orderSvc: OrderService
  ) { }


  ngOnInit() {
    this.setCustomerId();
    this.loadCustomer();
    this.loadOrders();
  }



  //#region Private Functions

  private setCustomerId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.customerId = String(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private loadCustomer(): void {

    this.customerSvc.get(this.customerId).subscribe({
      next: (customerDetailsFromApi: CustomerDetailsDto) => {
        this.customer = customerDetailsFromApi;
      }
    });
  }

  loadOrders(): void {
    this.orderSvc.getListByCustomer(this.customerId).subscribe({
      next: (customerOrdersFromApi: OrderDto[]) => {
        this.orders = customerOrdersFromApi;
      }
    });
  }

  //#endregion


}
