import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [FormsModule], // Import FormsModule here
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent {
  roleName: string = '';
  rolePermissions: string = '';
  userManagement: string = '';

  onSubmit() {
    // Handle form submission logic here
    console.log('Role Name:', this.roleName);
    console.log('Role Permissions:', this.rolePermissions);
    console.log('User Management:', this.userManagement);

    // Clear form fields after submission
    this.roleName = '';
    this.rolePermissions = '';
    this.userManagement = '';
  }
}
