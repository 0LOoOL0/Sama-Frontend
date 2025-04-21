import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ProviderHeaderComponent } from '../provider-header/provider-header.component';
import { ProviderProfileComponent } from '../provider-profile/provider-profile.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-provider',
  imports: [CommonModule, ProviderHeaderComponent, ProviderProfileComponent, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css',
})
export class ProviderComponent implements OnInit {
  isSidebarVisible = true; // Initially, the sidebar is visible

  ngOnInit(): void {
    this.checkScreenSize(); // Check the screen size on initialization
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize(); // Update the sidebar visibility on window resize
  }

  checkScreenSize(): void {
    this.isSidebarVisible = window.innerWidth > 720; // Set to true if screen width > 720, false otherwise
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
