import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { UserAuthService } from '../../../services/user-auth.service';
import axios from 'axios';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- Ensure RouterModule is here
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.scss',
    '../../../shared/css/style.css',
    '../../../shared/css/custom-style.css',
    '../../../shared/css/resposiveness.css'
  ]
})
export class NavbarComponent {
  isLogged: boolean = false;
  profile: any;
  showDropdown: boolean = false;
  private apiUrl = environment.apiUrl;

  constructor(private router: Router, private auth: UserAuthService, private eRef: ElementRef) {
    this.isLoggedIn();
  }

  isLoggedIn() {
    this.auth.getProfile()
      .then(profile => {
        this.profile = profile;
        this.isLogged = true;
      })
      .catch(err => {
        this.isLogged = false;
        console.error('Error fetching profile', err);
      });
  }

  logout() {
    const token = localStorage.getItem('token');
    return axios
      .post(
        `${this.apiUrl}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        localStorage.removeItem('token');
        console.log("logout success");
        this.router.navigate(['user-main-component/user-log-sign']);
      });
  }

  toggleNotification(event: MouseEvent): void {
    event.preventDefault();
    this.showDropdown = !this.showDropdown;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  goToCart() {
    this.router.navigate(['/user-main-component/shopping-bag']);
  }
  
}
