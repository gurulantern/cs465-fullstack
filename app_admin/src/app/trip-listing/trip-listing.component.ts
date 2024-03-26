/**
 * Name: trip-listing.component.ts
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-26
 * Description: Component logic controller for trip listing page
 * Gets all trips and stores them in trips array for usage in trip-listing.component.html
 */

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

  trips: Trip[]; // Array for trip html
  
  message: string;

  // Utilizes service components
  constructor(
    private tripDataservice: TripDataService,
    private authService: AuthenticationService,
    private router: Router
    ) {}
  
  /**
   * Navigates to add trip form
   */
  private addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  /**
   * Gets all trips from database and stores in trips array for usage in trip-listing.component.html
   */
  private getTrips(): void {
    console.log('Inside TripListingCOmponent#getTrips')
    this.message = 'Searching for Trips';
    // Data service grabs trips from the database collection for trips and adds to array
    this.tripDataservice
      .getTrips()
        .then(foundTrips => {
          this.message = foundTrips.length > 0 ? '' : 'No trips found';
          this.trips = foundTrips;
        })
  }

  /**
   * For conditional rendering. Checks if user is logged in
   * @returns true if user is logged in, false if user is not logged in
   */
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /**
   * Initializes component and calls getTrips
   */
  ngOnInit() {
    this.getTrips();
  }
}
