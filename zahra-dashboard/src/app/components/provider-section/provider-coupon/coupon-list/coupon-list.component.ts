
import { ProviderSectionService } from '../../service/provider-section.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router/*, RouterLink*/ } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

declare var Swal: any;

interface Coupon {
  id: number;
  created_date: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  code: string | null;
  provider_id: number;
  title_en: string;
  title_ar: string;
  image: string | null;
  quantity: number;
  expiration_date: string;
  description_en: string;
  description_ar: string;
  membership: boolean;
  price: number;
  price_after: number;
  discount: number;
  offer_type: number;
  audience: string;
}

@Component({
  selector: 'coupon-list',
  imports: [CommonModule, ReactiveFormsModule/*, RouterLink*/],
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})

export class CouponListComponent {
  couponsData: any[] = [];
  filteredCoupons: any[] = [];
  couponsCount: number = 0;
  coupons: Coupon[] = [];
  providerId: any;
  couponId: any;
  providerName: any;
  provId: any;
  prov: any;
  constructor(private providerService: ProviderSectionService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchCouponsData();

  }


  fetchCouponsData(): void {
    const loader = document.getElementById('loader');
  
    if (!loader) {
      return;
    }
  
    loader.style.display = 'block';
  
    this.providerService.getCoupons().subscribe({
      next: (response) => {
        console.log('API Response:', response);
  
        if (Array.isArray(response)) {
          this.couponsData = response;
          this.filteredCoupons = [...this.couponsData];
          this.couponsCount = this.couponsData.length;
  
          console.log("Assigned couponsData:", this.couponsData);
  
          const providerRequests = this.couponsData.map(coupon => {
            return this.providerService.getProviderByCouponId(coupon.provider_id);
          });
  
          forkJoin(providerRequests).subscribe({
            next: (providersData) => {
              providersData.forEach((providerData, index) => {
                const coupon = this.couponsData[index];
                coupon.providerDetails = Array.isArray(providerData)
                  ? (providerData.length ? providerData[0] : null)
                  : providerData;
                console.log("Fetched Provider Data:", coupon.providerDetails);
              });
  
              loader.style.display = 'none';
            },
            error: (error) => {
              console.error("Error fetching provider data:", error);
              this.toastr.error("Failed to fetch provider details.", "Error", { timeOut: 3000 });
              loader.style.display = 'none';
            }
          });
        } else {
          console.error("Unexpected API response format:", response);
          this.couponsData = [];
          this.filteredCoupons = [];
          this.couponsCount = 0;
          loader.style.display = 'none';
        }
      },
      error: (error) => {
        console.error('API Fetch Error:', error);
        this.toastr.warning('Please check your Internet connection.', 'Internet Connection Lost', { timeOut: 3000 });
        loader.style.display = 'none';
      }
    });
  }
  

//   fetchCouponsData(): void {
//     const loader = document.getElementById('loader');

//     if (!loader) {
//         return;
//     }

//     loader.style.display = 'block';

//     this.providerService.getCoupons().subscribe({
//         next: (response) => {
//             console.log('API Response:', response);

//             if (Array.isArray(response)) {
//                 this.couponsData = response;
//                 this.filteredCoupons = [...this.couponsData];
//                 this.couponsCount = this.couponsData.length;

//                 console.log("Assigned couponsData:", this.couponsData);

//                 // Fetch provider details for each coupon
//                 this.filteredCoupons.forEach(coupon => {
//                     this.providerService.getProviderByCouponId(coupon.provider_id).subscribe({
//                         next: (providerData) => {
//                             coupon.providerDetails = Array.isArray(providerData) 
//                                 ? (providerData.length ? providerData[0] : null) 
//                                 : providerData;
//                             console.log("Fetched Provider Data:", coupon.providerDetails);
//                         },
//                         error: (error) => {
//                             console.error("Error fetching provider data:", error);
//                             this.toastr.error("Failed to fetch provider details.", "Error", { timeOut: 3000 });
//                         }
//                     });
//                 });

//             } else {
//                 console.error("Unexpected API response format:", response);
//                 this.couponsData = [];
//                 this.filteredCoupons = [];
//                 this.couponsCount = 0;
//             }

//             loader.style.display = 'none';
//         },
//         error: (error) => {
//             console.error('API Fetch Error:', error);
//             this.toastr.warning('Please check your Internet connection.', 'Internet Connection Lost', { timeOut: 3000 });
//             loader.style.display = 'none';
//         }
//     });
// }

showCouponId(coupon: any): void {
  this.couponId = coupon.id;

  if (!coupon.provider_id) {
      this.toastr.error("Invalid provider ID.", "Error", { timeOut: 3000 });
      return;
  }

  this.providerService.getProviderByCouponId(coupon.provider_id).subscribe({
      next: (providerData) => {
          let selectedProvider = Array.isArray(providerData) 
              ? providerData.find(p => p.id === coupon.provider_id) 
              : providerData;

          if (!selectedProvider?.id) {
              this.toastr.error("Provider not found.", "Error", { timeOut: 3000 });
              return;
          }

          this.providerService.setProviderId(selectedProvider.id);
          this.providerName = selectedProvider.first_name;
          this.router.navigate(['/add-new-provider/coupons'], { 
              state: { provider: selectedProvider, providerId: selectedProvider.id } 
          });
      },
      error: () => this.toastr.error("Failed to fetch provider details.", "Error", { timeOut: 3000 })
  });
}

