import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.page.html',
  styleUrls: ['./forgotpass.page.scss'],
})
export class ForgotpassPage implements OnInit {
  emailForm: FormGroup | any;
  emailChecking: boolean = false;

  constructor(   
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController) {}

  ngOnInit() { 
    
  this.emailForm = this.formBuilder.group({
    email: ['', [Validators.required]],
  });
}

async checkEmail(email: string) {
  try {
    const response = await this.authService.checkEmail(email);
    if (!response.data.exists) {
      await this.showAlert('User Not Found', 'The email address is not registered. Please check the email.');
      this.emailForm.get('email').setErrors({ userNotFound: true });
    }
  } catch (error: any) {
    await this.showAlert('User Not Found', 'The email address is not registered. Please check the email.');
    this.emailForm.get('email').setErrors({ userNotFound: true });
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

async OTP() {
  if (this.emailForm.invalid) {
    return; // Exit if form is invalid
  }

  const { email } = this.emailForm.value;

  // Check if email exists only when OTP button is clicked
  this.emailChecking = true;
  const emailExists = await this.checkEmail(email);
  this.emailChecking = false;


  while (this.emailChecking) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  if (this.emailForm.invalid) {
    return;
  }

  try {
    await this.authService.getCSRFToken();
    const { email} = this.emailForm.value;
    localStorage.setItem('email', email);
    await this.authService.sendVerificationCode(email);
    this.router.navigate(['/verify-email', 'forgotpass']);
  } catch (error: any) {
    console.error(error.response.data);
  }
}
}
