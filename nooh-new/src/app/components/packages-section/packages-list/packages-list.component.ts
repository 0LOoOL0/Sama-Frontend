import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PackageService, Package } from '../service/package.service';

@Component({
  selector: 'app-packages-list',
  standalone: true,
  imports: [CommonModule, RouterLink], // CommonModule includes *ngFor, *ngIf, etc.
  templateUrl: './packages-list.component.html',
  styleUrls: ['./packages-list.component.css']
})
export class PackagesListComponent implements OnInit {
  packages: Package[] = [];

  constructor(private packageService: PackageService, private router: Router) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe(
      (response: any) => {
        console.log('Packages loaded:', response);
        // If the API returns an object with a 'data' property:
        if (response && response.data && Array.isArray(response.data)) {
          this.packages = response.data;
        } else if (Array.isArray(response)) {
          this.packages = response;
        } else {
          this.packages = [];
        }
      },
      (error: any) => {
        console.error('Error loading packages:', error);
      }
    );
  }

  navigateToCreatePackage(): void {
    this.router.navigate(['/packages-create']);
  }

  editPackage(pkg: Package): void {
    // For example, you might navigate to an edit page passing package data in state
    this.router.navigate(['/packages-create'], { state: { packageData: pkg } });
  }

  // New delete method
  deletePackage(pkg: Package): void {
    if (confirm(`Are you sure you want to delete the package "${pkg.title}"?`)) {
      this.packageService.deletePackage(pkg.id).subscribe(
        (response: any) => {
          console.log('Package deleted:', response);
          // Reload the list after deletion
          this.loadPackages();
        },
        (error: any) => {
          console.error('Error deleting package:', error);
        }
      );
    }
  }

  toggleStatus(pkg: Package, field: 'status_user' | 'status_staff', newValue: boolean): void {
    const updateData = { [field]: newValue };
    this.packageService.updatePackage(pkg.id, updateData).subscribe(
      (response: any) => {
        console.log('Package updated:', response);
        pkg[field] = newValue;
      },
      (error: any) => {
        console.error('Error updating package:', error);
      }
    );
  }
  
  
  get activePackages(): Package[] {
    return this.packages.filter(pkg => pkg.status_user);
  }
  

  
  
  
}
