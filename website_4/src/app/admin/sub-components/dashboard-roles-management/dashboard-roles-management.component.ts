import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesAndPermissionsService } from '../../../services/roles-and-permissions.service';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
export interface IRole {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
  totalAdmins?: number;
  pivot?: any;
}
export interface IAdmin {
  contact_number: string;
  created_at: string;
  deleted_at: string | null;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  profile_image: string;
  role: string;
  status: string;
  updated_at: string;
  roles?: IRole[];
}

@Component({
  selector: 'app-dashboard-roles-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]// Add your routes here
,  // Import CommonModule to use ngIf and ngClass
  
  templateUrl: './dashboard-roles-management.component.html',
  styleUrls: ['./dashboard-roles-management.component.scss'],
})
export class DashboardRolesManagementComponent {
  allRoles: IRole[] = [];
  allAdmins: IAdmin[] = [];
  shownAdmins: IAdmin[] = []; 
  searchTerm: string = '';
  constructor(private rolesAndPermissionsService: RolesAndPermissionsService) {}

  async ngOnInit() {
    this.allRoles = await this.getAllRoles();
    this.allAdmins = await this.getAllAdmins();
    this.allAdmins.forEach((admin) => {
      const role = this.allRoles.find((role) => role.name === admin.role);
      if (role) {
        role.totalAdmins = (role.totalAdmins ?? 0) + 1;
      }
    });
    this.shownAdmins = this.allAdmins;
  }

  
  async getAllRoles(): Promise<IRole[]> {
    const roles = await this.rolesAndPermissionsService.getAllRoles();
    console.log(roles?.data?.roles);
    return roles?.data?.roles;
  }
  async getAllAdmins(): Promise<IAdmin[]> {
    const admins = await this.rolesAndPermissionsService.getAllAdmins();
    console.log('Admins:', admins.data.admins);
    return admins?.data?.admins;
  }

  filteredadmins() {
    this.shownAdmins = Array.from(this.allAdmins).filter((admin: IAdmin) => {
      // const matchesRole = this.selectedRole ? admin.role === this.selectedRole : true;
      const matchesSearch = this.searchTerm ? admin.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) || admin.email.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      return  matchesSearch; //&& matchesRole 
    });
  }

  // users = [
  //   { name: 'Areej', email: 'areej@example.com', role1: 'Administrator', role1Class: 'administrator', role2: 'Financial', role2Class: 'financial', status: 'Active' },
  //   { name: 'Sama', email: 'sama@example.com', role1: 'Administrator', role1Class: 'administrator', status: 'Non Active' }
  // ];


  editAdmin(admin: any) {  // Explicitly define the type of the 'user' parameter
    console.log('Edit User:', admin);
  }

  viewAdmin(admin: any) {  // Explicitly define the type of the 'user' parameter
    console.log('View User:', admin);
  }

}
