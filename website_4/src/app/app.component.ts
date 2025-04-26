import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { UserProfileComponent } from '../app/admin/sub-components/user-profile/user-profile.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AddNotificationComponent } from './admin/sub-components/add-notification/add-notification.component';
import { AddPackageComponent } from './admin/sub-components/add-package/add-package.component';
import { AddProductComponent } from './admin/sub-components/add-product/add-product.component';
import { AddRoleComponent } from './admin/sub-components/add-role/add-role.component';
import { AddAdminComponent } from './admin/sub-components/add-admin/add-admin.component';
import { AdoptionLostMateComponent } from './admin/sub-components/adoption-lost-mate/adoption-lost-mate.component';
import { BlogDashboardComponent } from './admin/sub-components/blog-dashboard/blog-dashboard.component';
import { BlogFormComponent } from './admin/sub-components/blog-form/blog-form.component';
import { CategoriesComponent } from './admin/sub-components/categories/categories.component';
import { CategoryListComponent } from './admin/sub-components/category-list/category-list.component';
import { DashboardRolesManagementComponent } from './admin/sub-components/dashboard-roles-management/dashboard-roles-management.component';
import { HospitalServicesComponent } from './admin/sub-components/hospital-services/hospital-services.component';
import { NofiticationComponent } from './admin/sub-components/nofitication/nofitication.component';
import { OrderCollarComponent } from './admin/sub-components/order-collar/order-collar.component';
import { OrderDashboardComponent } from './admin/sub-components/order-dashboard/order-dashboard.component';
import { OrderListComponent } from './admin/sub-components/order-list/order-list.component';
import { OwnerProfileComponent } from './admin/sub-components/owner-profile/owner-profile.component';
import { PackagesListingComponent } from './admin/sub-components/packages-listing/packages-listing.component';
import { PermissionsListComponent } from './admin/sub-components/permissions-list/permissions-list.component';
import { PetCareComponent } from './admin/sub-components/pet-care/pet-care.component';
import { PetProfileComponent } from './admin/sub-components/pet-profile/pet-profile.component';
import { ProductListComponent } from './admin/sub-components/product-list/product-list.component';
import { RolesPermissionsComponent } from './admin/sub-components/roles-permissions/roles-permissions.component';
import { ServicesPageComponent } from './admin/sub-components/services-page/services-page.component';
import { SetupPetProfileComponent } from './admin/sub-components/setup-pet-profile/setup-pet-profile.component';
import { SetupProfileComponent } from './admin/sub-components/setup-profile/setup-profile.component';
import { TransferOwnershipFormComponent } from './admin/sub-components/transfer-ownership-form/transfer-ownership-form.component';
import { ViewOrderComponent } from './admin/sub-components/view-order/view-order.component';
import { AdminAuthService } from './services/adminAuth.service';
import { NavbarComponent } from './user/sub-components/navbar/navbar.component';
import { OtpComponent } from './user/sub-components/otp/otp.component';
import { UserMainComponent } from './user/user-main-component/user-main-component.component';
// import { AdminMainComponent } from './admin/admin-main/admin-main.component';
// import { NavbarComponent } from './admin/navbar/navbar.component';
// import { PetProfileComponent } from './admin/pet-profile/pet-profile.component';
// import { UserProfileComponent } from './admin/user-profile/user-profile.component';
// import { AdminAuthService } from './services/adminAuth.service';
// import { UserMainComponent } from './user/user-main-component/user-main-component.component';
// // import { AllProvidersComponent } from './all-providers/all-providers.component';
// import { AddPackageComponent } from './admin/add-package/add-package.component';
// import { AddProductComponent } from './admin/add-product/add-product.component';
// import { AddRoleComponent } from './admin/add-role/add-role.component';
// import { AddUserComponent } from './admin/add-user/add-user.component';
// import { CategoriesComponent } from './admin/categories/categories.component';
// import { CategoryListComponent } from './admin/category-list/category-list.component';
// import { DashboardRolesManagementComponent } from './admin/dashboard-roles-management/dashboard-roles-management.component';
// import { HospitalServicesComponent } from './admin/hospital-services/hospital-services.component';
// import { OrderListComponent } from './admin/order-list/order-list.component';
// import { PackagesListingComponent } from './admin/packages-listing/packages-listing.component';
// import { PermissionsListComponent } from './admin/permissions-list/permissions-list.component';
// import { PetCareComponent } from './admin/pet-care/pet-care.component';
// import { ProductListComponent } from './admin/product-list/product-list.component';
// import { RolesPermissionsComponent } from './admin/roles-permissions/roles-permissions.component';
// import { ViewOrderComponent } from './admin/view-order/view-order.component';
// import { ServicesComponent } from './services/services.component';
// import { AllProvidersComponent } from "./services/all-providers/all-providers.component";
// import { AddNotificationComponent } from './admin/add-notification/add-notification.component';
// import { AdoptionLostMateComponent } from './admin/adoption-lost-mate/adoption-lost-mate.component';
// import { BlogDashboardComponent } from './admin/blog-dashboard/blog-dashboard.component';
// import { BlogFormComponent } from './admin/blog-form/blog-form.component';
// import { NofiticationComponent } from './admin/nofitication/nofitication.component';
// import { OrderCollarComponent } from './admin/order-collar/order-collar.component';
// import { OrderDashboardComponent } from './admin/order-dashboard/order-dashboard.component';
// import { OtpComponent } from './admin/otp/otp.component';
// import { OwnerProfileComponent } from './admin/owner-profile/owner-profile.component';
// import { SetupPetProfileComponent } from './admin/setup-pet-profile/setup-pet-profile.component';
// import { SetupProfileComponent } from './admin/setup-profile/setup-profile.component';
// import { TransferOwnershipFormComponent } from './admin/transfer-ownership-form/transfer-ownership-form.component';
import { CouponPageComponent } from './provider/sub-components/coupon-page/coupon-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CouponPageComponent,
    TransferOwnershipFormComponent,
    CommonModule,
    RouterOutlet,
    RouterModule,
    UserMainComponent,
    AdminMainComponent,
    NavbarComponent,
    UserProfileComponent,
    PetProfileComponent,
    PetCareComponent,
    ServicesPageComponent,
    HospitalServicesComponent,
    AddPackageComponent,
    PackagesListingComponent,
    ViewOrderComponent,
    CategoriesComponent,
    OrderListComponent,
    CategoryListComponent,
    DashboardRolesManagementComponent,
    AddRoleComponent,
    AddAdminComponent,
    RolesPermissionsComponent,
    AddProductComponent,
    PermissionsListComponent,
    ProductListComponent,
    // AllProvidersComponent,
    OtpComponent,
    BlogFormComponent,
    NofiticationComponent,
    OrderDashboardComponent,
    BlogDashboardComponent,
    AddNotificationComponent,
    NofiticationComponent,
    OrderCollarComponent,
    AdoptionLostMateComponent,
    OwnerProfileComponent,
    SetupProfileComponent,
    SetupPetProfileComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showNavbar = false;
  showOwnerProfilePage = false;
  // nav = true;
  title = 'website';

  constructor(
    private router: Router,
    private adminAuthService: AdminAuthService,
  ) {}

  ngOnInit() {
    this.showNavbar = false;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.url === '/';
      }
    });
  }

  public showUserProfile: boolean = false;
  public showPetProfile: boolean = false;
  public showAllProviders: boolean = false;
  public showPetCare: boolean = false;
  public showServices: boolean = false;
  public showHospitalServices: boolean = false;
  public showAddPackage: boolean = false; // New state for AddPackage
  public showPackagesListing: boolean = false;
  public showViewOrder: boolean = false;
  public showCategories: boolean = false;
  public showOrderList: boolean = false;
  public showCategoryList: boolean = false;
  public showDashboardRolesManagement: boolean = false;
  public showAddRole: boolean = false;
  public showAddUser: boolean = false;
  public showRolesPermissions: boolean = false;
  public showAddProductComponent: boolean = false;
  public showPermissionsList: boolean = false;
  public showProductList: boolean = false;
  // public showProductList: boolean = false;
  public showOtp: boolean = false;
  public showSetupProfile: boolean = false;
  public showsetupProfile: any;
  public showblogForm: boolean = false;
  public showNofitication: boolean = false;
  public showOrderDashboard: boolean = false;
  public showBlogDashboard: boolean = false;
  public showAddNotification: boolean = false;
  public showOrderCollar: boolean = false;
  public showmain: boolean = false;
  public showAdoptionLostMate: boolean = false;
  public showTransferOwnershipForm: boolean = false;
  // public showOtp: boolean = false;
  public showSetupPetProfile: boolean = false;
  public CouponPageComponent: boolean = false;

  hideNavbar() {
    this.showNavbar = false;
  }

  private resetAll() {
    this.CouponPageComponent = false;
    this.showAdoptionLostMate = false;
    this.showOtp = false;
    this.showNofitication = false;
    this.showCategoryList = false;
    this.showViewOrder = false;
    this.showCategories = false;
    this.showUserProfile = false;
    this.showPetProfile = false;
    this.showAllProviders = false;
    this.showPetCare = false;
    this.showServices = false;
    this.showHospitalServices = false;
    this.showAddPackage = false;
    this.showPackagesListing = false;
    this.showOrderList = false;
    this.showDashboardRolesManagement = false;
    this.showAddRole = false;
    this.showAddUser = false;
    this.showRolesPermissions = false;
    this.showAddProductComponent = false;
    this.showPermissionsList = false;
    this.showProductList = false;
    this.showblogForm = false;
    this.showOrderDashboard = false;
    this.showBlogDashboard = false;
    this.showmain = false;
    this.showAddNotification = false;
    this.showTransferOwnershipForm = false;
    this.showOwnerProfilePage = false;
    this.showSetupPetProfile = false;
  }

  CouponPageComponents() {
    this.resetAll();
    this.CouponPageComponent = true;
  }
  toggleTransferOwnershipFormComponent() {
    this.resetAll();
    this.showTransferOwnershipForm = true;
  }
  toggleUserProfile() {
    this.resetAll();
    this.showUserProfile = true;
  }

  togglePetProfile() {
    this.resetAll();
    this.showPetProfile = true;
  }

  toggleAdoptionLostMate() {
    this.resetAll();
    this.showAdoptionLostMate = true;
  }

  toggleAllProviders() {
    this.resetAll();
    this.showAllProviders = true;
  }

  togglePetCare() {
    this.resetAll();
    this.showPetCare = true;
  }

  showServicesPage() {
    this.resetAll();
    this.showServices = true;
  }

  toggleHospitalServices() {
    this.resetAll();
    this.showHospitalServices = true;
  }

  toggleAddPackage() {
    this.resetAll();
    this.showAddPackage = true;
  }
  togglePackagesListing() {
    this.resetAll();
    this.showPackagesListing = true;
  }

  toggleViewOrder() {
    this.resetAll();
    this.showViewOrder = true;
  }

  toggleCategories() {
    this.resetAll();
    this.showCategories = true;
  }
  toggleOrderList() {
    this.resetAll();
    this.showOrderList = true;
  }
  // togglenav() {
  //   this.nav = true;
  // }

  toggleCategoryList() {
    this.resetAll();
    this.showCategoryList = true;
  }

  toggleDashboardRolesManagement() {
    // Add this method
    this.resetAll();
    this.showDashboardRolesManagement = true;
  }

  toggleAddRole() {
    this.resetAll();
    this.showAddRole = true;
  }
  toggleAddUser() {
    this.resetAll();
    this.showAddUser = true;
  }
  toggleRolesPermissions() {
    this.resetAll();
    this.showRolesPermissions = true;
  }
  toggleAddProductComponent() {
    this.resetAll();
    this.showAddProductComponent = true;
  }

  togglePermissionsList() {
    this.resetAll();
    this.showPermissionsList = true;
  }
  toggleProductList() {
    this.resetAll();
    this.showProductList = true;
  }

  toggleOtp() {
    this.resetAll();
    this.showOtp = true;
  }
  toggleblogForm() {
    this.resetAll();
    this.showblogForm = true;
  }

  togglenotification() {
    this.resetAll();
    this.showNofitication = true;
  }

  toggleOrderDashboard() {
    this.resetAll();
    this.showOrderDashboard = true;
  }
  toggleBlogDashboard() {
    this.resetAll();
    this.showBlogDashboard = true;
  }
  toggleAddNotification() {
    this.resetAll();
    this.showAddNotification = true;
  }
  toggleOrderCollar() {
    this.resetAll();
    this.showOrderCollar = true;
  }

  showOwnerProfile() {
    this.resetAll();
    this.showOwnerProfilePage = true;
  }

  togglesetupProfile() {
    this.resetAll();
    this.showSetupProfile = true;
  }
  toggleSetupPetProfile() {
    this.resetAll();
    this.showSetupPetProfile = true;
  }
}
