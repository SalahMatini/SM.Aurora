import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BikeDto, BikeService } from '@proxy/bikes';
import { OrderDetailsDto, OrderService } from '@proxy/orders';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {

  orderId!: string;
  order: OrderDetailsDto;
  bikes: BikeDto[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderSvc: OrderService,
    private bikeSvc: BikeService
  ) { }

  ngOnInit(): void {

    this.setOrderId();
    this.loadOrder();
    //this.loadBikes();
  }


  //#region Private Function 

  private setOrderId() {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.orderId = this.activatedRoute.snapshot.paramMap.get('id')
    }
  }

  private loadOrder() {

    this.orderSvc.get(this.orderId).subscribe({
      next: (orderFromApi: OrderDetailsDto) => {

        this.order = orderFromApi;
      }
    });
  }

  loadBikes(): void {
    this.bikeSvc.getListByOrder(this.orderId).subscribe({
      next: (bikesOrdersFromApi: BikeDto[]) => {
        this.bikes = bikesOrdersFromApi;
      }
    });
  }




  //#endregion
}

