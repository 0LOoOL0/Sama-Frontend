import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import { ProviderSectionService } from '../../service/provider-section.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-provider-steps',
  imports: [CommonModule],
  templateUrl: './provider-steps.component.html',
  styleUrls: ['./provider-steps.component.css']
})

export class ProviderStepsComponent {

  currentStep: number = 0;

  // Default to the first step
  stepTitles: string[] = [
    'Complete Provider Profile',
    'Step 2: Complete Gallery Form',
    'Step 3: Pending',
    'Step 4: Approved',
  ];
  // constructor(private providerService: ProviderSectionService, private router: Router, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.currentStep = 0; // Initialize current step
  }

  // ControlProvider(status: any): void {
  //   const id = this.providerService.getProviderId();
  //   console.log(id);
  //   const loader = document.getElementById('loader');

  //   if (!loader) {
  //     return;
  //   }
  //   loader.style.display = 'block';
  //   this.providerService.providerToggle(status).subscribe(
  //     (response) => {
  //       loader.style.display = 'none';

  //       this.toastr.success('Provider status has been changed.', 'Congratulations!', {
  //         timeOut: 3000,
  //       });
  //       const id = this.providerService.getProviderId();
  //       console.log(id);
  //       // this.fetchProviderData()
  //     },
  //     (error) => {
  //       loader.style.display = 'none';

  //       // Log the detailed error object to the console
  //       console.error('Error from backend:', error);

  //       // Check if the backend returned a detailed error message
  //       if (error.error && error.error.message) {
  //         console.error('Error Message:', error.error.message);
  //         console.error('Error Details:', error.error.error);
  //         console.error('Stack Trace:', error.error.stack_trace);
  //       } else {
  //         console.error('Unknown error:', error);
  //       }

  //       this.toastr.error('Provider status has not been changed.', 'Please try again later!', {
  //         timeOut: 3000,
  //       });
  //     }
  //   );
  // }
  get currentTitle(): string {
    return this.stepTitles[this.currentStep]; // Return the title of the current step
  }

  nextStep(): void {
    if (this.currentStep < this.stepTitles.length - 1) {
      this.currentStep++; // Increment current step
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--; // Decrement current step
    }
  }
}