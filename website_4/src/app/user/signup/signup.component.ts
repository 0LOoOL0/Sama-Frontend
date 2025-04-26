import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  @Output() segmentChange = new EventEmitter<string>();
  signupForm: FormGroup;
  showPassword: boolean = false;
  signupError: string | null = null;
  nationalities: string[] = [
    'American',
    'British',
    'Canadian',
    'Australian',
    'Other',
  ]; // Replace with actual list

  constructor(private fb: FormBuilder, private authService: UserAuthService, private router: Router) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(form: FormGroup): null | { mismatch: true } {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  signupWithGoogle(): void {
    console.log('Sign up with Google');
    // Add logic to handle Google signup
  }

  signupWithFacebook(): void {
    console.log('Sign up with Facebook');
    // Add logic to handle Facebook signup
  }

  async onSubmit(): Promise<void> {
    if (this.signupForm.valid) {
      try {
        await this.authService.getCSRFToken();
      const { email, password } = this.signupForm.value;
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      await this.authService.sendVerificationCode(email);
      this.router.navigate(['/user-main-component/otp', { value: 'register' }]);
      }catch(error: any){
        console.error(error.response.data);
      }
    } else {
      this.signupError = 'Please fill out the form correctly.';
    }
  }

  onSwitchToLogin(): void {
    this.segmentChange.emit('login');
  }

  onProfileImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.signupForm.patchValue({
        profileImage: file,
      });
    }
  }
}
