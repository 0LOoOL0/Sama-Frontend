import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.scss',
})
export class AdminMainComponent {
  childRoutes: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.childRoutes = this.getChildRoutes('admin-main');
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
    this.router.navigate([`/admin-main/${path}`]);
  }
}
