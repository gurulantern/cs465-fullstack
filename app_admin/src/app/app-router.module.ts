/**
 * Name: app-router.module.ts
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-26
 * Description: Declares and exports AppModule for usage in main.ts  
 * Updates: Added RegistrationComponent for Admin registration
 */

// Import utility modules and app componentst
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { DeleteTripComponent } from './delete-trip/delete-trip.component';
import { RegistrationComponent } from './registration/registration.component'; // Added for admin registration
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

// Declare route names for specified components
const routes: Routes = [
    { path: 'add-trip', component: AddTripComponent },
    { path: 'edit-trip', component: EditTripComponent },
    { path: 'delete-trip', component: DeleteTripComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'list-trips', component: TripListingComponent},
    { path: '', component: HomeComponent, pathMatch: 'full' }
]

// Export AppRoutingModule for usage in app.module.ts
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}