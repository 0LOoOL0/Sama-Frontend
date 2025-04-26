import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from '../services/adminAuth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private adminService: AdminAuthService, private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true; // Allow access
    } else {
      this.router.navigate(['../adminLogin']); // Redirect to admin login
      return false; // Deny access
    }
  }
}
