import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() segmentChange = new EventEmitter<string>();
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userAuthService: UserAuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      console.log('Login form submitted');
      try {
        const credentials = this.loginForm.value;
        console.log('Attempting login with credentials:', credentials);

        const response = await this.userAuthService.login(credentials);
        console.log('Login successful:', response);

        // Redirect to a different page after successful login
        this.router.navigate(['user-main-component', 'new-user-profile', 'new-my-profile']);

      } catch (error) {
        console.error('Login failed:', error);
        alert(
          'Login failed: ' +
            ((error as any).response?.data?.message || 'Unknown error'),
        );
      }
    }
  }

  onSwitchToSignup(): void {
    this.segmentChange.emit('signup');
  }

  onForgotPassword(): void {
    // Handle forgot password logic
  }

  loginWithGoogle(): void {
    console.log('Log in with Google');
    // Implement Google login logic
  }

  loginWithFacebook(): void {
    console.log('Log in with Facebook');
    // Implement Facebook login logic
  }
}
