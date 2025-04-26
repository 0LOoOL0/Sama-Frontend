import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserSideInfoComponent } from './user-side-info/user-side-info.component'; 
import { UserProfileNavComponent } from "./user-profile-nav/user-profile-nav.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-new-user-profile',
  standalone: true,
  imports: [UserProfileNavComponent, UserSideInfoComponent, CommonModule, NavbarComponent,RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './new-user-profile.component.html',
  styleUrl: './new-user-profile.component.css'
})
export class NewUserProfileComponent {

}
