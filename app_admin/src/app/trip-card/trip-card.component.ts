/**
 * Name: trip-card.component.ts
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-26
 * Description: Component logic controller for trip card page
 * Accepts an input of trip to pass to the html
 */

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  
  // Decorator used to specify variable as an input for html 
  @Input('trip') trip: any
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Login status checker
   * @returns true if user is logged in, false if user is not logged in
   */
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  /**
   * Navigates to edit trip form
   * @param trip Trip object to be passed to edit trip form
   */
  private editTrip(trip:Trip): void {
    // Clears tripCode item in local storage and sets new tripCode item in local storage
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']); // App route for edit trip form
  }
  
  /**
   * Make DELETE API call
   * @param trip Trip object to be passed to delete trip
   */
  private deleteTrip(trip: Trip): void {
    // Clears tripCode item in local storage and sets new tripCode item in local storage
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['delete-trip']); // App route for DELETE API call
  }
}
