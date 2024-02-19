import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
//import { trips } from '../data/trips';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service'; 


@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {

  trips: Trip[];
  
  message: string;

  constructor(
    private tripDataservice: TripDataService,
    private authService: AuthenticationService,
    private router: Router
    ) {}
  
  private addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getTrips(): void {
    console.log('Inside TripListingCOmponent#getTrips')
    this.message = 'Searching for Trips';
    this.tripDataservice
      .getTrips()
        .then(foundTrips => {
          this.message = foundTrips.length > 0 ? '' : 'No trips found';
          this.trips = foundTrips;
        })
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.getTrips();
  }
}
