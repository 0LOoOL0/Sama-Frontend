import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {

  constructor(private router: Router) {}
    
       // Method to navigate to the CreateSupplierComponent
      navigateToCreateUser() {
        this.router.navigate(['/create-user']);
      }
}
