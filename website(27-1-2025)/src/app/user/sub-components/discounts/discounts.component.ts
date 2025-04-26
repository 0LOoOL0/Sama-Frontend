import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { DiscountsService } from '../../../services/discounts.service'; // adjust path as needed
import { UserAuthService } from '../../../services/user-auth.service'; // adjust the path

declare var Swal: any;
@Component({
  selector: 'app-discounts',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './discounts.component.html',
  styleUrl: './discounts.component.css'
  
})




export class DiscountsComponent implements OnInit {


  constructor(private discountService: DiscountsService, private userAuthService: UserAuthService) {}

  observer!: IntersectionObserver;

  selectedTab: string = 'free';
  allCoupons: any[] = [];
  freeCoupons: any[] = [];
  paidCoupons: any[] = [];
  isPopupVisible = false;
  selectedDiscount: any = null;

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  ngOnInit(): void {
    this.discountService.getAllPublicCoupons().subscribe((coupons: any[]) => {
      console.log("📦 Full backend response:", coupons);
  
      this.allCoupons = coupons;
  
      // ✅ Filter based on price instead of offer_type
      this.freeCoupons = coupons.filter((c: any) => Number(c.price) === 0);
      this.paidCoupons = coupons.filter((c: any) => Number(c.price) > 0);
  
      console.log("🎁 Free Coupons:", this.freeCoupons);
      console.log("💰 Paid Coupons:", this.paidCoupons);
    });
  }
  

  // isPopupVisible: boolean = false;
  // selectedDiscount: any = null;

  // discounts = [
  //   { id: 1, name: "10% Off" },
  //   { id: 2, name: "20% Off" },
  //   { id: 3, name: "Free " },
  //   { id: 4, name: " Shipping" },
  //   { id: 5, name: "Free Shipping" },
  // ];


  // showPopup(discount: any) {
  //   this.selectedDiscount = discount;
  //   this.isPopupVisible = true;
  // }

  // confirmRedeem() {
  //   alert(`Redeemed: ${this.selectedDiscount.name} (Code: ${this.selectedDiscount.code})`);
  //   this.isPopupVisible = false;
  // }

  // closePopup() {
  //   this.isPopupVisible = false;
  // }






  showPopup(discount: any) {
    this.selectedDiscount = discount;
  
    Swal.fire({
      width: '50%',
      html: `
        <div style="font-family: 'Promo Regular'; background-image: url('/assets/img/memBannerbg.png'); border-radius: 16px; padding: 30px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); color: #fff; max-width: 1000px; margin: 0 auto; animation: popup-entrance 0.5s ease-out;">
          
          <!-- Title -->
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="font-size: 28px; font-weight: bold; color: #fff; text-transform: uppercase; letter-spacing: 2px;">${discount.name}</h1>
          </div>
  
          <!-- Expiry Date -->
          <div style="text-align: center; margin-bottom: 15px;">
            <p style="font-size: 16px; color: #ffeb3b; font-weight: 600;">Valid till: ${discount.expiry}</p>
          </div>
  
          <!-- Description -->
          <div style="text-align: center; margin-bottom: 25px;">
            <p style="font-size: 16px; color: #fff; line-height: 1.6;">${discount.description}</p>
          </div>
  
          <!-- Price Section -->
          <div style="display: flex; justify-content: space-around; gap: 20px; border-top: 2px solid #fff; padding-top: 20px;">
            <div style="flex: 1; text-align: center;">
              <h3 style="color: #ffeb3b;">Price</h3>
              <p>$${discount.price}</p>
            </div>
            <div style="flex: 1; text-align: center;">
              <h3 style="color: #ffeb3b;">Price After</h3>
              <p>$${discount.price_after}</p>
            </div>
            <div style="flex: 1; text-align: center;">
              <h3 style="color: #ffeb3b;">Discount%</h3>
              <p>${discount.discount}%</p>
            </div>
          </div>
  
          <!-- Redeem Button -->
          <div style="text-align: center; margin-top: 20px;">
            <button id="redeem-btn" style="background: linear-gradient(145deg, #f39c12, #e67e22); color: white; padding: 14px 35px; border-radius: 30px; font-size: 18px; font-weight: 700; border: none; cursor: pointer;">
              Redeem
            </button>
          </div>
        </div>
  
        <style>
          @keyframes popup-entrance {
            0% { opacity: 0; transform: translateY(-30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
  
          #redeem-btn:hover {
            background: linear-gradient(145deg, #e67e22, #f39c12);
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          }
  
          #redeem-btn:active {
            transform: translateY(2px);
          }
  
          .swal2-popup {
            background: transparent !important;
            border: none !important;
            border-radius: 16px !important;
          }
  
          .swal2-title {
            color: #fff !important;
          }
  
          .swal2-content {
            color: #fff !important;
          }
  
          .swal2-actions {
            justify-content: center !important;
          }
        </style>
      `,
      showConfirmButton: false,
      didOpen: () => {
        document.getElementById("redeem-btn")?.addEventListener("click", () => {
          this.confirmRedeem();
        });
      }
    });
  }
  

