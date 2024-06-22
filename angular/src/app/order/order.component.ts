import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BikeService } from '@proxy/bikes';
import { CustomerDto, CustomerService } from '@proxy/customers';
import { LookupDto } from '@proxy/lookups';
import { OrderService, OrderDto, orderStatusOptions } from '@proxy/orders';
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



  //#endregion
}
