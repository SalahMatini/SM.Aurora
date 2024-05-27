import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BikeService, BikeDto, bikeTypeOptions } from '@proxy/bikes';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrl: './bike.component.scss',
  providers: [ListService],
})
export class BikeComponent implements OnInit {
  bike = { items: [], totalCount: 0 } as PagedResultDto<BikeDto>;

  isModalOpen = false;
  form: FormGroup;

  bikeTypes = bikeTypeOptions;

  selectedBike = {} as BikeDto;

  constructor(
    public readonly list: ListService,
    private bikeService: BikeService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadBikes();
  }

  createBike() {
    this.selectedBike = {} as BikeDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editBike(id: string) {
    this.bikeService.get(id).subscribe(bike => {
      this.selectedBike = bike;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedBike.id
      ? this.bikeService.update(this.selectedBike.id, this.form.value)
      : this.bikeService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
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

  buildForm() {
    this.form = this.fb.group({
      brand: [this.selectedBike.brand || '', Validators.required],
      model: [this.selectedBike.model || '', Validators.required],
      type: [this.selectedBike.type || -1, Validators.required],
      color: [this.selectedBike.color || '', Validators.required],
      releaseYear: [this.selectedBike.releaseYear || null, Validators.required],
      price: [this.selectedBike.price || null, Validators.required],
    });
    console.log('Form built successfully.');
  }
  //#region
}
