import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-log-sign',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoginComponent, SignupComponent],
  templateUrl: './log-sign.component.html',
  styleUrl: './log-sign.component.scss',
})
export class LogSignComponent {
  segment: string = 'login';

  // Method to change the segment
  changeSegment(newSegment: string): void {
    this.segment = newSegment;
  }
}