  // showCouponId(coupon: any): void {
  //   this.toastr.info(`You clicked on coupon ID: ${coupon.id}`);
  //   this.couponId = coupon.id;
  
  //   if (coupon.provider_id) {
  //     this.providerService.getProviderByCouponId(coupon.provider_id).subscribe({
  //       next: (providerData) => {
  //         let selectedProvider = Array.isArray(providerData) 
  //           ? providerData.find(p => p.id === coupon.provider_id) 
  //           : providerData;
  
  //         if (selectedProvider?.id) {
  //           this.providerService.setProviderId(selectedProvider.id);
  //           console.log("Provider ID Set:", selectedProvider.id);
  //           this.providerName = selectedProvider.first_name
  //           this.router.navigate(['/add-new-provider/coupons'], { 
  //             state: { provider: selectedProvider, providerId: selectedProvider.id } 
  //           });
  //         } else {
  //           console.error("No matching provider found:", providerData);
  //           this.toastr.error("Provider not found.", "Error", { timeOut: 3000 });
  //         }
  //       },
  //       error: (error) => {
  //         console.error("Error fetching provider data:", error);
  //         this.toastr.error("Failed to fetch provider details.", "Error", { timeOut: 3000 });
  //       }
  //     });
  //   } else {
  //     this.toastr.error("Invalid provider ID.", "Error", { timeOut: 3000 });
  //   }
  // }

