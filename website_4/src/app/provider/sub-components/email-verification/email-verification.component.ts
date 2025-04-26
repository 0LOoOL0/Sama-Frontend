import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'], // Fixed typo from 'styleUrl' to 'styleUrls'
})
export class EmailVerificationComponent implements OnInit {
  otp: string[] = ['', '', '', '', '', ''];
  minutes: number = 0;
  seconds: number = 59;
  isTimerActive: boolean = true;
  userEmail: string = 'youremail@gmail.com';

  ngOnInit(): void {}

  focusNext(event: KeyboardEvent, index: number) {
    if (event.key >= '0' && event.key <= '9' && index < 5) {
      const nextInput = document.querySelectorAll('input')[index + 1];
      (nextInput as HTMLInputElement).focus();
    }
  }

  startTimer() {
    const interval = setInterval(() => {
      if (this.seconds === 0 && this.minutes === 0) {
        this.isTimerActive = false;
        clearInterval(interval);
      } else {
        if (this.seconds === 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.seconds--;
        }
      }
    }, 1000);
  }

  resendCode() {
    this.minutes = 0;
    this.seconds = 59;
    this.isTimerActive = true;
    this.startTimer();
    // Add logic to resend the code here
  }

  verifyOtp() {
    const otpCode = this.otp.join('');
    console.log('Entered OTP:', otpCode);
    // Add logic to verify OTP here
  }
}
