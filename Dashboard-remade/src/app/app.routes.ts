import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-section/login/login.component';
import { SignupComponent } from './components/login-section/signup/signup.component';

import { MainComponent } from './components/main-section/main/main.component';
import { AddNewOwnerComponent } from './components/petSection/add-new-owner/add-new-owner.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login as main page
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
  
    { path: 'main', component: MainComponent},
    { path: 'add-new-owner', component:AddNewOwnerComponent},
];
