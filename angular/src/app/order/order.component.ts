import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService, OrderDto, orderStatusOptions } from '@proxy/orders';

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

  selectedOrder = {} as OrderDto;

  constructor(
    public readonly list: ListService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  createOrder() {
    this.selectedOrder = {} as OrderDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editOrder(id: string) {
    this.orderService.get(id).subscribe(order => {
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
      ? this.orderService.update(this.selectedOrder.id, this.form.value)
      : this.orderService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.orderService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  //#region Private Functions
  loadOrders(): void {
    const orderStreamCreator = query => this.orderService.getList(query);

    this.list.hookToQuery(orderStreamCreator).subscribe(response => {
      this.order = response;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      orderStatus: [this.selectedOrder.orderStatus || null, Validators.required],
      shippingAddress: [this.selectedOrder.shippingAddress || '', Validators.required],
    });
    console.log('Form built successfully.');
  }
  //#endregion
}
