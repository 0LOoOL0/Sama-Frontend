import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  verifyForm: FormGroup | any;
  type: string | undefined;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: UserAuthService,
  ) {
    this.verifyForm = this.formBuilder.group({
      verificationCode: this.formBuilder.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    });
  }

  ngOnInit() {
    this.startCountdown();
    this.activatedRoute.params.subscribe(params => {
      this.type = params['value']; // Access the passed value
      console.log(this.type); // This will log 'register'
    });
  }


  startCountdown() {
    const timerElement = document.getElementById('timer') as HTMLElement;
    const resendLink = document.getElementById('resend') as HTMLElement;
    let timeLeft = 60;

    function updateTimer() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(timerInterval);
        resendLink.style.pointerEvents = 'auto'; // Enable resend link
      }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    resendLink.style.pointerEvents = 'none'; // Disable resend link initially

    resendLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (timeLeft === 0) {
        // Reset timer and resend OTP logic here
        timeLeft = 60;
        resendLink.style.pointerEvents = 'none'; // Disable resend link again
        updateTimer();
      }
    });
  }

  async verifyOtp() {
    if (this.verifyForm.invalid) {
      return;
    }

    try {
      const email = localStorage.getItem('email');
      const response = await this.authService.verifyCode({ ...this.verifyForm.value, email });
      console.log(response.data);
      if (this.type === "register") {
      this.router.navigate(['user-main-component/create-owner-profile']);
      }
      else if (this.type === "forgotpass") {
      this.router.navigate(['/newpassword']);
      }
    } catch (error: any) {
      console.error(error.response.data);
      console.log('Verification Failed', 'The verification code is invalid or has expired.');
    }

    
  }
  async resendCode() {
    try {
      const email = localStorage.getItem('email');
      if (email) {
        await this.authService.sendVerificationCode(email);
        
      }
    } catch (error: any) {
      console.error(error.response.data);
      
    }
  }

}
