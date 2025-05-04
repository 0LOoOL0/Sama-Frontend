import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AddAdminComponent } from './admin/sub-components/add-admin/add-admin.component';
import { AddNotificationComponent } from './admin/sub-components/add-notification/add-notification.component';
import { AddPackageComponent } from './admin/sub-components/add-package/add-package.component';
import { AddProductComponent } from './admin/sub-components/add-product/add-product.component';
import { AddRoleComponent } from './admin/sub-components/add-role/add-role.component';
import { AdoptionLostMateComponent } from './admin/sub-components/adoption-lost-mate/adoption-lost-mate.component';
import { AllProvidersComponent } from './admin/sub-components/all-providers/all-providers.component';
import { BlogDashboardComponent } from './admin/sub-components/blog-dashboard/blog-dashboard.component'; // Correct import path
import { BlogFormComponent } from './admin/sub-components/blog-form/blog-form.component'; // Correct import path
import { CategoriesComponent } from './admin/sub-components/categories/categories.component';
import { CategoryListComponent } from './admin/sub-components/category-list/category-list.component';
import { CheckoutComponent } from './admin/sub-components/checkout/checkout.component';
import { DashboardRolesManagementComponent } from './admin/sub-components/dashboard-roles-management/dashboard-roles-management.component';
import { DeletionConfirmationComponent } from './admin/sub-components/deletion-confirmation/deletion-confirmation.component';
import { HospitalServicesComponent } from './admin/sub-components/hospital-services/hospital-services.component';
import { NofiticationComponent } from './admin/sub-components/nofitication/nofitication.component';
import { OrderCollarComponent } from './admin/sub-components/order-collar/order-collar.component';
import { OrderDashboardComponent } from './admin/sub-components/order-dashboard/order-dashboard.component';
import { OrderListComponent } from './admin/sub-components/order-list/order-list.component';
import { OurServicesComponent } from './admin/sub-components/our-services/our-services.component';
import { OwnerProfileComponent } from './admin/sub-components/owner-profile/owner-profile.component';
import { PackagesListingComponent } from './admin/sub-components/packages-listing/packages-listing.component';
import { PermissionsListComponent } from './admin/sub-components/permissions-list/permissions-list.component';
import { PetCareComponent } from './admin/sub-components/pet-care/pet-care.component';
import { PetProfileComponent } from './admin/sub-components/pet-profile/pet-profile.component';
import { ProductListComponent } from './admin/sub-components/product-list/product-list.component';
import { RolesPermissionsComponent } from './admin/sub-components/roles-permissions/roles-permissions.component';
import { ServicesPageComponent } from './admin/sub-components/services-page/services-page.component';
import { SetupPetProfileComponent } from './admin/sub-components/setup-pet-profile/setup-pet-profile.component';
import { SubscribeComponent } from './admin/sub-components/subscribe/subscribe.component';
import { TransferOwnershipFormComponent } from './admin/sub-components/transfer-ownership-form/transfer-ownership-form.component';
import { UserProfileComponent } from './admin/sub-components/user-profile/user-profile.component';
import { ViewOrderComponent } from './admin/sub-components/view-order/view-order.component';
import { Error404Component } from './error404/error404.component';
import { ProviderLogSignComponent } from './provider/provider-log-sign/provider-log-sign.component';
import { ProviderLoginComponent } from './provider/provider-login/provider-login.component';
import { ProviderMainComponent } from './provider/provider-main/provider-main.component';
import { SignUpFormComponent } from './provider/sign-up-form/sign-up-form.component';
import { AdApprovalComponent } from './provider/sub-components/ad-approval/ad-approval.component';
import { AdPromoComponent } from './provider/sub-components/ad-promo/ad-promo.component';
import { CheckOutComponent } from './provider/sub-components/check-out/check-out.component';
import { CouponDisComponent } from './provider/sub-components/coupon-dis/coupon-dis.component';
import { CouponDiscountPageComponent } from './provider/sub-components/coupon-discount-page/coupon-discount-page.component';
import { CouponPageComponent } from './provider/sub-components/coupon-page/coupon-page.component';
import { CustomAdDesignPromotionComponent } from './provider/sub-components/custom-ad-design-promotion/custom-ad-design-promotion.component';
import { DeniedComponent } from './provider/sub-components/denied/denied.component';
import { EmailVerificationComponent } from './provider/sub-components/email-verification/email-verification.component';
import { ProductDetailsComponent } from './provider/sub-components/product-details/product-details.component';
import { ProfileComponent } from './provider/sub-components/profile/profile.component';
import { ProviderDashboardComponent } from './provider/sub-components/provider-dashboard/provider-dashboard.component';
import { QrcodeComponent } from './provider/sub-components/qrcode/qrcode.component';
import { SetupComponent } from './provider/sub-components/setup/setup.component';
import { WaitApprovalComponent } from './provider/sub-components/wait-approval/wait-approval.component';
import { LogSignComponent } from './user/log-sign/log-sign.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { ForgetPasswordComponent } from './user/sub-components/forget-password/forget-password.component';
import { NavbarComponent } from './user/sub-components/navbar/navbar.component';
import { OtpComponent } from './user/sub-components/otp/otp.component';
import { ResetPasswordComponent } from './user/sub-components/reset-password/reset-password.component';
import { VetClinicsComponent } from './user/sub-components/vet-clinics/vet-clinics.component';
import { UserMainComponent } from './user/user-main-component/user-main-component.component';
// import { PetProfileComponent } from './provider/sub-components/pet-profile/pet-profile.component';
import { AddProviderComponent } from './admin/sub-components/add-provider/add-provider.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { ProviderSignupComponent } from './provider/provider-signup/provider-signup.component';
import { AccountProfileComponent } from './provider/sub-components/account-profile/account-profile.component';
import { BookingHistoryComponent } from './provider/sub-components/booking-history/booking-history.component';
import { ChoosePetComponent } from './provider/sub-components/choose-pet/choose-pet.component';
import { ProductSelectionComponent } from './provider/sub-components/product-selection/product-selection.component';
import { ProductUploadComponent } from './provider/sub-components/product-upload/product-upload.component';
import { PromotionPageComponent } from './provider/sub-components/promotion-page/promotion-page.component';
import { ProviderOtpComponent } from './provider/sub-components/provider-otp/provider-otp.component';
import { ReadyToLaunchPromotionComponent } from './provider/sub-components/ready-to-launch-promotion/ready-to-launch-promotion.component';
import { WaitForApprovalComponent } from './provider/sub-components/wait-for-approval/wait-for-approval.component';
import { WaitForApproval2Component } from './provider/sub-components/wait-for-approval2/wait-for-approval2.component';
import { VerificationSuccessComponent } from './provider/verification-success/verification-success.component';
import { NotificationsComponent } from './provider/sub-components/notifications/notifications.component';
import { ScannerComponent } from './provider/sub-components/scanner/scanner.component';
import { MyProfileComponent } from './user/sub-components/my-profile/my-profile.component';
import { DiscountHistoryComponent } from './user/sub-components/discount-history/discount-history.component';
import { MyOrdersComponent } from './user/sub-components/my-orders/my-orders.component';
import { PetInfoComponent } from './user/sub-components/pet-info/pet-info.component';
import { ViewDetailsComponent } from './user/sub-components/view-details/view-details.component';
import { ViewDiscountDetailsComponent } from './user/sub-components/view-discount-details/view-discount-details.component';
import { PetHealthConcernComponent } from './user/sub-components/pet-health-concern/pet-health-concern.component';
import { EditPetHealthConcernsComponent } from './user/sub-components/edit-pet-health-concern/edit-pet-health-concern.component';
import { PetDocumentComponent } from './user/sub-components/pet-document/pet-document.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { ChoosePetComponent as UserChoosePetComponent } from './user/sub-components/choose-pet/choose-pet.component';
import { ConfirmInformationComponent } from './user/sub-components/confirm-information/confirm-information.component';
import { DiscountDetailsComponent } from './user/sub-components/discount-details/discount-details.component';
import { MarketplacestoreComponent } from './user/sub-components/marketplacestore/marketplacestore.component';
import { ProductDetailsComponent as UserPRoductDetailsComponent } from './user/sub-components/product-details/product-details.component';
import { ProductListComponent as UserProductListComponent } from './user/sub-components/product-list/product-list.component';
import { ShoppingBagComponent } from './user/sub-components/shopping-bag/shopping-bag.component';
import { ReminderformComponent } from './user/sub-components/reminderform/reminderform.component';
import { ReminderlistComponent } from './user/sub-components/reminderlist/reminderlist.component';
import { VetClinicServiceComponent } from './user/sub-components/vet-clinic-service/vet-clinic-service.component';
import { MarketpalceprofileComponent } from './user/sub-components/marketpalceprofile/marketpalceprofile.component';
import { MyCardsComponent } from './user/sub-components/my-cards/my-cards.component';
import { AdoptionProfileComponent } from './user/sub-components/adoption-profile/adoption-profile.component';
import { BlogComponent } from './user/sub-components/blog/blog.component';
import { DiscountsComponent } from './user/sub-components/discounts/discounts.component';
import { LostPetInfoComponent } from './user/sub-components/lost-pet-info/lost-pet-info.component';
import { ShowProductComponent } from './provider/sub-components/show-product/show-product.component';
import { SignupStepsComponent } from './shared/signup-steps/signup-steps.component';
import { CollarMainPageComponent } from './user/sub-components/collar-main-page/collar-main-page.component';
import { CreateOwnerAccountComponent } from './user/sub-components/create-owner-account/create-owner-account.component';
import { CreatePetAccountComponent } from './user/sub-components/create-pet-account/create-pet-account.component';
import { CheckOutComponent as checkout } from './user/sub-components/check-out/check-out.component';
import { MainHomeComponent } from './shared/main-home/main-home.component';
import { OurServicesPageComponent } from './shared/our-services-page/our-services-page.component';
import { AdoptionCenterComponent } from './user/sub-components/adoption-center/adoption-center.component';
import { AdoptionErrorComponent } from './user/sub-components/adoption-error/adoption-error.component';
import { AdoptionListComponent } from './user/sub-components/adoption-list/adoption-list.component';
import { AboutUsComponent } from './user/sub-components/about-us/about-us.component';
import { BookingServicePageComponent } from './user/sub-components/booking-service-page/booking-service-page.component';
import { BookingFormPageComponent } from './user/sub-components/booking-form-page/booking-form-page.component';
import { BlogDetailsPageComponent } from './user/sub-components/blog-details-page/blog-details-page.component';
import { MatingProfileComponent } from './user/sub-components/mating-profile/mating-profile.component';
import { LostPetProfileComponent } from './user/sub-components/lost-pet-profile/lost-pet-profile.component';
import { StatusTrackerPageComponent } from './user/sub-components/status-tracker-page/status-tracker-page.component';
import { FaqPageComponent } from './user/sub-components/faq-page/faq-page.component';
import { FeaturesPageComponent } from './user/sub-components/features-page/features-page.component';
import { FavouritePageComponent } from './user/sub-components/favourite-page/favourite-page.component';
import { DiscountPageComponent } from './user/sub-components/discount-page/discount-page.component';
import { LostPetListingComponent } from './user/sub-components/lost-pet-listing/lost-pet-listing.component';
import { LostPetComponent } from './user/sub-components/lost-pet/lost-pet.component';
import { LostPetFormComponent } from './user/sub-components/lost-pet-form/lost-pet-form.component';
import { BeAMemberComponent } from './user/sub-components/be-a-member/be-a-member.component';
import { TransferDeniedComponent } from './user/sub-components/transfer-denied/transfer-denied.component';
import { TransferOwnershipStep1Component } from './user/sub-components/transfer-ownership-step1/transfer-ownership-step1.component';
import { TransferOwnershipStep2Component } from './user/sub-components/transfer-ownership-step2/transfer-ownership-step2.component';
import { TransferOwnershipStep3Component } from './user/sub-components/transfer-ownership-step3/transfer-ownership-step3.component';
import { BeAPartnerComponent } from './user/sub-components/be-a-partner/be-a-partner.component';
import { SubscribeComponent as UserSub } from './user/sub-components/subscribe/subscribe.component';
import { MateListingComponent } from './user/sub-components/mate-listing/mate-listing.component';
import { MateListingErrorComponent } from './user/sub-components/mate-listing-error/mate-listing-error.component';
import { MarketplaceComponent } from './user/sub-components/marketplace/marketplace.component';
import { OrderDetailComponent } from './user/sub-components/order-detail/order-detail.component';
import { SamaStoreComponent } from './user/sub-components/sama-store/sama-store.component';
import { ServiceDetailsComponent } from './user/sub-components/service-details/service-details.component';

