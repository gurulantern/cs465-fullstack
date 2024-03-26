/**
 * Name: registration.component.ts
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-26
 * Description: Handles submits for registration forms on html
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public formError: string = '';   

  public credentials = {    
    name: '',    
    email: '',    
    password: '',
  };   

  constructor(    
    private router: Router,    
    private authenticationService: AuthenticationService  
  ) { }   
  
  ngOnInit() {}   
  
  /**
   * Handles submits for admin registration form. 
   * Calls doAdminRegistration()
   */
  public onAdminRegistrationSubmit(): void {    
    this.formError = '';    
    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {       
      this.formError = 'All fields are required, please try again';    
    } else {      
      this.doAdminRegistration();    
    }
  }   
  
  /**
   * Calls authenticationService to register user as admin
   */
  private doAdminRegistration(): void {    
    this.authenticationService.register(this.credentials)      
      .then(() => this.router.navigateByUrl('#'))      
      .catch((message) => this.formError = message);  
  } 

}
