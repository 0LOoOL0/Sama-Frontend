// src/app/user/sub-components/subscribe/subscribe.component.ts
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubscribeService } from '../../../services/subscribe.service';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css', '../../../shared/css/style.css']
})
export class SubscribeComponent implements OnInit {
  packages: any[] = []; // Array to hold packages fetched from backend

  constructor(private router: Router, private subscribeService: SubscribeService) {}

  ngOnInit(): void {
    this.fetchPackages();
  }

  fetchPackages(): void {
    this.subscribeService.getUserPackages()
      .then((response: { data: any[]; }) => {
         // Assuming response.data is an array of package objects
         this.packages = response.data;
         console.log('Fetched packages:', this.packages);
      })
      .catch((error: any) => {
         console.error('Error fetching packages:', error);
      });
  }

  // src/app/user/sub-components/subscribe/subscribe.component.ts
choose(pkg: any): void {
  // Pass pkg.id, pkg.title, pkg.price, and pkg.imageUrl as query parameters.
  this.router.navigate(['user-main-component/choose-pet'], { 
    queryParams: { 
      pkgId: pkg.id, 
      pkgName: pkg.title, 
      pkgPrice: pkg.price
      
    } 
  });
}


navigateProfile(): void {
  this.router.navigate(['user-main-component/new-user-profile/new-my-profile']);
}

}