//new user profile
import { NewUserProfileComponent } from './user/sub-components/new-user-profile/new-user-profile.component';
import { UserProfileNavComponent } from './user/sub-components/new-user-profile/user-profile-nav/user-profile-nav.component';
import { NewMyProfileComponent } from './user/sub-components/new-user-profile/new-my-profile/new-my-profile.component';
import { NewMyPetsComponent } from './user/sub-components/new-user-profile/new-my-pets/new-my-pets.component';
import { NewMyOrdersComponent } from './user/sub-components/new-user-profile/new-my-orders/new-my-orders.component';
import { NewMyAppointmentsComponent } from './user/sub-components/new-user-profile/new-my-appointments/new-my-appointments.component';
import { NewDiscountHistoryComponent } from './user/sub-components/new-user-profile/new-discount-history/new-discount-history.component';
import { NewStatusTrackerComponent } from './user/sub-components/new-user-profile/new-status-tracker/new-status-tracker.component';
import { UserSideInfoComponent } from './user/sub-components/new-user-profile/user-side-info/user-side-info.component';
import { NewPetInfoComponent } from './user/sub-components/new-user-profile/new-my-pets/new-pet-info/new-pet-info.component';
import { NewHealthConcernComponent } from './user/sub-components/new-user-profile/new-my-pets/new-health-concern/new-health-concern.component';
import { EditHealthComponent } from './user/sub-components/new-user-profile/edit-health/edit-health.component';
import { NewPetDocumentsComponent } from './user/sub-components/new-user-profile/new-my-pets/new-pet-documents/new-pet-documents.component';
import { NewDiscountDetailsComponent } from './user/sub-components/new-user-profile/new-discount-details/new-discount-details.component';
import { DocumentUploadComponent } from './user/sub-components/document-upload/document-upload.component';

