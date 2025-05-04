import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderSectionService } from '../../service/provider-section.service';
import { CommonModule } from '@angular/common'; // ✅ Import this

declare var Swal: any;  // SweetAlert2

@Component({
  selector: 'coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css'],
  imports: [CommonModule]
})
export class CouponListComponent implements OnInit {
  providers: any[] = [];
  coupons: any[] = [];  // Store coupon data


  constructor(
    @Inject(ProviderSectionService) private providerSectionService: ProviderSectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProviders();
    this.fetchCoupons();
  }

  // Fetch Providers
  fetchProviders() {
    this.providerSectionService.getProviders().subscribe(
      (data: any) => {
        if (data.providers && Array.isArray(data.providers)) {
          this.providers = data.providers;
          console.log('Fetched providers:', this.providers);
        } else if (Array.isArray(data)) {
          this.providers = data;
          console.log('Fetched providers:', this.providers);
        } else {
          console.error('Fetched providers is not an array:', data);
        }
      },
      (error) => {
        console.error('Error fetching providers', error);
      }
    );
  }

  // Fetch Coupons
  fetchCoupons() {
    this.providerSectionService.getCoupons().subscribe(
      (data: any) => {
        this.coupons = data.data; // Adjusted for Laravel API Resource response
        console.log('Fetched coupons:', this.coupons);
      },
      (error) => {
        console.error('Error fetching coupons:', error);
      }
    );
  }