  showPopup() {
    Swal.fire({
      title: 'Add Coupon',
      width: '50%',
      html: `
      <form class="space-y-5 p-2" #form="ngForm" >
<!--
        <div class="flex justify-center mb-6 relative">
          <img id="imagePreview" "Image/profile-mask.png"
            class="w-32 h-32 rounded-xl" />
          <a class="absolute  top-24   rounded-full p-2" type="button"
            accept=".png, .jpg, .jpeg">
            <img src="edit-pic.png" alt="">
          </a>
          <input #fileInput type="file" class="hidden"  />
        </div>-->
        <br>
       <!-- providers List -->
        <div>
          <label for="prov-list" class="block text-sm font-medium text-gray-700 mb-1">
            Provider Name
          </label>
          <select id="prov-list" name="provList" required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
            <option value="" disabled>Providers</option>
            <option value="" >Pet Arabia</option>
            <option value="" >California pets</option>
            
          </select>
        </div>

        <!-- Dates -->
        <div style="display: flex; gap: 10px;">
          <div style="flex: 1;">
            <label for="createdDate" class="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
            <input id="createdDate" type="date" required 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>

          <div style="flex: 1;">
            <label for="validDate" class="block text-sm font-medium text-gray-700 mb-1">Valid Till</label>
            <input id="validDate" type="date" required 
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
        </div>
        <br>

        <!-- Title (En) & Title (Ar) Side by Side -->
        <div style="display: flex; gap: 10px;">
          <div style="flex: 1;">
            <label for="titleEn" class="block text-sm font-medium text-gray-700 mb-1">
              Title (En)
            </label>
            <input type="text" id="titleEn" name="title-En"
              placeholder="Title (En)" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>

          <div style="flex: 1;">
            <label for="titleAr" class="block text-sm font-medium text-gray-700 mb-1">
              Title (Ar)
            </label>
            <input type="text" id="titleAr" name="title-Ar"
              placeholder="Title (Ar)" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
        </div>

        <!-- Description (En) & Description (Ar) Side by Side -->
        <div style="display: flex; gap: 10px; margin-top: 10px;">
          <div style="flex: 1;">
            <label for="description-en" class="block text-sm font-medium text-gray-700 mb-1">
              Description (En)
            </label>
            <textarea id="description-en" name="DescriptionEn" rows="3" required 
              placeholder="Description in English"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
          </div>

          <div style="flex: 1;">
            <label for="description-Ar" class="block text-sm font-medium text-gray-700 mb-1">
              Description (Ar)
            </label>
            <textarea id="description-Ar" name="DescriptionAr" rows="3" required 
              placeholder="Description in Arabic"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
          </div>
        </div>

        <!-- Price Before and After -->
        <div class="flex gap-4">
                  <div class="flex-1">
            <label for="price-before" class="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input type="number" id="price-before"  name="priceBefore"
              placeholder="Enter Quantity" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <div class="flex-1">
            <label for="price" class="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input type="number" id="price"  name="price"
              placeholder="Enter Price" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <div class="flex-1">
            <label for="price-after" class="block text-sm font-medium text-gray-700 mb-1">
              Price After
            </label>
            <input type="number" id="price-after"  name="priceAfter"
              placeholder="Enter Price" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          <div class="flex-1">
            <label for="discount" class="block text-sm font-medium text-gray-700 mb-1">
              Discount%
            </label>
            <input type="number" required id="discount"  name="discount"
              placeholder="Enter Discount"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <br>
        </div>
<div class="mt-4 flex gap-6 mb-6">
  <!-- Offer Selection -->
  <br>
  <div class="flex-1">
    <label for="offerType" class="block text-sm font-medium text-gray-700 mb-4">
      Choose which offer, if it's paid, write the price
    </label>
    <div class="flex justify-center items-center gap-4">
      <input type="radio" id="freeOffer" name="offerType" value="free"
        class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
      <label for="freeOffer" class="text-gray-700">Free</label>

      <div class="flex items-center gap-2">
        <input type="radio" id="paidOffer" name="offerType" value="paid"
          class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
        <label for="paidOffer" class="text-gray-700">Paid</label>
        <input id="couponPrice" type="number" placeholder="Enter Price"
          class="w-25 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600" />
      </div>
    </div>
  </div>

  <!-- Audience Selection -->
  <div class="flex-1">
    <label for="audience" class="block text-sm font-medium text-gray-700 mb-4">
      Choose Audience
    </label>

    <div class="flex justify-center gap-4 items-center">
      <input type="radio" id="samaMember" name="audience" value="sama"
        class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
      <label for="samaMember" class="text-gray-700">Sama Member</label>

      <input type="radio" id="allUsers" name="audience" value="all"
        class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
      <label for="allUsers" class="text-gray-700">All Users</label>
    </div>
  </div>
  <br>
</div>
<div class="flex justify-center gap-4 mt-4">
  <button type="submit"
    class="w-60 blue-bg text-white py-2 rounded-3xl shadow hover:bg-blue-900 transition">
    Add Coupon 
  </button>

</div>
      </form>

            
        `,
      showConfirmButton: false,  // Hide the OK button

      preConfirm: () => {
        const couponName = (document.getElementById('couponNameEN') as HTMLInputElement).value;
        const couponType = (document.getElementById('providerName') as HTMLSelectElement).value;
        if (!couponName || !couponType) {
          Swal.showValidationMessage('Please fill in all fields');
        }
        return { couponName, couponType };
      }
    }).then((result: { isConfirmed: any; value: { couponName: any; couponType: any; }; }) => {
      if (result.isConfirmed) {
        const { couponName, couponType } = result.value;
        console.log(`Coupon Name: ${couponName}, Coupon Type: ${couponType}`);
        // Add your code to save the coupon data here
      }
    });
  }
}