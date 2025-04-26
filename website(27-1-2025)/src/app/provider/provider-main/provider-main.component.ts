import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-provider-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './provider-main.component.html',
  styleUrls: ['./provider-main.component.scss'], // Corrected property name
})
export class ProviderMainComponent {
  childRoutes: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.childRoutes = this.getChildRoutes('provider-main');
    console.log('childRoutes==>', this.childRoutes);
      const token = localStorage.getItem('provider_token');
      const status = localStorage.getItem('provider_status');
    
      if (!token) {
        this.router.navigate(['/provider-main/provider-log-sign']); // Redirect to login if token is missing
        return;
      }
    
      // If the status is already known, navigate immediately
      if (status === 'pending2') {
        this.router.navigate(['/provider-main/wait-approval']);
      }else if (status === 'approved') {
        this.router.navigate(['/provider-main/wait-for-approval2']);
      } else if (status === 'rejected') {
        this.router.navigate(['/provider-main/denied']);
      }

  }

  private getChildRoutes(parentPath: string): any[] {
    const routeConfig = this.router.config.find(
      route => route.path === parentPath,
    );
    if (routeConfig && routeConfig.children) {
      return routeConfig.children;
    }
    return [];
  }

  navigateTo(path: string): void {
    this.router.navigate([`/provider-main/${path}`]);
  }
}
