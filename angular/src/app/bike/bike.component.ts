import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BikeService, BikeDto, } from '@proxy/bikes';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrl: './bike.component.scss',
  providers: [ListService],
})
export class BikeComponent implements OnInit {
  bike = { items: [], totalCount: 0 } as PagedResultDto<BikeDto>;


  constructor(
    public readonly list: ListService,
    private bikeService: BikeService,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadBikes();
  }



  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.bikeService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  //#region Private Functions
  private loadBikes(): void {
    const bikeStreamCreator = query => this.bikeService.getList(query);

    this.list.hookToQuery(bikeStreamCreator).subscribe(response => {
      this.bike = response;
    });
  }


  //#region
}
