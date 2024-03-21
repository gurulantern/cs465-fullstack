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

  // Used for checking log in status
  public getToken(): string {
    return this.storage.getItem('travlr-token');
  }

  // Saves token for session
  public saveToken(token: string): void {    
    this.storage.setItem('travlr-token', token);  
  }   
  
  public login(user: User): Promise<any> {    
    return this.tripDataService.login(user)      
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));  
  }   
  
  public register(user: User): Promise<any> {    
    return this.tripDataService.register(user)      
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));  
  }   
  
  // Removes token
  public logout(): void {    
    this.storage.removeItem('travlr-token');  
  }   
  
  // Checks if user is logged in
  public isLoggedIn(): boolean {    
    const token: string = this.getToken();    
    if (token) {      
      const payload = JSON.parse(atob(token.split('.')[1]));      
      return payload.exp > (Date.now() / 1000);    
    } else {      
      return false;    
    }  
  }   
  
  // Returns current user info
  public getCurrentUser(): User {    
    if (this.isLoggedIn()) {      
      const token: string = this.getToken();      
      const { email, name } = JSON.parse(atob(token.split('.')[1]));      
      return { email, name } as User;    
    }  
  }  
}
