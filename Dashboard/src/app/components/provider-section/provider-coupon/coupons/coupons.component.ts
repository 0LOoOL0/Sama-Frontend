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
  used_count?: number;


  owner: {
    name: string;
    contact: string;
  };

  // 👇 ADD THIS
  coupon_usages?: {
    date_used: string;
    customer_name: string;
    contact: string;
  }[];
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
  freeCoupons: any[] = [];
  paidCoupons: any[] = [];
  usedCoupons: any[] = [];
  expiredCoupons: any[] = [];
  showDetailsFor: number | null = null;

  
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


  // in coupons.component.ts

showPopup(): void {
  const providerId = this.providerId;
  if (!providerId) {
    this.toastr.error('Provider ID not set.', 'Error');
    return;
  }

  Swal.fire({
    title: 'Add Coupon',
    width: '50%',
    html: `
      <form id="couponForm" onsubmit="return false;" class="space-y-5 p-2">
        <!-- Dates -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label for="createdDate">Created Date</label>
            <input id="createdDate" type="date" required class="w-full border rounded px-3 py-2" />
          </div>
          <div class="flex-1">
            <label for="validDate">Valid Till</label>
            <input id="validDate" type="date" required class="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <!-- Titles -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label for="titleEn">Title (EN)</label>
            <input id="titleEn" type="text" required class="w-full border rounded px-3 py-2" />
          </div>
          <div class="flex-1">
            <label for="titleAr">Title (AR)</label>
            <input id="titleAr" type="text" required class="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <!-- Descriptions -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label for="descEn">Description (EN)</label>
            <textarea id="descEn" rows="3" required class="w-full border rounded px-3 py-2"></textarea>
          </div>
          <div class="flex-1">
            <label for="descAr">Description (AR)</label>
            <textarea id="descAr" rows="3" required class="w-full border rounded px-3 py-2"></textarea>
          </div>
        </div>

        <!-- Qty, Price, After, Discount -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label for="qty">Quantity</label>
            <input id="qty" type="number" required class="w-full border rounded px-3 py-2" />
          </div>
          <div class="flex-1">
            <label for="price">Price</label>
            <input id="price" type="number" required class="w-full border rounded px-3 py-2" />
          </div>
          <div class="flex-1">
            <label for="priceAfter">Price After</label>
            <input id="priceAfter" type="number" required class="w-full border rounded px-3 py-2" />
          </div>
          <div class="flex-1">
            <label for="discount">Discount %</label>
            <input id="discount" type="number" required class="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <!-- Offer & Audience -->
        <div class="flex gap-6">
          <div class="flex-1">
            <label>Offer Type</label>
            <div class="flex items-center gap-4">
              <input type="radio" id="freeOffer" name="offerType" value="free" />
              <label for="freeOffer">Free</label>
              <input type="radio" id="paidOffer" name="offerType" value="paid" />
              <label for="paidOffer">Paid</label>
              <input id="offerPrice" type="number" placeholder="Paid Price" class="w-24 border rounded px-2 py-1" />
            </div>
          </div>
          <div class="flex-1">
            <label>Audience</label>
            <div class="flex items-center gap-4">
              <input type="radio" id="audienceSama" name="audience" value="sama" />
              <label for="audienceSama">Sama Member</label>
              <input type="radio" id="audienceAll" name="audience" value="all" />
              <label for="audienceAll">All Users</label>
            </div>
          </div>
        </div>

        <button type="button" id="submitCoupon" class="mt-4 px-6 py-2 bg-green-600 text-white rounded">
          Add Coupon
        </button>
      </form>
    `,
    showConfirmButton: false
  });

  const submitBtn = Swal.getPopup()?.querySelector('#submitCoupon');
  if (!submitBtn) { return; }

  submitBtn.addEventListener('click', () => {
    const pop = Swal.getPopup() as HTMLElement;

    // read form values
    const created_date   = (pop.querySelector('#createdDate')   as HTMLInputElement).value;
    const valid_till     = (pop.querySelector('#validDate')     as HTMLInputElement).value;
    const title_en       = (pop.querySelector('#titleEn')       as HTMLInputElement).value;
    const title_ar       = (pop.querySelector('#titleAr')       as HTMLInputElement).value;
    const description_en = (pop.querySelector('#descEn')        as HTMLTextAreaElement).value;
    const description_ar = (pop.querySelector('#descAr')        as HTMLTextAreaElement).value;
    const quantity       = +((pop.querySelector('#qty')         as HTMLInputElement).value);
    const price          = +((pop.querySelector('#price')       as HTMLInputElement).value);
    const price_after    = +((pop.querySelector('#priceAfter')  as HTMLInputElement).value);
    const discount       = +((pop.querySelector('#discount')    as HTMLInputElement).value);
    const offerTypeEl    = pop.querySelector('input[name="offerType"]:checked') as HTMLInputElement;
    const audienceEl     = pop.querySelector('input[name="audience"]:checked')  as HTMLInputElement;
    const offer_type     = offerTypeEl.value === 'free'
                              ? 0
                              : +((pop.querySelector('#offerPrice') as HTMLInputElement).value) || 0;
    const audience       = audienceEl.value;

    // **here’s the crucial bit**: explicitly pass your providerId
    const couponData = {
      provider:       providerId.toString(),
      created_date,
      valid_till,
      title_en,
      title_ar,
      description_en,
      description_ar,
      quantity,
      price,
      price_after,
      discount,
      offer_type,
      audience
    };

    // your existing payload shape stays the same:
    const providerData = { profileId: providerId };

    this.providerService
      .storeCouponAdminDashboard(couponData, providerData)
      .subscribe({
        next: () => {
          Swal.fire('Success','Coupon added!','success');
          this.providersCoupons();  // refresh your lists
        },
        error: (err: any) => {
          console.error('Error adding coupon:', err);
          if (err.error?.errors) {
            const msgs = Object.values(err.error.errors).flat().join('<br>');
            Swal.fire('Validation Error', msgs, 'error');
          } else {
            Swal.fire('Error','Could not add coupon.','error');
          }
        }
      });
  });
}

  
  

