import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'permission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent {
  searchQuery: string = '';

  sectionVisibility: { [key: string]: boolean } = {
    profile: false,
    user: false,
    petOwner: false,
    pet: false,
    provider: false,
    samaStore: false,
    coupon: false,
    membership: false,
    appointment: false,
    petService: false,
    report: false,
    notiEmail: false,
    blog: false
  };

  allPermissions: { section: string; name: string; selected: boolean }[] = [
    // Profile Permissions
    { section: 'profile', name: 'Profile Test', selected: false },

    // user Permissions
    { section: 'user', name: 'User Test', selected: false },

    // Pet Owner Permissions
    { section: 'petOwner', name: 'Add Pet Owner', selected: false },
    { section: 'petOwner', name: 'Edit Pet Owner', selected: false },
    { section: 'petOwner', name: 'Pair Pet Owner', selected: false },

    // pet Permissions
    { section: 'pet', name: 'Add Pet', selected: false },
    { section: 'pet', name: 'Edit Pet', selected: false },
    { section: 'pet', name: 'Delete Pet', selected: false },
    { section: 'pet', name: 'View Pet', selected: false },
    { section: 'pet', name: 'Discount Usage', selected: false },
    { section: 'pet', name: 'Saving', selected: false },
    { section: 'pet', name: 'Reminder', selected: false },
    { section: 'pet', name: 'Booking', selected: false },

    // provider Permissions
    { section: 'provider', name: 'Provider Profile', selected: false },
    { section: 'provider', name: 'Add Provider', selected: false },
    { section: 'provider', name: 'Delete Provider', selected: false },
    { section: 'provider', name: 'Edit Provider', selected: false },
    { section: 'provider', name: 'Logo Delete', selected: false },
    { section: 'provider', name: 'Edit Gallery', selected: false },
    { section: 'provider', name: 'Upload Documents', selected: false },
    { section: 'provider', name: 'Add More Documents', selected: false },
    { section: 'provider', name: 'Upload Contract', selected: false },
    { section: 'provider', name: 'Add Picture', selected: false },
    { section: 'provider', name: 'Add Service', selected: false },
    { section: 'provider', name: 'Delete Service', selected: false },
    { section: 'provider', name: 'Edit Service', selected: false },
    { section: 'provider', name: 'Add Product', selected: false },
    { section: 'provider', name: 'Delete Product', selected: false },
    { section: 'provider', name: 'Edit Product', selected: false },
    { section: 'provider', name: 'Add Category', selected: false },
    { section: 'provider', name: 'Delete Category', selected: false },
    { section: 'provider', name: 'Edit Category', selected: false },
    { section: 'provider', name: 'Import Products', selected: false },
    { section: 'provider', name: 'Export Products', selected: false },
    { section: 'provider', name: 'Import Services', selected: false },
    { section: 'provider', name: 'Export Services', selected: false },
    { section: 'provider', name: 'Add Doctor', selected: false },
    { section: 'provider', name: 'Edit Doctor', selected: false },
    { section: 'provider', name: 'Pet Details', selected: false },
    { section: 'provider', name: 'Pet Owner Details', selected: false },
    { section: 'provider', name: 'Discount Usage', selected: false },
    { section: 'provider', name: 'Pet History', selected: false },
    { section: 'provider', name: 'Add Coupon', selected: false },
    { section: 'provider', name: 'Edit Coupon', selected: false },
    { section: 'provider', name: 'Delete Coupon', selected: false },
    { section: 'provider', name: 'Provider Report', selected: false },
    { section: 'provider', name: 'Email', selected: false },
    { section: 'provider', name: 'Notification', selected: false },
    { section: 'provider', name: 'Pending Provider', selected: false },
    { section: 'provider', name: 'Active Provider', selected: false },
    { section: 'provider', name: 'Offline Provider', selected: false },
    { section: 'provider', name: 'Renewed Provider', selected: false },
    { section: 'provider', name: 'Expired Provider', selected: false },
    { section: 'provider', name: 'Edit Provider Process', selected: false },

    // Sama Store Permissions
    { section: 'samaStore', name: 'Add Order', selected: false },
    { section: 'samaStore', name: 'Delete Order', selected: false },
    { section: 'samaStore', name: 'Refund Order', selected: false },
    { section: 'samaStore', name: 'Add Supplier', selected: false },
    { section: 'samaStore', name: 'Edit Supplier', selected: false },
    { section: 'samaStore', name: 'Add Product Table', selected: false },
    { section: 'samaStore', name: 'Add Category', selected: false },
    { section: 'samaStore', name: 'Delete Category', selected: false },
    { section: 'samaStore', name: 'Delete Product', selected: false },
    { section: 'samaStore', name: 'Print Invoice', selected: false },
    { section: 'samaStore', name: 'Pending Order', selected: false },
    { section: 'samaStore', name: 'Paid & Refund', selected: false },

    // Coupon Permissions
    { section: 'coupon', name: 'Add Coupon', selected: false },
    { section: 'coupon', name: 'Edit Coupon', selected: false },
    { section: 'coupon', name: 'Delete Coupon', selected: false },
    { section: 'coupon', name: 'Online', selected: false },
    { section: 'coupon', name: 'Offline', selected: false },

    // Membership Permissions
    { section: 'membership', name: 'Add Member', selected: false },
    { section: 'membership', name: 'Edit Member', selected: false },
    { section: 'membership', name: 'Card Status', selected: false },
    { section: 'membership', name: 'Add Package', selected: false },
    { section: 'membership', name: 'Export Package', selected: false },
    { section: 'membership', name: 'Import Card', selected: false },
    { section: 'membership', name: 'Active Card', selected: false },
    { section: 'membership', name: 'Pending Card', selected: false },
    { section: 'membership', name: 'Expired Card', selected: false },
    { section: 'membership', name: 'Renewed Card', selected: false },
    { section: 'membership', name: 'Print Invoice', selected: false },
    { section: 'membership', name: 'Print Card', selected: false },

    // Appointment Permissions
    { section: 'appointment', name: 'View Appointments', selected: false },
    { section: 'appointment', name: 'Edit Appointments', selected: false },
    { section: 'appointment', name: 'Delete Appointments', selected: false },

    // Pet Service Permissions
    { section: 'petService', name: 'Add Pet to Adoption', selected: false },
    { section: 'petService', name: 'Edit Pet Adoption', selected: false },
    { section: 'petService', name: 'Delete Adoption Pet', selected: false },
    { section: 'petService', name: 'Mark Pet Adopted', selected: false },
    { section: 'petService', name: 'Add Lost Pet', selected: false },
    { section: 'petService', name: 'Edit Lost Pet', selected: false },
    { section: 'petService', name: 'Mark Lost Pet as Found', selected: false },
    { section: 'petService', name: 'Add Pet To Sell', selected: false },
    { section: 'petService', name: 'Add Pet To Mate', selected: false },

    // Report Permissions
    { section: 'report', name: 'Report Test', selected: false },

    // Notifications & Emails Permissions
    { section: 'notiEmail', name: 'Notification and Email Test', selected: false },

    // Blog Permissions
    { section: 'blog', name: 'Add Blog', selected: false },
    { section: 'blog', name: 'Edit Blog', selected: false },
    { section: 'blog', name: 'Delete Blog', selected: false },
    { section: 'blog', name: 'Online', selected: false },
    { section: 'blog', name: 'Offline', selected: false }
  ];

  get filteredPermissions() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.allPermissions;

    return this.allPermissions.filter(p =>
      p.name.toLowerCase().includes(query)
    );
  }

  toggleSection(section: string): void {
    if (this.sectionVisibility[section] !== undefined) {
      this.sectionVisibility[section] = !this.sectionVisibility[section];
    }
  }

  isSectionVisible(sectionName: string): boolean {
    // Show section if search is empty or there are permissions for that section
    return this.searchQuery.trim() === '' || this.getPermissionsForSection(sectionName).length > 0;
  }

  sectionRowsVisible(): boolean {
    const sections = ['profile', 'user', 'petOwner', 'pet', 'provider', 'samaStore', 'coupon', 'membership', 'appointment', 'petService', 'report', 'notiEmail', 'blog'];
    return sections.some(sectionName => this.isSectionVisible(sectionName));
  }

  getPermissionsForSection(section: string) {
    return this.filteredPermissions.filter(p => p.section === section);
  }

  toggleSelectAll(section: string, checked: boolean): void {
    const permissions = this.getPermissionsForSection(section);
    permissions.forEach(perm => {
      perm.selected = checked;
    });
  }

  isAllSelected(section: string): boolean {
    const permissions = this.getPermissionsForSection(section);
    if (!permissions || permissions.length === 0) return false;
    return permissions.every(perm => perm.selected);
  }

  onSelectAllChange(event: Event, section: string): void {
    const input = event.target as HTMLInputElement;
    this.toggleSelectAll(section, input.checked);
  }
}