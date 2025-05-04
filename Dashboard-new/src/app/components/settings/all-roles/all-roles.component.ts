import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrl: './all-roles.component.css'
})
export class AllRolesComponent {
  constructor(private router: Router) { }

  navigateToCreatePermission() {
    this.router.navigate(['/permission']);
  }
}