providersCoupons(): void {
  this.providerId = this.providerService.getProviderId();

  if (!this.providerId) {
    this.toastr.error("Provider ID not found.", "Error", { timeOut: 3000 });
    return;
  }

  this.providerService.getCouponsByProviderId(this.providerId).subscribe({
    next: (coupons: Coupon[]) => {
      // expired
      this.expiredCoupons = coupons.filter(c => {
        const exp = new Date(c.expiration_date);
        const today = new Date();
        exp.setHours(0,0,0,0);
        today.setHours(0,0,0,0);
        return exp < today;
      });

      // non‐expired
      const nonExpired = coupons.filter(c => {
        const exp = new Date(c.expiration_date);
        const today = new Date();
        exp.setHours(0,0,0,0);
        today.setHours(0,0,0,0);
        return exp >= today;
      });

      // paid vs free
      this.paidCoupons = nonExpired.filter(c => c.offer_type !== 0);
      this.freeCoupons = nonExpired.filter(c => c.offer_type === 0);

      // ✱ USED: build an array of { title_en, qty, left, used }
      // ✱ USED: list all coupons and include usage data
      this.usedCoupons = coupons.map(c => {
  const usages = c.coupon_usages || [];
  const used = usages.length;

  return {
    id: c.id,
    title_en: c.title_en,
    qty: c.quantity,
    used,
    left: c.quantity - used,
    usages
  };
});

      

    },
    error: () => this.toastr.error("Failed to load coupons.", "Error", { timeOut: 3000 })
  });
}

  
toggleDetails(couponId: number): void {
  this.showDetailsFor = this.showDetailsFor === couponId ? null : couponId;
}




}