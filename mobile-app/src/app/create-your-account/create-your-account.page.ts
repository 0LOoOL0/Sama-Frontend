import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-your-account',
  templateUrl: './create-your-account.page.html',
  styleUrls: ['./create-your-account.page.scss'],
})
export class CreateYourAccountPage implements OnInit {
  registerForm: FormGroup | any;
  emailChecking: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.registerForm.get('email').valueChanges.subscribe(async (value: string) => {
      if (this.registerForm.get('email').valid) {
        this.emailChecking = true;
        await this.checkEmail(value);
        this.emailChecking = false;
      }
    });
  }

  async checkEmail(email: string) {
    try {
      const response = await this.authService.checkEmail(email);
      if (response.data.exists) {
        await this.showAlert('Email Already Registered', 'The email address is already registered. Please use a different email or login.');
        this.registerForm.get('email').setErrors({ emailExists: true });
      }
    } catch (error: any) {
      console.error(error.response.data);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async register() {
    // Wait for the email check to complete if it is in progress
    while (this.emailChecking) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    if (this.registerForm.invalid) {
      return;
    }

    try {
      await this.authService.getCSRFToken();
      const { email, password } = this.registerForm.value;
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      await this.authService.sendVerificationCode(email);
      this.router.navigate(['/verify-email', 'register']);
    } catch (error: any) {
      console.error(error.response.data);
    }
  }
}
