import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminAuthService } from '../../../services/adminAuth.service';
import { RolesAndPermissionsService } from '../../../services/roles-and-permissions.service';

export enum AdminStatus {
  Active = 'active',
  Inactive = 'inactive',
  Cancelled = 'cancelled',
}

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [FormsModule, CommonModule], // Import FormsModule here
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent {
  constructor(
    private rolesAndPermissions: RolesAndPermissionsService,
    private adminAuthService: AdminAuthService,
  ) {}

  name: string = '';
  email: string = '';
  contact: string = '';
  adminRole: string = 'super admin';
  status: string = 'active';
  password: string = '';
  confirmPassword: string = '';
  statusOptions: string[] = Object.values(AdminStatus);
  allRoles: string[] = ['Admin', 'Editor', 'User'];

  async ngOnInit() {
    this.allRoles = await this.getAllRoles();
  }

  async onSubmit() {
    // Handle form submission logic here
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Contact:', this.contact);
    console.log('Admin Role:', this.adminRole);
    console.log('Status:', this.status);
    console.log('Password:', this.password);
    console.log('Confirm Password:', this.confirmPassword);
    await this.registerNewAdmin();
    // Clear form fields after submission
    this.resetForm();
  }

  onCancel() {
    // Handle cancel logic here
    console.log('Form cancelled');
  }

  private resetForm() {
    this.name = '';
    this.email = '';
    this.contact = '';
    this.adminRole = 'Admin';
    this.status = 'Active';
    this.password = '';
    this.confirmPassword = '';
  }

  async getAllRoles() {
    try {
      const roles = (
        await this.rolesAndPermissions.getAllRoles()
      )?.data?.roles?.map((role: any) => role.name);
      return roles;
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }

  async registerNewAdmin(): Promise<string> {
    const result = await this.adminAuthService.registerAdmin({
      first_name: this.name,
      last_name: this.name,
      email: this.email,
      contact_number: this.contact,
      role: this.adminRole,
      status: this.status,
      password: this.password,
    });
    console.log('Register admin result:', result);
    if (result.status == 'success') {
      return 'success';
    } else {
      return 'error';
    }
  }
}
