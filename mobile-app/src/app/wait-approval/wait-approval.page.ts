import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-wait-approval',
  templateUrl: './wait-approval.page.html',
  styleUrls: ['./wait-approval.page.scss'],
})
export class WaitApprovalPage implements OnInit {
  currentStep: number = 1;
  totalSteps: number = 5;
  titles: string[] = [
    'Waiting for approval',
    'Account approved',
    'Profile setup',
    'Waiting for approval',
    'Success!'
  ];
  description: string[] = [
    'The application is currently under review. We appreciate your patience.',
    'Congratulations, your account has been approved.',
    'Complete your profile details to fully activate your account.',
    'The application is currently under review. We appreciate your patience.',
    'Congratulations, your Profile has been approved and is now active.'
  ];

  constructor(private router: Router) { } 

  ngOnInit() {
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      
      if (this.currentStep === 3) {
        this.router.navigate(['/profile-setup']); 
      } 

    }
  }
}
