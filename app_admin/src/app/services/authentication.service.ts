/**
 * Name: authentication.service.ts
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-26
 * Description: Service file for handling authorization calls
 * Passes info to trip-data.service.ts
 * Handles token storage for loggedIn checkers
 */

import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  /**
   * Grabs token from storage for verification
   * @returns Token from storage
   */
  public getToken(): string {
    return this.storage.getItem('travlr-token');
  }

  /**
   * Saves token to storage
   * @param token Token to be stored in storage
   */
  public saveToken(token: string): void {    
    this.storage.setItem('travlr-token', token);  
  }   
  
  /**
   * Logs in a user through trip-data.service.ts and saves token when successful
   * @param user User object to be logged in
   * @returns response as AuthResponse
   */
  public login(user: User): Promise<any> {    
    return this.tripDataService.login(user)      
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));  
  }   
  
  /**
   * Registers a user through trip-data.service.ts
   * @param user User object to be registered
   * @returns response as AuthResponse
   */
  public register(user: User): Promise<any> {    
    return this.tripDataService.register(user)      
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));  
  }   
  
  /**
   * Logouts user by removing token
   */
  public logout(): void {    
    this.storage.removeItem('travlr-token');  
  }   
  
  /**
   * Checks user login status and if token is expired
   * @returns boolean if user is logged in
   */
  public isLoggedIn(): boolean {    
    const token: string = this.getToken();    
    if (token) {      
      const payload = JSON.parse(atob(token.split('.')[1]));      
      return payload.exp > (Date.now() / 1000);    
    } else {      
      return false;    
    }  
  }   
  
  /**
   * Checks if user is logged in and if true returns the email and name of use
   * @returns User object of current user consisting of email and name
   */
  public getCurrentUser(): User {    
    if (this.isLoggedIn()) {      
      const token: string = this.getToken();      
      const { email, name } = JSON.parse(atob(token.split('.')[1]));      
      return { email, name } as User;    
    }  
  }  
}
