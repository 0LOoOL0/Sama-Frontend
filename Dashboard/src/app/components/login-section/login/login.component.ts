import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: []
})
export class LoginComponent {

  constructor(private router: Router) { }

  // Method to navigate to the signup page

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToMain() {
    this.router.navigate(['../main']);
  }
}
