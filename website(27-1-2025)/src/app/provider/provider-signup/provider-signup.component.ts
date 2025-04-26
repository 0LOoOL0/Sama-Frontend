import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderAuthService } from '../../services/provider-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './provider-signup.component.html',
  styleUrls: ['./provider-signup.component.scss']
})
export class ProviderSignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private providerAuthService: ProviderAuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/)
      ]],
      confirmpassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() { }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmpassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null : { 'mismatch': true };
  }

  async onSubmit() {
    console.log('btn clicked');

      if (this.signupForm.invalid) {
        console.log('Invalid form');
        return;
      }
      try {
        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';
  
        const providerDetails = {
          email: this.signupForm.get('email')?.value,
          password: this.signupForm.get('password')?.value
        };
        this.providerAuthService.getCSRFToken();
        const { email, password } = this.signupForm.value;
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        await this.providerAuthService.sendVerificationCode(email);
        this.router.navigate(['/provider-main/provider-otp']);
      } catch (error: any) {
        console.error(error.response.data);
      }
  }

  signupWithGoogle() {
    // Implement Google signup logic
    console.log('Sign up with Google');
  }

  signupWithFacebook() {
    // Implement Facebook signup logic
    console.log('Sign up with Facebook');
  }
}