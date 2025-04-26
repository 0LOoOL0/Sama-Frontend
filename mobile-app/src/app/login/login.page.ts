import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  showPassword = false;
  errorMessage: string = ''; // Property to store error messages

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials)
      .then(response => {
        console.log('Logged in successfully:', response);
        // Navigate to the main page or dashboard
        this.router.navigate(['/mains']);
      })
      .catch(error => {
        console.error('Login failed:', error.response?.data || error.message);
        // Set the error message
        this.errorMessage = 'Invalid email or password. Please try again.';
      });
  }

  ngOnInit() { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
