import { Component, OnInit } from '@angular/core';
import { ProviderAuthService } from '../../../services/provider-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wait-approval',
  templateUrl: './wait-approval.component.html',
  styleUrls: ['./wait-approval.component.scss']
})
export class WaitApprovalComponent implements OnInit {
  statusCheckInterval: any;

  constructor(
    private providerAuthService: ProviderAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token'); // Get token from local storage
    if (!token) {
      this.router.navigate(['/login']); // Redirect to login if token is missing
      return;
    }
  
    // Check the status immediately on page load
    this.checkProviderStatus();
  
    // Start polling for status updates every 30 seconds
    this.statusCheckInterval = setInterval(() => {
      this.checkProviderStatus();
    }, 30000); // Check every 30 seconds
  }
  

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.statusCheckInterval) {
      clearInterval(this.statusCheckInterval);
    }
  }

  checkProviderStatus() {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (!token) {
      console.error('Token not found');
      this.router.navigate(['/provider-main/provider-log-sign']); // Redirect if token is not available
      return;
    }
  
    this.providerAuthService.getProviderStatus(token).subscribe(
      (response) => {
        const { status } = response;
        
        // Save the status to localStorage so we can use it later
        localStorage.setItem('provider_status', status);
        console.log("status:" ,status);
        if (status === 'approved') {
          this.router.navigate(['/provider-main/wait-for-approval2']);
          clearInterval(this.statusCheckInterval); // Stop polling
        } else if (status === 'rejected') {
          this.router.navigate(['/provider-main/denied']);
          clearInterval(this.statusCheckInterval); // Stop polling
        }
      },
      (error) => {
        console.error('Error checking provider status', error);
      }
    );
  }
  
  
}
