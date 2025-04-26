import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  message: string | null = null;

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }

  submitForm() {
    if (this.newPassword === this.confirmPassword) {
      this.message = 'Password reset successfully';
    } else {
      this.message = 'Passwords do not match';
    }
  }
}
