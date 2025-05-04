import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  constructor(
    private router: Router
  ) { }

  onCancel(): void {
    this.router.navigate(['/all-users']);
  }
}
