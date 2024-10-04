import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { BikeTypeDto, BikeTypeService } from '@proxy/bike-types';

@Component({
  selector: 'app-bike-type',
  templateUrl: './bike-type.component.html',
  styleUrl: './bike-type.component.scss',
  providers: [ListService],
})
export class BikeTypeComponent implements OnInit {
  bikeType = { items: [], totalCount: 0 } as PagedResultDto<BikeTypeDto>;

  constructor(
    public readonly list: ListService,
    private bikeTypeSvc: BikeTypeService,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadBikeTypes();
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.bikeTypeSvc.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  //#region Private Functions
  loadBikeTypes(): void {
    const bikeTypeStreamCreator = query => this.bikeTypeSvc.getList(query);

    this.list.hookToQuery(bikeTypeStreamCreator).subscribe(response => {
      this.bikeType = response;
    });
  }

  //#endregion

}
