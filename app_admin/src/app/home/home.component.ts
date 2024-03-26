/**
 * Name: home.component.ts
 * Version: 1.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-26
 * Description: Handles homepage and prints Welcome message for current user
 */

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'; 
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( 
    private authService: AuthenticationService,
  ) {}


  ngOnInit() {
  }

  /**
   * For conditional rendering when user is logged in
   * @returns True if logged in and false if not
   */
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /**
   * Uses authService to get cuttent user info
   * @returns User name
   */
  public userName(): string {
    return this.authService.getCurrentUser().name
  }
}
