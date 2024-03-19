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

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
    ) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('travlr-token')}` })
      };
    return this.http
      .post(this.tripUrl, formData, httpOptions)
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)'); 
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('travlr-token')}` })
      };   
    return this.http      
      .get(this.tripUrl + tripCode, httpOptions)      
      .toPromise()      
      .then(response => response as Trip)      
      .catch(this.handleError); 
  }
  
  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('travlr-token')}` })
      };
    return this.http
      .get(this.tripUrl, httpOptions)
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

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


  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {   
    return this.makeAuthApiCall('adminlogin', user);  
  }   
  
  public register(user: User): Promise<AuthResponse> {    
    return this.makeAuthApiCall('adminregister', user);  
  }   
  
  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {    
    const url: string = `${this.apiBaseUrl}/${urlPath}`;    
    return this.http      
      .post(url, user)      
      .toPromise()      
      .then(response => response as AuthResponse)      
      .catch(this.handleError);  
  } 
}



