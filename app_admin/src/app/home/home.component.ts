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

  // For conditional rendering 
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Grabs user's name for display in navbar
  public userName(): string {
    return this.authService.getCurrentUser().name
  }
}
