import { Routes } from '@angular/router';
import { ProviderComponent } from './components/provider-section/provider/provider.component';
import { ProviderGallaryComponent } from './components/provider-section/provider-gallary/provider-gallary.component';
import { ProviderServiceComponent } from './components/provider-section/provider-service/provider-service.component';
import { ProviderProductComponent } from './components/provider-section/provider-product/provider-product.component';
import { ProviderDoctorComponent } from './components/provider-section/provider-doctor/provider-doctor.component';
import { ProviderCategoryComponent } from './components/provider-section/provider-category/provider-category.component';
import { AllProviderListComponent } from './components/provider-section/all-provider-list/all-provider-list.component';
import { ProviderAddDoctorComponent } from './components/provider-section/provider-add-doctor/provider-add-doctor.component';
import { AddNewOwnerComponent } from './components/petSection/add-new-owner/add-new-owner.component';
import { MemberShipComponent } from './components/petSection/member-ship/member-ship.component';
import { DiscountUsageComponent } from './components/petSection/discount-usage/discount-usage.component';
import { OtherComponent } from './components/petSection/other/other.component';
import { HistoryComponent } from './components/petSection/history/history.component';
import { PetOwnerListComponent } from './components/petSection/pet-owner-list/pet-owner-list.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AllPetListComponent } from './components/petSection/all-pet-list/all-pet-list.component';
import { SamaMainComponent } from './components/provider-section/SamaStoreSection/sama-main/sama-main.component';
import { SamaCardComponent } from './components/membershipSection/sama-card/sama-card.component';
import { ProviderDetailsComponent } from './components/provider-section/provider-details/provider-details.component';
import { OrdersComponent } from './components/membershipSection/orders/collar-orders/orders.component';
import { OwnerProfileComponent } from './components/petSection/owner-profile/owner-profile.component';
import { SamaOrdersComponent } from './components/membershipSection/orders/sama-orders/sama-orders.component';
import { SamaProductsComponent } from './components/membershipSection/orders/sama-products/sama-products.component';
import { OrderInfoComponent } from './components/membershipSection/orders/order-info/order-info.component';
import { CustomerOrdersComponent } from './components/membershipSection/orders/cust-orders/cust-orders.component';
import { NotificationComponent } from './components/settings/notifications/notification.component';
import { AllNotificationComponent } from './components/settings/all-notifications/all-notification.component';
import { CouponListComponent } from './components/provider-section/provider-coupon/coupon-list/coupon-list.component';
import { AllEmailComponent } from './components/settings/all-email/all-email.component';
import { EmailComponent } from './components/settings/email/email.component';
import { AccountComponent } from './components/settings/account/account.component';
import { CouponsComponent } from './components/provider-section/provider-coupon/coupons/coupons.component';
import { InvoiceComponent } from './components/settings/invoice/invoice.component';
import { CardComponent } from './components/petSection/owner-profile/card/card.component';

export const routes: Routes = [

  // {path:'',redirectTo:"list-all-provider",pathMatch: 'full'},
  { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },

  { path:'list-all-provider', component:AllProviderListComponent },
  
  { path: 'add-new-provider',
    component: ProviderComponent,
    children: [
      { path: '', redirectTo: 'gallary', pathMatch: 'full' }, // Default child route
      { path: 'gallary', component: ProviderGallaryComponent }, // Gallery component
      { path: 'service', component: ProviderServiceComponent }, // Service component
      { path: 'products', component: ProviderProductComponent }, // Products component
      { path: 'doctors-and-booking', component: ProviderAddDoctorComponent }, // Doctors and Booking component
      { path: 'category', component: ProviderCategoryComponent }, // Category component
      { path: 'coupons', component: CouponsComponent }, // Category component
    ],
  },
  { path: "Docotor-Booking", component: ProviderDoctorComponent},
  {
    path:"add-pet-owner",component:AddNewOwnerComponent, children: [
    { path: '', redirectTo: 'membership', pathMatch: 'full' }, // Default child route
    { path: 'membership', component: MemberShipComponent }, // Gallery component
    { path: 'discountUsage', component: DiscountUsageComponent }, // Service component
    { path: 'other', component: OtherComponent }, // Products component
    { path: 'history', component: HistoryComponent }, // Doctors and Booking component
    ]
  },
  { path: 'owner-profile/:id', component: OwnerProfileComponent },
  
  { path:"pet-owner-list",component:PetOwnerListComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'all-pet-list', component: AllPetListComponent },
  { path: 'sama-main', component: SamaMainComponent },
  { path: 'sama-card' , component: SamaCardComponent},
  { path: 'provider-details' , component: ProviderDetailsComponent},
  { path: 'orders' , component: OrdersComponent},
  { path: 'sama-orders' , component: SamaOrdersComponent},
  { path: 'sama-products' , component: SamaProductsComponent},
  { path: 'order-info' , component: OrderInfoComponent},
  { path: 'cust-orders' , component: CustomerOrdersComponent},
  { path: 'notification' , component: NotificationComponent},
  { path: 'all-notification' , component: AllNotificationComponent},
  { path: 'coupon-list' , component: CouponListComponent},
  { path: 'all-email' , component: AllEmailComponent},
  { path: 'email' , component: EmailComponent},
  { path: 'account', component: AccountComponent},
  { path: 'invoice', component: InvoiceComponent},
  { path: 'invoice', component: InvoiceComponent},
  { path: 'card' , component: CardComponent}
    ];