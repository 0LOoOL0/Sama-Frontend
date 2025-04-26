import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  verifyForm: FormGroup | any;
  type: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.paramMap.get('type')!;
    this.verifyForm = this.formBuilder.group({
      verificationCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  async verify() {
    if (this.verifyForm.invalid) {
      return;
    }

    try {
      const email = localStorage.getItem('email');
      const response = await this.authService.verifyCode({ ...this.verifyForm.value, email });
      console.log(response.data);
      if (this.type === "register") {
      this.router.navigate(['/profile-setup']);
      }
      else if (this.type === "forgotpass") {
      this.router.navigate(['/newpassword']);
      }
    } catch (error: any) {
      console.error(error.response.data);
      await this.showAlert('Verification Failed', 'The verification code is invalid or has expired.');
    }
  }

  async resendCode() {
    try {
      const email = localStorage.getItem('email');
      if (email) {
        await this.authService.sendVerificationCode(email);
        await this.showAlert('Code Resent', 'A new verification code has been sent to your email.');
      }
    } catch (error: any) {
      console.error(error.response.data);
      await this.showAlert('Error', 'There was an issue sending the verification code. Please try again.');
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
}
