import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage implements OnInit {
  profile: any = {};
  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit() {
    try {
      this.profile = await this.authService.fetchProfileData();
      console.log('Profile:', this.profile);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }
  editProfile() {
    console.log('Navigating to edit profile page');
    this.router
      .navigate(['/editprofile'])
      .then(success => {
        console.log('Navigation success:', success);
      })
      .catch(error => {
        console.error('Navigation error:', error);
      });
  }
}