  showPopup() {
    console.log('showPopup() called');

    const providerOptions = this.providers
      .map(prov => `<option value="${prov.id}">${prov.provider_name_en}</option>`)
      .join('');

    Swal.fire({
      title: 'Add Coupon',
      width: '60%',
      html: `
      <form class="space-y-5 p-2" id="couponForm" onsubmit="return false;">
        <!-- Provider List -->
        <div>
          <label for="prov-list" class="block text-sm font-medium text-gray-700 mb-1">Provider Name</label>
          <select id="prov-list" name="provList" required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
            <option value="" disabled selected>Providers</option>
            ${providerOptions}
          </select>
        </div>

        <!-- Dates -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label for="createdDate" class="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
            <input id="createdDate" type="date" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div class="flex-1">
            <label for="validDate" class="block text-sm font-medium text-gray-700 mb-1">Valid Till</label>
            <input id="validDate" type="date" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
        </div>

        <!-- Titles -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label for="couponNameEN" class="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label>
            <input type="text" id="couponNameEN" name="couponNameEN" placeholder="Title (EN)" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div class="flex-1">
            <label for="couponNameAR" class="block text-sm font-medium text-gray-700 mb-1">Title (AR)</label>
            <input type="text" id="couponNameAR" name="couponNameAR" placeholder="Title (AR)" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
        </div>

        <!-- Descriptions -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label for="couponDescEN" class="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
            <textarea id="couponDescEN" name="couponDescEN" rows="3" placeholder="Description (EN)" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
          </div>
          <div class="flex-1">
            <label for="couponDescAR" class="block text-sm font-medium text-gray-700 mb-1">Description (AR)</label>
            <textarea id="couponDescAR" name="couponDescAR" rows="3" placeholder="Description (AR)" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
          </div>
        </div>

        <!-- Qty, Price, After, Discount -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label for="couponQty" class="block text-sm font-medium text-gray-700 mb-1">Qty</label>
            <input type="number" id="couponQty" name="couponQty" placeholder="Enter Quantity" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div class="flex-1">
            <label for="couponPrice" class="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input type="number" id="couponPrice" name="couponPrice" placeholder="Enter Price" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <div class="flex-1">
            <label for="couponAfter" class="block text-sm font-medium text-gray-700 mb-1">Price After</label>
            <input type="number" id="couponAfter" name="couponAfter" placeholder="Enter Price After" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div class="flex-1">
            <label for="couponDiscount" class="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
            <input type="number" id="couponDiscount" name="couponDiscount" placeholder="Enter Discount" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
        </div>

        <!-- Offer Selection -->
        <div class="mt-4 flex gap-6 mb-6">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-4">
              Choose which offer, if it's paid, write the price
            </label>
            <div class="flex items-center justify-center gap-4">
              <input type="radio" id="freeOffer" name="offerType" value="free"
                class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
              <label for="freeOffer" class="text-gray-700">Free</label>
              <div class="flex items-center gap-2">
                <input type="radio" id="paidOffer" name="offerType" value="paid"
                  class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <label for="paidOffer" class="text-gray-700">Paid</label>
                <input id="couponOfferPrice" type="number" placeholder="Enter Price"
                  class="w-25 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
            </div>
          </div>

          <!-- Audience Selection -->
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-4">
              Choose Audience
            </label>
            <div class="flex items-center justify-center gap-4">
              <input type="radio" id="samaMember" name="audience" value="sama"
                class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
              <label for="samaMember" class="text-gray-700">Sama Member</label>
              <input type="radio" id="allUsers" name="audience" value="all"
                class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
              <label for="allUsers" class="text-gray-700">All Users</label>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center gap-4 mt-4">
          <button type="button" id="submitCoupon" class="w-60 blue-bg text-white py-2 rounded-3xl shadow hover:bg-blue-900 transition">
            Add Coupon 
          </button>
        </div>
      </form>
      `,
      showConfirmButton: false,
      preConfirm: () => {
        // Optional: perform pre-confirm validation.
        const couponName = (document.getElementById('couponNameEN') as HTMLInputElement)?.value;
        const couponType = (document.getElementById('providerName') as HTMLSelectElement)?.value;
        if (!couponName || !couponType) {
          Swal.showValidationMessage('Please fill in all fields');
        }
        return { couponName, couponType };
      }
    });

    // Attach click event to our custom button after the popup is rendered.
    const submitBtn = Swal.getPopup()?.querySelector('#submitCoupon');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const popup = Swal.getPopup();
        // Get values directly from the popup element.
        const createdDate = (popup.querySelector('#createdDate') as HTMLInputElement)?.value;
        const validDate = (popup.querySelector('#validDate') as HTMLInputElement)?.value;
        console.log('Created Date:', createdDate, 'Valid Till:', validDate);
        if (!createdDate || !validDate) {
          Swal.fire('Error', 'Please fill in both the created date and valid till fields.', 'error');
          return;
        }

        const offerTypeElement = popup.querySelector('input[name="offerType"]:checked') as HTMLInputElement;
const offerType = offerTypeElement?.value === 'free' ? 0 : Number((popup.querySelector('#couponOfferPrice') as HTMLInputElement)?.value) || 0;

        const couponData = {
          provider: (popup.querySelector('#prov-list') as HTMLSelectElement)?.value,
          created_date: createdDate,
          valid_till: validDate,
          title_en: (popup.querySelector('#couponNameEN') as HTMLInputElement)?.value,
          title_ar: (popup.querySelector('#couponNameAR') as HTMLInputElement)?.value,
          description_en: (popup.querySelector('#couponDescEN') as HTMLTextAreaElement)?.value,
          description_ar: (popup.querySelector('#couponDescAR') as HTMLTextAreaElement)?.value,
          quantity: (popup.querySelector('#couponQty') as HTMLInputElement)?.value,
          price: (popup.querySelector('#couponPrice') as HTMLInputElement)?.value,
          price_after: (popup.querySelector('#couponAfter') as HTMLInputElement)?.value,
          discount: (popup.querySelector('#couponDiscount') as HTMLInputElement)?.value,
          offer_type: offerType,
          audience: (popup.querySelector('input[name="audience"]:checked') as HTMLInputElement)?.value
        };

        console.log('Coupon Data to submit:', couponData);

        // Use the selected provider id from the dropdown.
        const selectedProviderId = (popup.querySelector('#prov-list') as HTMLSelectElement)?.value;
        const providerData = { profileId: selectedProviderId };
        console.log('Provider Data:', providerData);

        this.providerSectionService.storeCouponAdminDashboard(couponData, providerData)
          .subscribe(
            (response: any) => {
              console.log('Coupon added successfully:', response);
              Swal.fire('Success', 'Coupon added successfully!', 'success');
            },
            (error: any) => {
              console.error('Error adding coupon:', error);
              Swal.fire('Error', 'Failed to add coupon.', 'error');
            }
          );
      });
    }
  }













  showEditPopup(coupon: any) {
    console.log('showEditPopup called for coupon:', coupon);
  
    // Build the provider options with the current provider selected.
    const providerOptions = this.providers.map(prov => {
      const selected = coupon.provider_id == prov.id ? 'selected' : '';
      return `<option value="${prov.id}" ${selected}>${prov.provider_name_en}</option>`;
    }).join('');
  
    // Determine if the coupon is free (offer_type is 0) or paid.
    const isFree = coupon.offer_type == 0;
  
    Swal.fire({
      title: 'Edit Coupon',
      width: '60%',
      html: `
        <form class="space-y-5 p-2" id="couponForm" onsubmit="return false;">
          <!-- Provider List -->
          <div>
            <label for="prov-list" class="block text-sm font-medium text-gray-700 mb-1">Provider Name</label>
            <select id="prov-list" name="provList" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="" disabled>Providers</option>
              ${providerOptions}
            </select>
          </div>
  
          <!-- Dates -->
          <div class="flex gap-4">
            <div class="flex-1">
              <label for="createdDate" class="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
              <input id="createdDate" type="date" required value="${coupon.created_date}"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
            <div class="flex-1">
              <label for="validDate" class="block text-sm font-medium text-gray-700 mb-1">Valid Till</label>
              <input id="validDate" type="date" required value="${coupon.expiration_date || coupon.valid_till}"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
          </div>
  
          <!-- Titles -->
          <div class="flex gap-4">
            <div class="flex-1">
              <label for="couponNameEN" class="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label>
              <input type="text" id="couponNameEN" name="couponNameEN" placeholder="Title (EN)" required value="${coupon.title_en}"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
            <div class="flex-1">
              <label for="couponNameAR" class="block text-sm font-medium text-gray-700 mb-1">Title (AR)</label>
              <input type="text" id="couponNameAR" name="couponNameAR" placeholder="Title (AR)" required value="${coupon.title_ar}"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
          </div>
  
          <!-- Descriptions -->
          <div class="flex gap-4">
            <div class="flex-1">
              <label for="couponDescEN" class="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
              <textarea id="couponDescEN" name="couponDescEN" rows="3" placeholder="Description (EN)" required
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">${coupon.description_en}</textarea>
            </div>
            <div class="flex-1">
              <label for="couponDescAR" class="block text-sm font-medium text-gray-700 mb-1">Description (AR)</label>
              <textarea id="couponDescAR" name="couponDescAR" rows="3" placeholder="Description (AR)" required
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">${coupon.description_ar}</textarea>
            </div>
          </div>
  
          <!-- Qty, Price, After, Discount -->
          <div class="flex gap-4">
            <div class="flex-1">
              <label for="couponQty" class="block text-sm font-medium text-gray-700 mb-1">Qty</label>
              <input type="number" id="couponQty" name="couponQty" placeholder="Enter Quantity" required value="${coupon.quantity}"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
            <div class="flex-1">
              <label for="couponPrice" class="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input type="number" id="couponPrice" name="couponPrice" placeholder="Enter Price" required value="${coupon.price}"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" />
            </div>
            <div class="flex-1">
              <label for="couponAfter" class="block text-sm font-medium text-gray-700 mb-1">Price After</label>
              <input type="number" id="couponAfter" name="couponAfter" placeholder="Enter Price After" required value="${coupon.price_after}"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div class="flex-1">
              <label for="couponDiscount" class="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
              <input type="number" id="couponDiscount" name="couponDiscount" placeholder="Enter Discount" required value="${coupon.discount}"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
          </div>
  
          <!-- Offer Selection -->
          <div class="mt-4 flex gap-6 mb-6">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-4">
                Choose which offer, if it's paid, write the price
              </label>
              <div class="flex items-center justify-center gap-4">
                <input type="radio" id="freeOffer" name="offerType" value="free"
                  class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" ${isFree ? 'checked' : ''} />
                <label for="freeOffer" class="text-gray-700">Free</label>
                <div class="flex items-center gap-2">
                  <input type="radio" id="paidOffer" name="offerType" value="paid"
                    class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" ${!isFree ? 'checked' : ''} />
                  <label for="paidOffer" class="text-gray-700">Paid</label>
                  <input id="couponOfferPrice" type="number" placeholder="Enter Price" value="${!isFree ? coupon.offer_type : ''}"
                    class="w-25 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
              </div>
            </div>
  
            <!-- Audience Selection -->
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-4">
                Choose Audience
              </label>
              <div class="flex items-center justify-center gap-4">
                <input type="radio" id="samaMember" name="audience" value="sama"
                  class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" ${coupon.audience === 'sama' ? 'checked' : ''} />
                <label for="samaMember" class="text-gray-700">Sama Member</label>
                <input type="radio" id="allUsers" name="audience" value="all"
                  class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300" ${coupon.audience === 'all' ? 'checked' : ''} />
                <label for="allUsers" class="text-gray-700">All Users</label>
              </div>
            </div>
          </div>
  
          <!-- Submit Button -->
          <div class="flex justify-center gap-4 mt-4">
            <button type="button" id="updateCoupon" class="w-60 blue-bg text-white py-2 rounded-3xl shadow hover:bg-blue-900 transition">
              Update Coupon 
            </button>
          </div>
        </form>
      `,
      showConfirmButton: false
    });
  
    // Attach click event to the custom update button.
    const updateBtn = Swal.getPopup()?.querySelector('#updateCoupon');
    if (updateBtn) {
      updateBtn.addEventListener('click', () => {
        const popup = Swal.getPopup();
        // Gather updated values from the popup form.
        const updatedCouponData = {
          provider: (popup.querySelector('#prov-list') as HTMLSelectElement)?.value,
          created_date: (popup.querySelector('#createdDate') as HTMLInputElement)?.value,
          valid_till: (popup.querySelector('#validDate') as HTMLInputElement)?.value,
          title_en: (popup.querySelector('#couponNameEN') as HTMLInputElement)?.value,
          title_ar: (popup.querySelector('#couponNameAR') as HTMLInputElement)?.value,
          description_en: (popup.querySelector('#couponDescEN') as HTMLTextAreaElement)?.value,
          description_ar: (popup.querySelector('#couponDescAR') as HTMLTextAreaElement)?.value,
          quantity: (popup.querySelector('#couponQty') as HTMLInputElement)?.value,
          price: (popup.querySelector('#couponPrice') as HTMLInputElement)?.value,
          price_after: (popup.querySelector('#couponAfter') as HTMLInputElement)?.value,
          discount: (popup.querySelector('#couponDiscount') as HTMLInputElement)?.value,
          offer_type: (function(){
            const offerTypeElement = popup.querySelector('input[name="offerType"]:checked') as HTMLInputElement;
            return offerTypeElement?.value === 'free' ? 0 : Number((popup.querySelector('#couponOfferPrice') as HTMLInputElement)?.value) || 0;
          })(),
          audience: (popup.querySelector('input[name="audience"]:checked') as HTMLInputElement)?.value
        };
  
        console.log('Updated Coupon Data to submit:', updatedCouponData);
        const selectedProviderId = (popup.querySelector('#prov-list') as HTMLSelectElement)?.value;
        const providerData = { profileId: selectedProviderId };
  
        // Call the update method from ProviderSectionService.
        this.providerSectionService.updateCouponAdminDashboard(coupon.id, { coupon: updatedCouponData, provider_data: providerData })
          .subscribe(
            (response: any) => {
              console.log('Coupon updated successfully:', response);
              Swal.fire('Success', 'Coupon updated successfully!', 'success');
              // Optionally refresh the coupon list.
              this.fetchCoupons();
            },
            (error: any) => {
              console.error('Error updating coupon:', error);
              Swal.fire('Error', 'Failed to update coupon.', 'error');
            }
          );
      });
    }
  }
  







  deleteCoupon(coupon: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.providerSectionService.deleteCouponAdminDashboard(coupon.id)
          .subscribe(
            (response: any) => {
              console.log('Coupon deleted successfully:', response);
              Swal.fire('Deleted!', 'Your coupon has been deleted.', 'success');
              // Refresh the coupon list after deletion.
              this.fetchCoupons();
            },
            (error: any) => {
              console.error('Error deleting coupon:', error);
              Swal.fire('Error', 'Failed to delete coupon.', 'error');
            }
          );
      }
    });
  }
  
}
