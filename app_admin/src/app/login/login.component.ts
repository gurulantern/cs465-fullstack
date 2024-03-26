/**
 * Name: login.component.ts
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-26
 * Description: Handles user login
 */

import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { AuthenticationService } from '../services/authentication.service'; 

@Component({  
  selector: 'app-login',  
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css'] 
}) 

export class LoginComponent implements OnInit {   
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
   * Listens for submit event on login form
   * Calls doLogin() if all fields are filled
   */
  public onLoginSubmit(): void {    
    this.formError = '';    
    if (!this.credentials.email || !this.credentials.password) {       
      this.formError = 'All fields are required, please try again';    
    } else {      
      this.doLogin();    
    }  
  }   
  
  /**
   * Calls authenticationService to login user
   */
  private doLogin(): void {    
    this.authenticationService.login(this.credentials)      
      .then(() => this.router.navigateByUrl('#'))      
      .catch((message) => this.formError = message);  
  } 
} 
