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
  
  // For conditional rendering
  public isLoggedIn(): boolean {    
    return this.authenticationService.isLoggedIn();  
  }  
  
  // Listens to the logout event from html in SPA
  private onLogout(): void {    
    return this.authenticationService.logout(); 
    this.router.navigateByUrl('#');
    return; 
  } 
} 
