import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-packages-listing',
  standalone: true, // Standalone component
  imports: [CommonModule], // Import CommonModule to use *ngFor
  templateUrl: './packages-listing.component.html',
  styleUrls: ['./packages-listing.component.scss']
})
export class PackagesListingComponent {
  packages = [
    { name: 'Free trial', duration: 'One Month', status: 'online', price: '$0', statusUser: 'online', statusStaff: 'online' },
    { name: 'One Month', duration: 'One Month', status: 'online', price: '$29.99', statusUser: 'online', statusStaff: 'online' },
    { name: '2 Years', duration: 'Two Years', status: 'online', price: '$499.99', statusUser: 'online', statusStaff: 'online' },
    { name: 'Additional bd 10', duration: 'Additional bd 10', status: 'online', price: '$10', statusUser: 'online', statusStaff: 'online' },
    // Add more packages if needed
  ];

  navigateToAddPackage() {
    // Implement navigation logic here
  }
}
