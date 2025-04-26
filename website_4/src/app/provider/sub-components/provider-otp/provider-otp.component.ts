import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProviderAuthService } from '../../../services/provider-auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-provider-otp',
  standalone: true,
  templateUrl: './provider-otp.component.html',
  styleUrls: ['./provider-otp.component.scss']
})
export class ProviderOtpComponent implements OnInit {
  verifyForm: FormGroup | any;
  type: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ProviderAuthService: ProviderAuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.verifyForm = this.formBuilder.group({
      verificationCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  combineOtp() {
    const otpInputs = document.querySelectorAll('.otp-input');
    let otp = '';
    otpInputs.forEach((input: any) => {
      otp += input.value;
    });
    this.verifyForm.patchValue({ verificationCode: otp });
  }
  

  async verify() {
    this.combineOtp(); 
    try {
      const email = localStorage.getItem('email');
      const response = await this.ProviderAuthService.verifyCode({ ...this.verifyForm.value, email });
      console.log(response.data);
      this.router.navigate(['/provider-main/provider-sign-up-form']);
    } catch (error: any) {
      console.error(error.response.data);
      await this.showAlert('Verification Failed', 'The verification code is invalid or has expired.');
    }
  }

  async resendCode() {
    try {
      const email = localStorage.getItem('email');
      if (email) {
        await this.ProviderAuthService.sendVerificationCode(email);
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
