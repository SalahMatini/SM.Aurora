import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeTypeDto, BikeTypeService } from '@proxy/bike-types';
import { PageMode } from 'src/app/enums/pageMode.enum';

@Component({
  selector: 'app-create-update-bike-type',
  templateUrl: './create-update-bike-type.component.html',
  styleUrl: './create-update-bike-type.component.scss'
})
export class CreateUpdateBikeTypeComponent implements OnInit {

  bikeTypeId!: string;
  bikeType?: BikeTypeDto;
  form!: FormGroup;

  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bikeTypeSvc: BikeTypeService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.setBikeTypedId();

    this.buildFrom();

    if (this.pageMode === PageMode.Update) {

      this.loadBikeType();
    }

  }

  save() {
    if (this.form.valid) {
      if (this.pageMode == PageMode.Create) {
        this.bikeTypeSvc.create(this.form.value).subscribe(() => {
          this.router.navigate(['/bike-types']);
        });
      }
      else {
        this.bikeTypeSvc.update(this.bikeTypeId, this.form.value).subscribe(() => {
          this.router.navigate(['/bike-types']);
        });
      }
    }
    else {
      return;
    }
  }


  //#region Private Functions 

  private setBikeTypedId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.bikeTypeId = this.activatedRoute.snapshot.paramMap.get('id');
      this.pageMode = PageMode.Update;
    }
  }

  private loadBikeType(): void {

    this.bikeTypeSvc.get(this.bikeTypeId).subscribe({
      next: (bikeTypeFromApi: BikeTypeDto) => {

        this.bikeType = bikeTypeFromApi;
        this.form.patchValue({
          name: this.bikeType.name
        })
      }
    });
  }

  private buildFrom(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    })
  }

  //#endregion

}
