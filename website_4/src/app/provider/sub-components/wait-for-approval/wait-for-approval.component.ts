import { Component } from '@angular/core';
import { SignupStepsComponent } from '../../../shared/signup-steps/signup-steps.component';

@Component({
  selector: 'app-wait-for-approval',
  standalone: true,
  imports: [SignupStepsComponent],
  templateUrl: './wait-for-approval.component.html',
  styleUrl: './wait-for-approval.component.css'
})
export class WaitForApprovalComponent {
  pg:number = 3;
}
