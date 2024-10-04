import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeDetailsDto, BikeService } from '@proxy/bikes';

@Component({
  selector: 'app-bike-details',
  templateUrl: './bike-details.component.html'
})
export class BikeDetailsComponent implements OnInit {

  bikeId!: string;
  bike?: BikeDetailsDto;

  constructor(
    private bikeSvc: BikeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.setBikeId();
    this.loadBike();
  }

  //#region Private Functions

  setBikeId(): void {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.bikeId = String(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private loadBike(): void {
    this.bikeSvc.get(this.bikeId).subscribe({
      next: (bikeFromApi: BikeDetailsDto) => {
        this.bike = bikeFromApi;
      }
    });
  }
  //#endregion

}
