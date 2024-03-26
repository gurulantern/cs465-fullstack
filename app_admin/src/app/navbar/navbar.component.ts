/**
 * Name: navbar.component.ts
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-26
 * Description: Navbar component for SPA
 */

import { Component, OnInit } from '@angular/core'; 
import { AuthenticationService } from '../services/authentication.service';  
import { Router } from '@angular/router';

@Component({  
  selector: 'app-navbar',  
  templateUrl: './navbar.component.html',  
  styleUrls: ['./navbar.component.css'] 
}) 

export class NavbarComponent implements OnInit {   
  constructor(    
    private authenticationService: AuthenticationService,
    private router: Router  
  ) { }  
  ngOnInit() { }  
  
  /**
   * Login checker for conditional rendering
   * @returns True if logged in and false if not
   */
  public isLoggedIn(): boolean {    
    return this.authenticationService.isLoggedIn();  
  }  
  
  /**
   * Listens to logout event in html
   */
  private onLogout(): void {    
    return this.authenticationService.logout(); 
    this.router.navigateByUrl('#');
    return; 
  } 
} 