  confirmRedeem() {

    console.log('🟠 confirmRedeem() triggered');
    console.log('📦 localStorage pet_owner_id:', localStorage.getItem('pet_owner_id'));
console.log('🎯 selectedDiscount.id:', this.selectedDiscount?.id);


    Swal.fire({
      width: '50%',
      html: `
  <div style="font-family: 'Promo Regular'; background-image: url('/assets/img/bgDogs.png'); background-position: center; background-size: cover; 
    border-radius: 16px; padding: 30px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); color: #fff; position: relative; 
    max-width: 500px; max-height: 500px; margin: 0 auto; animation: popup-entrance 0.5s ease-out;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="font-size: 28px; font-weight: 900; color: #1A1A40; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);">Are you sure?</h1>
          </div>
  
          <div style="text-align: center; margin-bottom: 25px;">
            <p style="font-size: 16px; color: black; line-height: 1.6; font-style: italic; font-weight: 300;">You are about to redeem this coupon!</p>
          </div>
  
          <div style="display: flex; justify-content: center; gap: 20px; margin-top: 30px;">
            <button id="confirm-btn" style="background: linear-gradient(145deg, white,rgb(130, 203, 113)); color: white; padding: 12px 30px; border-radius: 30px; font-size: 18px; font-weight: 700; transition: background-color 0.3s ease, transform 0.2s ease; border: none; cursor: pointer; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);">
              Yes, redeem it!
            </button>
            <button id="cancel-btn" style="background: linear-gradient(145deg, white,rgb(235, 122, 122)); color: white; padding: 12px 30px; border-radius: 30px; font-size: 18px; font-weight: 700; transition: background-color 0.3s ease, transform 0.2s ease; border: none; cursor: pointer; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);">
              Cancel
            </button>
          </div>
        </div>
  
        <style>
          @keyframes popup-entrance {
            0% {
              opacity: 0;
              transform: translateY(-30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
  
          #confirm-btn:hover {
            background: linear-gradient(145deg, #f39c12, #e67e22);
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          }
  
          #confirm-btn:active {
            transform: translateY(2px);
          }
  
          #cancel-btn:hover {
            background: linear-gradient(145deg, #bdc3c7, #7f8c8d);
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          }
  
          #cancel-btn:active {
            transform: translateY(2px);
          }
  
          .swal2-popup {
            background: transparent !important;
            border: none !important;
            border-radius: 16px !important;
          }
  
          .swal2-title {
            color: #fff !important;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
          }
  
          .swal2-content {
            color: #fff !important;
          }
  
          .swal2-actions {
            justify-content: center !important;
          }
        </style>
      `,
      showConfirmButton: false,
      showCancelButton: false,
      didOpen: () => {
        const confirmBtn = document.getElementById("confirm-btn");
        const cancelBtn = document.getElementById("cancel-btn");
  
        confirmBtn?.addEventListener("click", () => {
          const petOwnerId = Number(localStorage.getItem('pet_owner_id'));
          const couponId = this.selectedDiscount?.id;
  
          if (!petOwnerId || !couponId) {
            Swal.fire("Missing user or coupon info", "", "error");
            return;
          }
  
          this.discountService.redeemCoupon({ pet_owner_id: String(petOwnerId), coupon_id: couponId }).subscribe({

            next: () => {
              Swal.fire({
                html: `<div style="font-family: 'Promo Regular'; padding: 30px; border-radius: 16px; color: #fff; text-align: center;">
                  <h1 style="color:#1A1A40">Coupon redeemed successfully!</h1><br>
                  <h3 style="color:#1A1A40">Visit the needed branch to redeem the coupon in-store.</h3>
                </div>`,
                icon: "success",
                confirmButtonText: "Okay",
                customClass: {
                  popup: 'swal-popup-success',
                },
                didOpen: () => {
                  const popup = document.querySelector('.swal2-popup') as HTMLElement | null;
                  if (popup) {
                    popup.style.backgroundImage = "url('/assets/img/bgDogs.png')";
                    popup.style.backgroundSize = "cover";
                    popup.style.backgroundPosition = "center";
                  }
                }
              });
            },
            error: (err) => {
              Swal.fire("Redemption failed", err?.error?.message || "Try again later.", "error");
            }
          });
        });
  
        cancelBtn?.addEventListener("click", () => {
          Swal.close();
        });
      }
    });
  }
  

  confirmRedeemAction() {
    if (!this.selectedDiscount) {
      console.warn('No discount selected.');
      return;
    }
  
    // 🔍 Debug log
    console.log('🔔 confirmRedeemAction() called for:', this.selectedDiscount);
  
    this.userAuthService.getAuthenticatedPetOwnerId().then((petOwnerId: number) => {
      console.log('🐾 Pet Owner ID:', petOwnerId);
      console.log('🎟️ Coupon ID:', this.selectedDiscount.id);
  
      this.discountService.redeemCoupon({
        pet_owner_id: petOwnerId.toString(), // ensure it's a string if required by the service
        coupon_id: this.selectedDiscount.id
      }).subscribe({
        next: (res) => {
          console.log('✅ Coupon redeemed:', res);
          this.showRedemptionSuccess();
        },
        error: (err) => {
          console.error('❌ Failed to redeem coupon:', err);
        }
      });
  
    }).catch((err) => {
      console.error('🚫 Error getting pet owner ID:', err);
    });
  }
  
  
  
  
  
 

  closePopup() {
    this.isPopupVisible = false;
  }


  showRedemptionSuccess() {
    Swal.fire({
      html: `<div style="font-family: 'Promo Regular'; padding: 30px; border-radius: 16px; color: #fff; text-align: center;">
        <h1 style="color:#1A1A40">Coupon redeemed successfully!</h1><br>
        <h3 style="color:#1A1A40">Visit the needed branch to redeem the coupon in-store.</h3>
      </div>`,
      icon: "success",
      confirmButtonText: "Okay",
      customClass: {
        popup: 'swal-popup-success',
      },
      didOpen: () => {
        const popup = document.querySelector('.swal2-popup') as HTMLElement | null;
        if (popup) {
          popup.style.backgroundImage = "url('/assets/img/bgDogs.png')";
          popup.style.backgroundSize = "cover";
          popup.style.backgroundPosition = "center";
        }
      }
    });
  }
  

  
}



