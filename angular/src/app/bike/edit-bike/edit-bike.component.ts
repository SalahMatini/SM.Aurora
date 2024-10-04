import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeTypeService } from '@proxy/bike-types';
import { BikeDto, BikeService } from '@proxy/bikes';
import { LookupDto } from '@proxy/lookups';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-bike',
  templateUrl: './edit-bike.component.html'
})
export class EditBikeComponent implements OnInit {

  id: string;
  form: FormGroup;
  bikeTypeLookup: LookupDto[];

  constructor(
    private bikeService: BikeService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private bikeTypeSvc: BikeTypeService,
  ) { }

  ngOnInit() {
    this.loadBike();
    this.loadBikeTypeLookup();
  }


  save(): void {                  //void??//

    if (this.form.invalid)
      return;

    this.bikeService.update(this.id, this.form.value).subscribe(() => {
      this.router.navigate(['/bikes']);
    });
  }

  //#region Private Functions

  private buildForm(bike: BikeDto): void {     // why it's void here?? //
    this.form = this.fb.group({
      brand: [bike.brand, Validators.required],
      model: [bike.model, Validators.required],
      bikeTypeId: [bike.bikeTypeId, Validators.required],
      color: [bike.color, Validators.required],
      releaseYear: [bike.releaseYear, Validators.required],
      price: [bike.price, Validators.required],
    });
    console.log('Form built successfully.');
  }

  private loadBike() {
    this.activatedRoute.params
      .pipe(
        filter(params => params.id),
        tap(({ id }) => (this.id = id)),
        switchMap(({ id }) => this.bikeService.get(id)),
        tap(bike => this.buildForm(bike))
      ).
      subscribe();
  }

  private loadBikeTypeLookup() {
    this.bikeTypeSvc.getBikeTypeLookup().subscribe({
      next: (bikeTypeLookupFromApi: LookupDto[]) => {
        this.bikeTypeLookup = bikeTypeLookupFromApi;
      }
    })
  }

  //#region

}
