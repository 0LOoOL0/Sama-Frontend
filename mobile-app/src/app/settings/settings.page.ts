import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  ngOnInit() {
  }
  constructor(private authService: AuthService, private router: Router) { }
  logoutUser() {
    this.authService.logout().then(() => {
      console.log('You have been logged out.');
      // Redirect or perform additional actions after logout
      this.router.navigate(['/']);
    }).catch(error => {
      console.error('Logout failed:', error);
    });
  }
  goSubscriptionPage() {
    this.router.navigate(['/subscription']);
  }
  
  goSupportPage() {
    this.router.navigate(['/support']);
  }
  
  goPrivacyPage() {
    this.router.navigate(['/privacy']);
  }
  
  goTermsAndConditions() {
    this.router.navigate(['/termsconditions']);
  }
  
  goReportProblem() {
    // Add the navigation logic for the report problem page
    this.router.navigate(['/reportproblem']);
  }
}