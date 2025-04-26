import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RolesAndPermissionsService } from '../../../services/roles-and-permissions.service';

@Component({
  selector: 'app-permissions-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permissions-list.component.html',
  styleUrl: './permissions-list.component.scss'
})
export class PermissionsListComponent {

  allPermissions: any[] = [];
  shownPermissions: any[] = [];
  async ngOnInit() {
    await this.getPermissions();
    this.shownPermissions = this.allPermissions;
  }

  constructor(private rolesAndPermissionsService: RolesAndPermissionsService) {}

  async getPermissions() {
    const permissions = (await this.rolesAndPermissionsService.getAllPermissions()).data.permissions;
    this.allPermissions = permissions;
  }
  // permissions = [
  //   { name: 'Management', assignedTo: ['Admin', 'Manager'], createDate: '2023-10-01' },
  //   { name: 'Manage Roles', assignedTo: ['Admin'], createDate: '2023-10-02' },
  //   { name: 'Add & Remove Users', assignedTo: ['Admin', 'Support'], createDate: '2023-10-03' },
  //   { name: 'Only View', assignedTo: ['Admin'], createDate: '2023-10-04' }
  // ];

  editPermission(permission: any) {
    console.log('Edit Permission:', permission);
  }

  deletePermission(permission: any) {
    console.log('Delete Permission:', permission);
  }

  onSearchInput(event: any) {
    if (event.target.value === '') {
      this.shownPermissions = this.allPermissions;
      return;
    }
    this.shownPermissions = this.allPermissions.filter(permission => permission.name.includes(event.target.value)
                                                      || permission.created_at.includes(event.target.value));                                        
  }

}
