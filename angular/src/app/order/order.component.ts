import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BikeService } from '@proxy/bikes';
import { CustomerDto, CustomerService } from '@proxy/customers';
import { LookupDto } from '@proxy/lookups';
import { OrderService, OrderDto, orderStatusOptions, CustomerLookupDto } from '@proxy/orders';
import { Observable, map } from 'rxjs';
import { DeleteOrderDialogComponent } from './delete-order-dialog/delete-order-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  providers: [ListService],
})
export class OrderComponent implements OnInit {
  order = { items: [], totalCount: 0 } as PagedResultDto<OrderDto>;

  isModalOpen = false;
  form: FormGroup;

  orderStatuses = orderStatusOptions;

  customers$: Observable<CustomerLookupDto[]>;

  selectedOrder = {} as OrderDto;

  bikeLookup: LookupDto[] = [];

  constructor(
    public readonly list: ListService,
    private customerSvc: CustomerService,
    private orderSvc: OrderService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private bikeSvc: BikeService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadOrders();
    this.loadCustomers();

    this.loadLookups();
  }

  createOrder() {
    this.selectedOrder = {} as OrderDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editOrder(id: string) {
    this.orderSvc.get(id).subscribe(order => {
      this.selectedOrder = order;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedOrder.id
      ? this.orderSvc.update(this.selectedOrder.id, this.form.value)
      : this.orderSvc.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.orderSvc.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  deleteOrder(order: OrderDto): void {

    const dialogRef = this.dialog.open(DeleteOrderDialogComponent, {
      data: order
    });


    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.orderSvc.delete(order.id).subscribe(() => this.list.get());
      }
    });
  }

  //#region Private Functions

  private loadOrders(): void {
    const orderStreamCreator = query => this.orderSvc.getList(query);

    this.list.hookToQuery(orderStreamCreator).subscribe(response => {
      this.order = response;
    });
  }

  private loadCustomers() {
    this.customers$ = this.customerSvc.getList({ maxResultCount: 100 }).pipe(
      map(result => result.items) // Extract the list of customers from the response
    );
  }

  private buildForm() {
    this.form = this.fb.group({
      customerId: [this.selectedOrder.customerId || null, Validators.required],
      orderStatus: [this.selectedOrder.orderStatus || null, Validators.required],
      shippingAddress: [this.selectedOrder.shippingAddress || '', Validators.required],
    });
    console.log('Form built successfully.');
  }

  private loadLookups(): void {

    this.bikeSvc.getBikeLookup().subscribe({
      next: (bikeLookupFromApi: LookupDto[]) => {

        this.bikeLookup = bikeLookupFromApi;
      }
    });
  }

  //#endregion
}