export const routes: Routes = [
  { path: 'home', component: MainHomeComponent },
  { path: 'our-services', component: OurServicesPageComponent },

  {
    path: 'user-main-component',
    component: UserMainComponent,
    children: [
      { path: 'error404', component: Error404Component },
      //User routes
      { path: 'user-login', component: LoginComponent },
      { path: 'user-log-sign', component: LogSignComponent },
      { path: 'user-signup', component: SignupComponent },
      { path: 'forgetpassword', component: ForgetPasswordComponent },
      { path: 'resetpassword', component: ResetPasswordComponent },
      { path: 'otp', component: OtpComponent },
      { path: 'navbar', component: NavbarComponent },
      { path: 'providers', component: VetClinicsComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'my-orders', component: MyOrdersComponent },
      { path: 'order-detail/:id', component: OrderDetailComponent },
      { path: 'discount-history', component: DiscountHistoryComponent },
      { path: 'pet-info', component: PetInfoComponent },
      { path: 'pet-health-concern', component: PetHealthConcernComponent },
      { path: 'edit-pet-health-concern', component: EditPetHealthConcernsComponent },
      { path: 'pet-document', component: PetDocumentComponent },
      { path: 'view-details', component: ViewDetailsComponent },
      { path: 'view-discount-details', component: ViewDiscountDetailsComponent },
      { path: 'choose-pet', component: UserChoosePetComponent },
      { path: 'confirm-information', component: ConfirmInformationComponent },
      { path: 'discount-details', component: DiscountDetailsComponent },
      { path: 'market-place', component: MarketplacestoreComponent },
      { path: 'product-details/:id', component: UserPRoductDetailsComponent },
      { path: 'service-details/:id', component: ServiceDetailsComponent },

      { path: 'product-list', component: UserProductListComponent },
      { path: 'shopping-bag', component: ShoppingBagComponent },
      { path: 'reminder-form', component: ReminderformComponent },
      { path: 'reminder-list', component: ReminderlistComponent },
      { path: 'providers/:id', component: VetClinicServiceComponent },
      { path: 'market-profile', component: MarketpalceprofileComponent },
      { path: 'my-cards', component: MyCardsComponent },
      { path: 'adopt-profile/:id', component: AdoptionProfileComponent },
      { path: 'blogs', component: BlogComponent },
      { path: 'discounts', component: DiscountsComponent },
      { path: 'find_pet/:code', component: LostPetInfoComponent },
      { path: 'create-owner-profile', component: CreateOwnerAccountComponent },
      { path: 'create-pet-profile', component: CreatePetAccountComponent },
      { path: 'pet/edit/:id', component: CreatePetAccountComponent },
      { path: 'collar-main', component: CollarMainPageComponent },
      { path: 'checkout', component: checkout },
      { path: 'adoption-center', component: AdoptionCenterComponent },
      { path: 'adoption-error', component: AdoptionErrorComponent },
      { path: 'adoption-list', component: AdoptionListComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'booking-service', component: BookingServicePageComponent },
      { path: 'booking-form', component: BookingFormPageComponent },
      { path: 'blog-details', component: BlogDetailsPageComponent },
      { path: 'mating-profile', component: MatingProfileComponent },
      { path: 'lost-pet-profile', component: LostPetProfileComponent },
      { path: 'status-tracker', component: StatusTrackerPageComponent },
      { path: 'faq', component: FaqPageComponent },
      { path: 'features', component: FeaturesPageComponent },
      { path: 'favourites', component: FavouritePageComponent },
      { path: 'discounts', component: DiscountPageComponent },
      { path: 'lost-pet-list', component: LostPetListingComponent },
      { path: 'lost-pet', component: LostPetComponent },
      { path: 'lost-pet-form', component: LostPetFormComponent },
      { path: 'be-member', component: BeAMemberComponent },
      { path: 'transfer-denied', component: TransferDeniedComponent },
      { path: 'transfer-1', component: TransferOwnershipStep1Component },
      { path: 'transfer-2', component: TransferOwnershipStep2Component },
      { path: 'transfer-3', component: TransferOwnershipStep3Component },
      { path: 'be-partner', component: BeAPartnerComponent },
      { path: 'subscribe', component: UserSub },
      { path: 'mate-list', component: MateListingComponent },
      { path: 'mate-list-error', component: MateListingErrorComponent },
      { path: 'sama-store', component: SamaStoreComponent },

      //new user profile 
      {
        path: 'new-user-profile',
        component: NewUserProfileComponent,
        children: [
          { path: 'user-side-info', component: UserSideInfoComponent },
          { path: 'user-profile-nav', component: UserProfileNavComponent },
          { path: '', redirectTo: 'new-my-profile', pathMatch: 'full' },
          { path: 'new-my-profile', component: NewMyProfileComponent, pathMatch: 'full' },
          {
            path: 'new-my-pets', component: NewMyPetsComponent, children: [
              { path: '', redirectTo: 'new-pet-info', pathMatch: 'full' },
              { path: 'new-pet-info', component: NewPetInfoComponent },
              { path: 'new-pet-documents', component: NewPetDocumentsComponent },
              { path: 'new-health-concern', component: NewHealthConcernComponent },
            ]
          },

          { path: 'document-upload', component: DocumentUploadComponent},
          { path: 'edit-health', component: EditHealthComponent},
          { path: 'new-my-orders', component: NewMyOrdersComponent },
          { path: 'new-my-appointments', component: NewMyAppointmentsComponent },
          { path: 'new-discount-history', component: NewDiscountHistoryComponent },
          { path: 'new-discount-details', component: NewDiscountDetailsComponent },
          { path: 'new-status-tracker', component: NewStatusTrackerComponent }
        ]
      },
    ],
  },
  { path: 'adminLogin', component: AdminLoginComponent },
  {
    path: 'admin-main',
    component: AdminMainComponent,
    canActivate: [AdminAuthGuard], // Protect admin routes
    children: [
      { path: 'error404', component: Error404Component },
      //Admin routes
      { path: 'userprofile', component: UserProfileComponent },
      { path: 'petprofile', component: PetProfileComponent },
      { path: 'petcare', component: PetCareComponent },
      { path: 'services', component: ServicesPageComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'subscribe', component: SubscribeComponent },
      { path: 'hospitalservice', component: HospitalServicesComponent },
      { path: 'addpackage', component: AddPackageComponent },
      { path: 'packagelist', component: PackagesListingComponent },
      { path: 'vieworder', component: ViewOrderComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'orderlist', component: OrderListComponent },
      { path: 'setup-petprofile', component: SetupPetProfileComponent },
      { path: 'setup-petprofile', component: SetupPetProfileComponent },
      {
        path: 'deletionConfirmation',
        component: DeletionConfirmationComponent,
      },
      { path: 'categorylist', component: CategoryListComponent },
      { path: 'dashboardroles', component: DashboardRolesManagementComponent },
      { path: 'addrole', component: AddRoleComponent },
      { path: 'addadmin', component: AddAdminComponent },
      { path: 'add-provider', component: AddProviderComponent },
      { path: 'rolespermission', component: RolesPermissionsComponent },
      { path: 'addproduct', component: AddProductComponent },
      { path: 'permissionlist', component: PermissionsListComponent },
      { path: 'productlist', component: ProductListComponent },
      { path: 'otp', component: OtpComponent },
      { path: 'our-services', component: OurServicesComponent },
      { path: 'notification', component: NofiticationComponent },
      { path: 'orderdashboard', component: OrderDashboardComponent },
      { path: 'blogdashboard', component: BlogDashboardComponent },
      { path: 'blog-form', component: BlogFormComponent },
      { path: 'blogs', component: BlogDashboardComponent },
      { path: 'addnotification', component: AddNotificationComponent },
      { path: 'ordercollar', component: OrderCollarComponent },
      { path: 'allproviders', component: AllProvidersComponent },
      { path: 'adoption-lost-mate', component: AdoptionLostMateComponent },
      { path: 'owner-profile/:owner-id', component: OwnerProfileComponent },
      {
        path: 'transfer-ownership-form',
        component: TransferOwnershipFormComponent,
      },
    ],
  },
  {
    path: 'provider-main',
    component: ProviderMainComponent,
    children: [
      { path: 'signup-steps', component: SignupStepsComponent },
      { path: 'provider-signup', component: ProviderSignupComponent },
      { path: 'provider-otp', component: ProviderOtpComponent },
      { path: 'verification-success', component: VerificationSuccessComponent },
      { path: 'error404', component: Error404Component },
      //Provider routes
      { path: 'provider-login', component: ProviderLoginComponent },
      { path: 'provider-log-sign', component: ProviderLogSignComponent },
      { path: 'provider-sign-up-form', component: SignUpFormComponent },
      { path: 'coupon-discount', component: CouponDiscountPageComponent },
      {
        path: 'custom-ad-design-promotion',
        component: CustomAdDesignPromotionComponent,
      },
      { path: 'email-verification', component: EmailVerificationComponent },
      { path: 'product-selection', component: ProductSelectionComponent },
      { path: 'product-upload', component: ProductUploadComponent },
      { path: 'promotion', component: PromotionPageComponent },
      {
        path: 'ready-to-launch-promotion',
        component: ReadyToLaunchPromotionComponent,
      },
      { path: 'wait-for-approval', component: WaitForApprovalComponent },
      { path: 'wait-for-approval2', component: WaitForApproval2Component },
      { path: 'denied', component: DeniedComponent },
      { path: 'qrcode/:id', component: QrcodeComponent },
      { path: 'ad-promo', component: AdPromoComponent },
      { path: 'coupon-dis', component: CouponDisComponent },
      { path: 'wait-approval', component: WaitApprovalComponent },
      { path: 'ad-approval', component: AdApprovalComponent },
      { path: 'verification', component: EmailVerificationComponent },
      { path: 'provider-otp', component: ProviderOtpComponent },
      { path: 'setup', component: SetupComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'booking-history', component: BookingHistoryComponent },
      { path: 'product-details', component: ProductDetailsComponent },
      { path: 'choose-pet', component: ChoosePetComponent },
      { path: 'account-profile', component: AccountProfileComponent },
      { path: 'coupon-page', component: CouponPageComponent },
      { path: 'check-out', component: CheckOutComponent },
      { path: 'provider-dashboard', component: ProviderDashboardComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'scanner', component: ScannerComponent },
      { path: 'show-product', component: ShowProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }


