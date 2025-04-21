import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProviderSectionService } from '../../service/provider-section.service';
import { ToastrService } from 'ngx-toastr';
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
  selector: 'coupons',
  imports: [CommonModule],
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent {
  selectedTab: number = 1;
  providerId: number | null = null;
  coupons: any[] = [];
  tableData: any;
  freeCoupons: any;
  paidCoupons: any;
  usedCoupons: any;
  expiredCoupons: any;
  
  constructor(private providerService: ProviderSectionService,private toastr: ToastrService) {
  }

  selectTab(tabIndex: number): void {
    this.selectedTab = tabIndex;
  }
  tabs!: NodeListOf<HTMLButtonElement>;
  contents!: NodeListOf<HTMLElement>;

  ngOnInit() {
    // this.fetchProvCoupons();
this.providersCoupons();
    this.tabs = document.querySelectorAll(".tab-button");
    this.contents = document.querySelectorAll(".tab-content");

    this.tabs.forEach((tab: HTMLButtonElement, index: number) => {
      tab.addEventListener("click", () => {
        this.tabs.forEach((t) => t.classList.remove("active"));
        this.contents.forEach((c) => c.classList.remove("show"));

        tab.classList.add("active");
        this.contents[index].classList.add("show");
      });
    });
  }


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
      showConfirmButton: false,
    });
  }
  providersCoupons(): void {
    this.providerId = this.providerService.getProviderId();
  
    if (this.providerId) {
      this.providerService.getCouponsByProviderId(this.providerId).subscribe({
        next: (coupons: Coupon[]) => {
          console.log('Coupons fetched:', coupons);  // Add this to check the data
  
          // First, filter out expired coupons
          this.expiredCoupons = coupons.filter((coupon: Coupon) => {
            const expirationDate = new Date(coupon.expiration_date);
            const currentDate = new Date();
  
            // Strip time from both dates by setting the time to midnight
            expirationDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);
  
            return expirationDate < currentDate;  // If expired, add to expiredCoupons
          });
  
          // Filter out expired coupons from the rest of the lists
          const nonExpiredCoupons = coupons.filter((coupon: Coupon) => {
            const expirationDate = new Date(coupon.expiration_date);
            expirationDate.setHours(0, 0, 0, 0);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
  
            return expirationDate >= currentDate;  // Only non-expired coupons remain here
          });
  
          // Now filter paid, free, and used coupons, excluding expired ones
          this.paidCoupons = nonExpiredCoupons.filter((coupon: Coupon) => coupon.offer_type !== 0);
          this.freeCoupons = nonExpiredCoupons.filter((coupon: Coupon) => coupon.offer_type === 0);
          this.usedCoupons = nonExpiredCoupons.filter((coupon: Coupon) => coupon.membership === true);
        },
        error: (error) => {
          this.toastr.error("Failed to load coupons.", "Error", { timeOut: 3000 });
        }
      });
    } else {
      this.toastr.error("Provider ID not found.", "Error", { timeOut: 3000 });
    }
  }
  
  toggleDetails(event: MouseEvent): void {
    const cell = event.target as HTMLTableCellElement;
    const detailsRow = cell.closest('tr')?.nextElementSibling as HTMLTableRowElement;
    if (detailsRow) {
      detailsRow.classList.toggle('hidden');
    }
  }



}