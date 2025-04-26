import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterEvent, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-main-component',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './user-main-component.component.html',
  styleUrl: './user-main-component.component.scss',
})
export class UserMainComponent {
  childRoutes: any[] = [];
  isSidebarVisible: boolean = true; // Show the sidebar by default

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Check if the route is the homepage and hide the sidebar
        this.isSidebarVisible = !this.router.url.includes('/home');
      }
    });
  }

  ngOnInit(): void {
    this.childRoutes = this.getChildRoutes('user-main-component');
    console.log('childRoutes==>', this.childRoutes);
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
    this.router.navigate([`/user-main-component/${path}`]);
  }
}
