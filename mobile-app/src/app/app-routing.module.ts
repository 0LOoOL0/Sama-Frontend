import { NgModule } from '@angular/core';
import { IonicRouteStrategy } from '@ionic/angular';
import { PreloadAllModules, RouterModule, Routes,  RouteReuseStrategy} from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy'; // Import your strategy

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule),
  },

  {
    path: 'account-type',
    loadChildren: () =>
      import('./account-type/account-type.module').then(
        m => m.AccountTypePageModule,
      ),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },

  {
    path: 'add-pet-doc',
    loadChildren: () =>
      import('./add-pet-doc/add-pet-doc.module').then(
        m => m.AddPetDocPageModule,
      ),
  },

  {
    path: 'add-pets',
    loadChildren: () =>
      import('./add-pets/add-pets.module').then(m => m.AddPetsPageModule),
  },

  {
    path: 'adddiv-picture',
    loadChildren: () =>
      import('./adddiv-picture/adddiv-picture.module').then(
        m => m.AdddivPicturePageModule,
      ),
  },

  {
    path: 'adoptionlist',
    loadChildren: () =>
      import('./adoptionlist/adoptionlist.module').then(
        m => m.AdoptionlistPageModule,
      ),
  },

  {
    path: 'adoptionpetinfo/:id',
    loadChildren: () =>
      import('./adoptionpetinfo/adoptionpetinfo.module').then(
        m => m.AdoptionpetinfoPageModule,
      ),
  },

  {
    path: 'adptionform',
    loadChildren: () =>
      import('./adptionform/adptionform.module').then(
        m => m.AdptionformPageModule,
      ),
  },

  {
    path: 'adv',
    loadChildren: () => import('./adv/adv.module').then(m => m.AdvPageModule),
  },

  {
    path: 'approval',
    loadChildren: () =>
      import('./approval/approval.module').then(m => m.ApprovalPageModule),
  },

  {
    path: 'authorized-contacts',
    loadChildren: () =>
      import('./authorized-contacts/authorized-contacts.module').then(
        m => m.AuthorizedContactsPageModule,
      ),
  },

  {
    path: 'bookappointment/:title/:provider',
    loadChildren: () =>
      import('./bookappointment/bookappointment.module').then(
        m => m.BookappointmentPageModule,
      ),
  },

  {
    path: 'booking',
    loadChildren: () =>
      import('./booking/booking.module').then(m => m.BookingPageModule),
  },

  {
    path: 'booking-details',
    loadChildren: () =>
      import('./booking-details/booking-details.module').then(
        m => m.BookingDetailsPageModule,
      ),
  },

  {
    path: 'booking-history',
    loadChildren: () =>
      import('./booking-history/booking-history.module').then(
        m => m.BookingHistoryPageModule,
      ),
  },

  {
    path: 'bookingdetaill',
    loadChildren: () =>
      import('./bookingdetaill/bookingdetaill.module').then(
        m => m.BookingdetaillPageModule,
      ),
  },

  {
    path: 'bookview',
    loadChildren: () =>
      import('./bookview/bookview.module').then(m => m.BookviewPageModule),
  },

  {
    path: 'buycoupon',
    loadChildren: () =>
      import('./buycoupon/buycoupon.module').then(m => m.BuycouponPageModule),
  },

  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.module').then(m => m.CartPageModule),
  },

  {
    path: 'changelanguage',
    loadChildren: () =>
      import('./changelanguage/changelanguage.module').then(
        m => m.ChangelanguagePageModule,
      ),
  },

  {
    path: 'check-out/:type/:total',
    loadChildren: () =>
      import('./check-out/check-out.module').then(m => m.CheckOutPageModule),
  },

  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then(m => m.CheckoutPageModule),
  },

  {
    path: 'congratulation-page/:type',
    loadChildren: () =>
      import('./congratulation-page/congratulation-page.module').then(
        m => m.CongratulationPagePageModule,
      ),
    data: { reuse: false } // Disable route reuse here
  },

  {
    path: 'coupon',
    loadChildren: () =>
      import('./coupon/coupon.module').then(m => m.CouponPageModule),
  },

  {
    path: 'create-your-account',
    loadChildren: () =>
      import('./create-your-account/create-your-account.module').then(
        m => m.CreateYourAccountPageModule,
      ),
  },

  {
    path: 'custom-ad',
    loadChildren: () =>
      import('./custom-ad/custom-ad.module').then(m => m.CustomAdPageModule),
  },

  {
    path: 'dev',
    loadChildren: () => import('./dev/dev.module').then(m => m.DevPageModule),
  },

  {
    path: 'discounts',
    loadChildren: () =>
      import('./discounts/discounts.module').then(m => m.DiscountsPageModule),
  },

  {
    path: 'discounthistory',
    loadChildren: () =>
      import('./discounthistory/discounthistory.module').then(
        m => m.DiscounthistoryPageModule,
      ),
  },

  {
    path: 'drlist',
    loadChildren: () =>
      import('./drlist/drlist.module').then(m => m.DrlistPageModule),
  },

  {
    path: 'drmain',
    loadChildren: () =>
      import('./drmain/drmain.module').then(m => m.DrmainPageModule),
  },

  {
    path: 'drprofile/:id',
    loadChildren: () =>
      import('./drprofile/drprofile.module').then(m => m.DrprofilePageModule),
  },

  {
    path: 'drproudect',
    loadChildren: () =>
      import('./drproudect/drproudect.module').then(
        m => m.DrproudectPageModule,
      ),
  },

  {
    path: 'editprofile',
    loadChildren: () =>
      import('./editprofile/editprofile.module').then(
        m => m.EditprofilePageModule,
      ),
  },

  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then(m => m.FAQPageModule),
  },

  {
    path: 'favorite',
    loadChildren: () =>
      import('./favorite/favorite.module').then(m => m.FavoritePageModule),
  },

  {
    path: 'forgotpass',
    loadChildren: () =>
      import('./forgotpass/forgotpass.module').then(
        m => m.ForgotpassPageModule,
      ),
  },

  {
    path: 'icon-selector',
    loadChildren: () =>
      import('./icon-selector/icon-selector.module').then(
        m => m.IconSelectorPageModule,
      ),
  },

  {
    path: 'language',
    loadChildren: () =>
      import('./language/language.module').then(m => m.LanguagePageModule),
  },

  {
    path: 'lostform',
    loadChildren: () =>
      import('./lostform/lostform.module').then(m => m.LostformPageModule),
  },

  {
    path: 'main/:id',
    loadChildren: () =>
      import('./main/main.module').then(m => m.MainPageModule),
  },

  {
    path: 'main',
    loadChildren: () =>
      import('./main/main.module').then(m => m.MainPageModule),
  },

  {
    path: 'mains',
    loadChildren: () =>
      import('./mains/mains.module').then(m => m.MainsPageModule),
  },

  {
    path: 'mangestore',
    loadChildren: () =>
      import('./mangestore/mangestore.module').then(
        m => m.MangestorePageModule,
      ),
  },

  {
    path: 'marketinfo/:id',
    loadChildren: () =>
      import('./marketinfo/marketinfo.module').then(
        m => m.MarketInfoPageModule,
      ),
  },

  {
    path: 'marketplace',
    loadChildren: () =>
      import('./marketplace/marketplace.module').then(
        m => m.MarketplacePageModule,
      ),
  },

  {
    path: 'my',
    loadChildren: () => import('./my/my.module').then(m => m.MyPageModule),
  },

  {
    path: 'my-card-details',
    loadChildren: () =>
      import('./my-card-details/my-card-details.module').then(
        m => m.MyCardDetailsPageModule,
      ),
  },

  {
    path: 'mypet',
    loadChildren: () =>
      import('./mypet/mypet.module').then(m => m.MypetPageModule),
  },

  {
    path: 'my-store',
    loadChildren: () =>
      import('./my-store/my-store.module').then(m => m.MyStorePageModule),
  },

  {
    path: 'my-pets',
    loadChildren: () =>
      import('./my-pets/my-pets.module').then(m => m.MyPetsPageModule),
  },

  {
    path: 'newpassword',
    loadChildren: () =>
      import('./newpassword/newpassword.module').then(
        m => m.NewpasswordPageModule,
      ),
  },

  {
    path: 'nodigtialcard',
    loadChildren: () =>
      import('./nodigtialcard/nodigtialcard.module').then(
        m => m.NodigtialcardPageModule,
      ),
  },

  {
    path: 'notification/:id',
    loadChildren: () =>
      import('./notification/notification.module').then(
        m => m.NotificationPageModule,
      ),
  },

  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then(m => m.OrdersPageModule),
  },

  {
    path: 'pet-profile',
    loadChildren: () =>
      import('./pet-profile/pet-profile.module').then(
        m => m.PetProfilePageModule,
      ),
  },

  {
    path: 'pet-service',
    loadChildren: () =>
      import('./pet-service/pet-service.module').then(
        m => m.PetServicePageModule,
      ),
  },

  {
    path: 'petdetailes/:id',
    loadChildren: () =>
      import('./petdetailes/petdetailes.module').then(
        m => m.PetdetailesPageModule,
      ),
  },

  {
    path: 'privacy',
    loadChildren: () =>
      import('./privacy/privacy.module').then(m => m.PrivacyPageModule),
  },

  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('./privacy-policy/privacy-policy.module').then(
        m => m.PrivacyPolicyPageModule,
      ),
  },

  {
    path: 'product-details/:id',
    loadChildren: () =>
      import('./product-details/product-details.module').then(
        m => m.ProductDetailsPageModule,
      ),
  },

  {
    path: 'product-list',
    loadChildren: () =>
      import('./product-list/product-list.module').then(
        m => m.ProductListPageModule,
      ),
  },

  {
    path: 'productlist',
    loadChildren: () =>
      import('./productlist/productlist.module').then(
        m => m.ProductlistPageModule,
      ),
  },

  {
    path: 'profile-setup',
    loadChildren: () =>
      import('./profile-setup/profile-setup.module').then(
        m => m.ProfileSetupPageModule,
      ),
  },

  {
    path: 'provider-customadv',
    loadChildren: () =>
      import('./provider-customadv/provider-customadv.module').then(
        m => m.ProviderCustomadvPageModule,
      ),
  },

  {
    path: 'provider-dashboard',
    loadChildren: () =>
      import('./provider-dashboard/provider-dashboard.module').then(
        m => m.ProviderDashboardPageModule,
      ),
  },

  {
    path: 'providercreactacc',
    loadChildren: () =>
      import('./providercreactacc/providercreactacc.module').then(
        m => m.ProvidercreactaccPageModule,
      ),
  },

  {
    path: 'providerprofilesetup',
    loadChildren: () =>
      import('./providerprofilesetup/providerprofilesetup.module').then(
        m => m.ProviderprofilesetupPageModule,
      ),
  },

  {
    path: 'providerpromotion',
    loadChildren: () =>
      import('./providerpromotion/providerpromotion.module').then(
        m => m.ProviderpromotionPageModule,
      ),
  },

  {
    path: 'providerservice/:id',
    loadChildren: () =>
      import('./providerservice/providerservice.module').then(
        m => m.ProviderservicePageModule,
      ),
  },

  {
    path: 'qr-card',
    loadChildren: () =>
      import('./qr-card/qr-card.module').then(m => m.QRCardPageModule),
  },

  {
    path: 'reminders',
    loadChildren: () =>
      import('./reminders/reminders.module').then(m => m.RemindersPageModule),
  },

  {
    path: 'reminder',
    loadChildren: () =>
      import('./reminder/reminder.module').then(m => m.ReminderPageModule),
  },

  {
    path: 'review/:type/:id',
    loadChildren: () =>
      import('./review/review.module').then(m => m.ReviewPageModule),
  },

  {
    path: 'sama',
    loadChildren: () =>
      import('./sama/sama.module').then(m => m.SamaPageModule),
  },

  {
    path: 'sama-pet-store/:type',
    loadChildren: () =>
      import('./sama-pet-store/sama-pet-store.module').then(
        m => m.SamaPetStorePageModule,
      ),
  },
  {
    path: 'sama-pet-store',
    loadChildren: () =>
      import('./sama-pet-store/sama-pet-store.module').then(
        m => m.SamaPetStorePageModule,
      ),
  },
  {
    path: 'sama1',
    loadChildren: () =>
      import('./sama1/sama1.module').then(m => m.Sama1PageModule),
  },

  {
    path: 'select-provider-type',
    loadChildren: () =>
      import('./select-provider-type/select-provider-type.module').then(
        m => m.SelectProviderTypePageModule,
      ),
  },

  {
    path: 'selectprovidertype',
    loadChildren: () =>
      import('./selectprovidertype/selectprovidertype.module').then(
        m => m.SelectprovidertypePageModule,
      ),
  },

  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then(m => m.SettingsPageModule),
  },

  {
    path: '',
    loadChildren: () =>
      import('./splash/splash.module').then(m => m.SplashPageModule),
    pathMatch: 'full' 
  },

  {
    path: 'subscription',
    loadChildren: () =>
      import('./subscription/subscription.module').then(
        m => m.SubscriptionPageModule,
      ),
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./support/support.module').then(m => m.SupportPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },

  {
    path: 'termscondtions',
    loadChildren: () =>
      import('./termscondtions/termscondtions.module').then(
        m => m.TermscondtionsPageModule,
      ),
  },

  {
    path: 'verify-email/:type',
    loadChildren: () =>
      import('./verify-email/verify-email.module').then(
        m => m.VerifyEmailPageModule,
      ),
  },

  {
    path: 'vetclinic/:type',
    loadChildren: () =>
      import('./vetclinic/vetclinic.module').then(m => m.VetclinicPageModule),
  },

  {
    path: 'vetdetails/:type/:id',
    loadChildren: () =>
      import('./vetdetails/vetdetails.module').then(
        m => m.VetdetailsPageModule,
      ),
  },

  {
    path: 'wait-approval',
    loadChildren: () =>
      import('./wait-approval/wait-approval.module').then(
        m => m.WaitApprovalPageModule,
      ),
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('./privacy-policy/privacy-policy.module').then(
        m => m.PrivacyPolicyPageModule,
      ),
  },
  {
    path: 'my-store',
    loadChildren: () =>
      import('./my-store/my-store.module').then(m => m.MyStorePageModule),
  },
  {
    path: 'authorized-contacts',
    loadChildren: () =>
      import('./authorized-contacts/authorized-contacts.module').then(
        m => m.AuthorizedContactsPageModule,
      ),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then(m => m.CheckoutPageModule),
  },
  {
    path: 'discounts',
    loadChildren: () =>
      import('./discounts/discounts.module').then(m => m.DiscountsPageModule),
  },
  {
    path: 'custom-ad',
    loadChildren: () =>
      import('./custom-ad/custom-ad.module').then(m => m.CustomAdPageModule),
  },
  {
    path: 'favorite',
    loadChildren: () =>
      import('./favorite/favorite.module').then(m => m.FavoritePageModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then(m => m.OrdersPageModule),
  },
  {
    path: 'provider-dashboard',
    loadChildren: () =>
      import('./provider-dashboard/provider-dashboard.module').then(
        m => m.ProviderDashboardPageModule,
      ),
  },
  {
    path: 'selling-pet-form',
    loadChildren: () =>
      import('./selling-pet-form/selling-pet-form.module').then(
        m => m.SellingPetFormPageModule,
      ),
  },
  {
    path: 'transfer-ownership/:id',
    loadChildren: () =>
      import('./transfer-ownership/transfer-ownership.module').then(
        m => m.TransferOwnershipPageModule,
      ),
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then( m => m.BlogPageModule)
  },
  {
    path: 'lostpetinfo/:id',
    loadChildren: () => import('./lostpetinfo/lostpetinfo.module').then( m => m.LostpetinfoPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
