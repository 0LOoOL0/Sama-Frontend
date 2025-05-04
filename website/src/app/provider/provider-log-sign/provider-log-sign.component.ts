import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from "ionicons";
import { ReactiveFormsModule } from '@angular/forms';
import { ProviderLoginComponent } from '../provider-login/provider-login.component';
import { ProviderSignupComponent } from '../provider-signup/provider-signup.component';

@Component({
  selector: 'app-provider-log-sign',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ProviderLoginComponent, ProviderSignupComponent],
  templateUrl: './provider-log-sign.component.html',
  styleUrl: './provider-log-sign.component.scss'
})
export class ProviderLogSignComponent {
  
   // Property to track the current segment (either 'login' or 'signup')
   segment: string = 'login'; // Default to 'login'

   // Method to switch between 'login' and 'signup'
  changeSegment(segment: string) {
    this.segment = segment;
  }
}
