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
import { AddPetComponent } from './components/petSection/add-pet/add-pet.component';
import { PackagesListComponent } from './components/packages-section/packages-list/packages-list.component'; 
import { PackagesCreateComponent } from './components/packages-section/packages-create/packages-create.component';
import {OwnerProfileComponent } from './components/petSection/owner-profile/owner-profile.component';
import { AllSuppliersComponent  } from './components/supplier-section/all-suppliers/all-suppliers.component'; // for supplier section / all supplier
import { CreateSupplierComponent  } from './components/supplier-section/create-supplier/create-supplier.component'; // for supplier section / create supplier
import { CreateOrderComponent  } from './components/supplier-section/create-order/create-order.component'; // for supplier section / create order 
import { CreateProductComponent  } from './components/supplier-section/create-product/create-product.component'; // for supplier section / create product
import { OrdersComponent } from './components/orders/collar-orders/orders.component';
import { SamaOrdersComponent } from './components/orders/sama-orders/sama-orders.component';
import { SamaProductsComponent } from './components/orders/sama-products/sama-products.component';
import { CouponListComponent } from './components/provider-section/provider-coupon/coupon-list/coupon-list.component';
import { OrderInfoComponent } from './components/orders/order-info/order-info.component';
import { CustomerOrdersComponent } from './components/orders/cust-orders/cust-orders.component';
import { PetNavigationComponent  } from './components/pet-services-section/pet-navigation/pet-navigation.component'; // for pet service section
import { AdoptionComponent  } from './components/pet-services-section/adoption/adoption.component'; // for pet service section adoption
import { MatingComponent  } from './components/pet-services-section/mating/mating.component'; // for pet service section mating
import { LostComponent  } from './components/pet-services-section/lost/lost.component'; // for pet service section lost
import { SellComponent  } from './components/pet-services-section/sell/sell.component'; // for pet service section sell
import { CreateInvoiceComponent  } from './components/invoice-section/create-invoice/create-invoice.component'; // for invoice section / create invoice 
import { InvoiceHistoryComponent  } from './components/invoice-section/invoice-history/invoice-history.component'; // for invoice section / invoice 
import { InvoiceComponent  } from './components/invoice-section/invoice/invoice.component';
import { BlogsComponent  } from './components/blog-section/blogs/blogs.component'; // for pet blog section / blogs

import { CreatePostComponent  } from './components/blog-section/create-post/create-post.component'; // for pet blog section / create post

export const routes: Routes = [

  {path:'',redirectTo:"list-all-provider",pathMatch: 'full'},

  {
    path:'list-all-provider',
    component:AllProviderListComponent
  },
  {
    
    path: 'add-new-provider',
    component: ProviderComponent,
    children: [
      { path: '', redirectTo: 'gallary', pathMatch: 'full' }, // Default child route
      { path: 'gallary', component: ProviderGallaryComponent }, // Gallery component
      { path: 'service', component: ProviderServiceComponent }, // Service component
      { path: 'products', component: ProviderProductComponent }, // Products component
      { path: 'doctors-and-booking', component: ProviderAddDoctorComponent }, // Doctors and Booking component
      { path: 'category', component: ProviderCategoryComponent }, // Category component
    ],
  },
  {path: "Docotor-Booking", component: ProviderDoctorComponent},


  {path:"add-pet-owner",component:AddNewOwnerComponent, children: [
    { path: '', redirectTo: 'membership', pathMatch: 'full' }, // Default child route
    { path: 'membership', component: MemberShipComponent }, // Gallery component
    { path: 'discountUsage', component: DiscountUsageComponent }, // Service component
    { path: 'other', component: OtherComponent }, // Products component
    { path: 'history', component: HistoryComponent }, // Doctors and Booking component
  ]},
  {path:"pet-owner-list",component:PetOwnerListComponent},

  // i think you specify the compinent namae in import 
  { path: 'add-pet', component: AddPetComponent },
  { path: 'owner-profile', component: OwnerProfileComponent },


  //packages
  { path: 'packages-list', component: PackagesListComponent },
  { path: 'packages-create', component: PackagesCreateComponent },

  { path: 'owner-profile/:id', component: OwnerProfileComponent },




  // Supplier Section
  { path: 'all-suppliers', component:AllSuppliersComponent},
  	 { path: 'create-supplier', component:CreateSupplierComponent},
  	 { path: 'create-order', component:CreateOrderComponent},
  	 { path: 'create-product', component:CreateProductComponent},


     { path: 'orders' , component: OrdersComponent},
     { path: 'sama-orders' , component: SamaOrdersComponent},
     { path: 'sama-products' , component: SamaProductsComponent},
     { path: 'coupon-list' , component: CouponListComponent},
     { path: 'order-info/:id', component: OrderInfoComponent },
     { path: 'cust-orders/:id', component: CustomerOrdersComponent },
     

  //for pet section: pet navigation:
  {
    path: 'view-pet-section',
    component: PetNavigationComponent,
    children: [
      { path: '', redirectTo: 'adoption', pathMatch: 'full' }, // Default child route
      { path: 'adoption', component: AdoptionComponent },
      { path: 'mating', component: MatingComponent },
      { path: 'lost', component: LostComponent },
      { path: 'sell', component: SellComponent },
    ],
  },

  { path: 'create-invoice', component:CreateInvoiceComponent},
  { path: 'invoice-history', component:InvoiceHistoryComponent},
  { path: 'invoice', component:InvoiceComponent},
  { path: 'invoice/:id', component: InvoiceComponent },


  //path for blogs pages
  { path: "all-blogs", component:BlogsComponent },
  { path: "create-post", component:CreatePostComponent},
  { path: 'create-post/:id', component: CreatePostComponent },
     

];
