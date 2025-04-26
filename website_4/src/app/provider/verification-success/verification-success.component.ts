import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verification-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verification-success.component.html',
  styleUrls: ['./verification-success.component.scss'],
})
export class VerificationSuccessComponent implements OnInit {
  remainingTime: number = 5;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown() {
    const interval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(interval);
        this.router.navigate(['/provider-main/provider-sign-up-form']);
      }
    }, 1000);
  }
}