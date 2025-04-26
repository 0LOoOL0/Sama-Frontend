import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RolesAndPermissionsService } from '../../../services/roles-and-permissions.service';




export interface IRole {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
  totalAdmins?: number;
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
}


@Component({
  selector: 'app-roles-permissions',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles-permissions.component.html',
  styleUrls: ['./roles-permissions.component.scss']
})

export class RolesPermissionsComponent {

  constructor(private rolesAndPermissionsService: RolesAndPermissionsService) { }
  allRoles: IRole[] = [];
  allAdmins: IAdmin[] = [];
  async ngOnInit() {
    this.allRoles = await this.getAllRoles();
    this.allAdmins = await this.getAllAdmins();
    this.allAdmins.forEach((admin) => {
      const role = this.allRoles.find((role) => role.name === admin.role);
      if (role) {
        role.totalAdmins = (role.totalAdmins ?? 0) + 1;
      }
    });
  }


  searchTerm: string = '';
  selectedRole: string = '';

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
    return Array.from(this.allAdmins).filter((admin: IAdmin) => {
      const matchesRole = this.selectedRole ? admin.role === this.selectedRole : true;
      const matchesSearch = this.searchTerm ? admin.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) || admin.email.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      return matchesRole && matchesSearch;
    });
  }

  editRole(role: { name: string, total: number }) {
    console.log('Edit Role:', role);
  }

  addRole() {
    console.log('Add new role');
  }

  editAdmin(fake: any) {
    console.log('Edit Admin:', fake);
  }

  viewUser(user: { name: string, email: string, role: string, status: string }) {
    console.log('View User:', user);
  }
}
