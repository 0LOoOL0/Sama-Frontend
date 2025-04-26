import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  email: string = '';
  message: string | null = null;
  constructor(private location: Location) {}
  onSubmit() {
    if (this.email) {
      this.message = `OTP has been sent to ${this.email}`;
    }
  }
  goBack() {
    this.location.back();
  }
}
