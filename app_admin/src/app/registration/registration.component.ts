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
  
  public onAdminRegistrationSubmit(): void {    
    this.formError = '';    
    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {       
      this.formError = 'All fields are required, please try again';    
    } else {      
      this.doAdminRegistration();    
    }
  }   
  
  private doAdminRegistration(): void {    
    this.authenticationService.register(this.credentials)      
      .then(() => this.router.navigateByUrl('#'))      
      .catch((message) => this.formError = message);  
  } 

}
