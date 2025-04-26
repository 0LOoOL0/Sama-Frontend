import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderAuthService } from '../../services/provider-auth.service';

@Component({
  selector: 'app-provider-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './provider-login.component.html',
  styleUrls: ['./provider-login.component.scss'],
})
export class ProviderLoginComponent {
  loginWithFacebook() {
    throw new Error('Method not implemented.');
  }
  loginWithGoogle() {
    throw new Error('Method not implemented.');
  }
  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: ProviderAuthService,
    private router: Router,
  ) {
    console.log('ProviderLoginComponent initialized');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log('Form submitted');
    if (this.loginForm.valid) {
      console.log('Form is valid');
      this.loading = true;
      this.errorMessage = '';
      const loginData = this.loginForm.value;
      console.log('Login data:', loginData);

      this.authService.getCSRFToken().subscribe({
        next: () => {
          this.authService.login(loginData).subscribe({
            next: (response: any) => {
              this.loading = false;
              console.log('Login successful', response);
              localStorage.setItem('provider_token', response.token);
              this.router.navigate(['provider-main/provider-dashboard']);
            },
            error: error => {
              this.loading = false;
              console.error('Login error', error);
              if (error.error instanceof ErrorEvent) {
                // Client-side or network error occurred
                this.errorMessage = `Error: ${error.error.message}`;
              } else {
                // Backend returned an unsuccessful response code
                this.errorMessage = `Error Code: ${error.status}\nMessage: ${
                  error.error.message || error.message
                }`;
              }
            },
          });
        },
        error: error => {
          this.loading = false;
          console.error('CSRF token error', error);
          this.errorMessage = 'An error occurred. Please try again.';
        },
      });
    } else {
      console.log('Form is invalid');
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}
