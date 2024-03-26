/**
 * Name: trip-data.service.ts
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-26
 * Description: Service file for handling API calls for trips and auth
 * All components on SPA will use this for handling trips in DB
 * See API methods in app_api/controllers/trips
 */

import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  // Construct class with HTTP client, storage for cookies
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
    ) { }
  
  // API URL for trips
  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;
  
  /**
   * Checks authorization and adds trip to database
   * @param formData Trip object to be added to database
   * @returns Response as Trip[]
   */
  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip'); // Log for debugging purposes

    // Set authorization headers with travlr-token, stored from login
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('travlr-token')}` })
      };
    return this.http
      .post(this.tripUrl, formData, httpOptions) // post with the above url, formData from arguments, and above httpOptions
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  /**
   * Checks authorization and makes api call to grab a trip
   * @param tripCode Trip code of trip to be retrieved
   * @returns Response as Trip
   */
  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)'); 
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('travlr-token')}` })
      };   
    return this.http      
      .get(this.tripUrl + tripCode, httpOptions) // get the trip according to trip code, and above httpOptions
      .toPromise()      
      .then(response => response as Trip)      
      .catch(this.handleError); 
  }
  
  /**
   * Checks authorization and makes api call to grab a trip
   * @returns Response as Trip[]
   */
  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('travlr-token')}` })
      };
    return this.http
      .get(this.tripUrl, httpOptions) // Doesn't require arguments as it will get all trips
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }


  /**
   * Updates a trip using trip code and data from update form
   * @param formData Trip data to update
   * @returns Response as Trip[]
   */
  public updateTrip(formData: Trip): Promise<Trip> {    
    console.log('Inside TripDataService#upateTrip');    
    console.log(formData);    
    console.log(formData.code);
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('travlr-token')}` })
      };
    return this.http      
      .put(this.tripUrl + formData.code, formData, httpOptions)      
      .toPromise()      
      .then(response => response as Trip[])      
      .catch(this.handleError);  
  } 

  /**
   * Checks authorization and deletes a trip 
   * @param tripCode Trip code to find trip to delete
   * @returns Response code
   */
  public deleteTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#deleteTrip(tripCode)');
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('travlr-token')}` })
      };
    return this.http
      .delete(this.tripUrl + tripCode, httpOptions)    // This was key to connection to database
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  /**
   * Logs error to console and sends error message
   * @param error Error object
   * @returns Error message
   */
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  /**
   * Admin login function. Will not validate client user. 
   * See app_api/config/passport.js for passport strategy
   * @param user User object to be checked for validation
   * @returns Response from makeAuthApiCall
   */
  public login(user: User): Promise<AuthResponse> {   
    return this.makeAuthApiCall('adminlogin', user);  
  }   
  
  /**
   * Admin register function. Only registers admin users.
   * @param user User object to be checked for validation
   * @returns Response from makeAuthApiCall
   */
  public register(user: User): Promise<AuthResponse> {    
    return this.makeAuthApiCall('adminregister', user);  
  }   
  
  /**
   * Makes an API call for authorizing a user for login and register
   * @param urlPath API route
   * @param user user data for login or register
   * @returns response from API call
   */
  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {    
    const url: string = `${this.apiBaseUrl}/${urlPath}`;    
    return this.http      
      .post(url, user)      
      .toPromise()      
      .then(response => response as AuthResponse)      
      .catch(this.handleError);  
  } 
}



