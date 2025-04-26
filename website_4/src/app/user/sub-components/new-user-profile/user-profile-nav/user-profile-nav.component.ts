import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-profile-nav',
  standalone: true,
  imports: [ 
    CommonModule, RouterLinkActive, RouterOutlet, RouterLink],
  templateUrl: './user-profile-nav.component.html',
  styleUrl: './user-profile-nav.component.css'
})
export class UserProfileNavComponent {

}
