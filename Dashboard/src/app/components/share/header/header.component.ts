import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type DropdownKey =
  | 'overviewDropdown'
  | 'usersManagementDropdown'
  | 'petManagementDropdown'
  | 'samaStoreDropdown'
  | 'blogManagementDropdown'
  | 'reportsDropdown'
  | 'rolesDropdown'
  | 'settingsDropdown'
  | 'membershipDropdown'
  | 'authenticationDropdown'
  | 'adminRolesPermissionsDropdown'
  | 'petProfilesDropdown'
  | 'productsDropdown'
  | 'ordersDropdown'
  | 'samaCardDropdown'
  | 'membershipPackageDropdown'
  | 'accountSettingsDropdown'
  | 'notificationEmailPreferencesDropdown'
  | 'petOwnersDropdown'
  | 'providersDropdown';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  dropdownVisibility: Record<DropdownKey, boolean> = {
    overviewDropdown: false,
    usersManagementDropdown: false,
    petManagementDropdown: false,
    samaStoreDropdown: false,
    blogManagementDropdown: false,
    reportsDropdown: false,
    rolesDropdown: false,
    settingsDropdown: false,
    membershipDropdown: false,
    authenticationDropdown: false,
    adminRolesPermissionsDropdown: false,
    petProfilesDropdown: false,
    productsDropdown: false,
    ordersDropdown: false,
    samaCardDropdown: false,
    membershipPackageDropdown: false,
    accountSettingsDropdown: false,
    notificationEmailPreferencesDropdown: false,
    petOwnersDropdown: false,
    providersDropdown: false,
  };

  // Sidebar collapsed state
  isSidebarCollapsed: boolean = true;




  // Toggle dropdown visibility
  toggleDropdown(dropdownId: DropdownKey): void {
    this.dropdownVisibility[dropdownId] = !this.dropdownVisibility[dropdownId];
  }

  // Toggle sidebar visibility and close all dropdowns when sidebar is toggled
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;

    // Close all dropdowns when sidebar is collapsed
    if (this.isSidebarCollapsed) {
      this.closeAllDropdowns();
    }
  }

  // Method to close all dropdowns
  closeAllDropdowns(): void {
    for (const key in this.dropdownVisibility) {
      if (this.dropdownVisibility.hasOwnProperty(key)) {
        this.dropdownVisibility[key as DropdownKey] = false;
      }
    }
  }
}
