import { Component, OnInit } from '@angular/core';
import { PetInfoService, Pet } from '../services/pet-info.service'; 
import { AuthService } from '../services/auth.service'; 
import * as QRCode from 'qrcode';
import { NavController } from '@ionic/angular';
import { Observable, from, forkJoin } from 'rxjs';
import { ModalController, AlertController  } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import { CouponService, Coupon, CouponUsage } from '../services/coupon.service';
import { PackageService } from '../services/package.service';
@Component({
  selector: 'app-qr-card',
  templateUrl: './qr-card.page.html',
  styleUrls: ['./qr-card.page.scss'],
})
export class QRCardPage implements OnInit {
  segment: string = 'coupons';
  pets: any[] = [];
  profile: any = {};
  petOwnerId: number = 0;
  selectedPet: any | undefined;
  selectedPetId: number | undefined;
  selectedCouponId: number | null = null; 
  coupons: Coupon[] = [];  
  qrCodeUrl: string | undefined;
  usedCoupons: CouponUsage[] = []; 
  hasActiveMembership: boolean = false; 
  noMembershipMessage: boolean = false; 
  membershipEndDate: Date | undefined = undefined;
  //for redeem
  showRedeemModal: boolean = false;
  redeemCode: string = ''; 
  constructor(
    private couponService: CouponService,
    private authService: AuthService,
    private petInfoService: PetInfoService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private alertController: AlertController, 
    private packageService: PackageService,
  ) {}

  async ngOnInit() {
    try {
      const profileData = await this.authService.fetchProfileData();
      this.profile = profileData;
      console.log('Profile data:', this.profile);
      this.petOwnerId = this.profile.id;
      
      await this.fetchCouponUsages(this.petOwnerId);
      await this.fetchMembershipCoupons();
  
      this.petInfoService.fetchPets()
        .then((petsData: any) => {
          this.pets = petsData;
          this.loadImages(this.pets);
          console.log('Fetched pets:', this.pets);
          return this.checkActiveMemberships();
        })
        .then((activeMembership) => {
          this.hasActiveMembership = activeMembership; 
          this.noMembershipMessage = !activeMembership; // Set the membership status
        })
        .catch(error => {
          console.error('Error fetching pets data:', error);
        });
      
      this.generateQrCode();
    } catch (error) {
      console.error('Error initializing component:', error);
    }
  }
  
  async fetchMembershipCoupons() {
    if (this.coupons.length > 0) {
      console.log('Coupons already fetched:', this.coupons);
      return; 
    }
  
    try {
      // Fetch used coupons from the service directly
      const couponUsages = await this.couponService.getCouponUsagesByOwnerId(this.petOwnerId).toPromise();
      console.log('Fetched coupon usages:', couponUsages);
  
      // Extract the used coupon IDs
      const usedCouponIds = couponUsages?.map(couponUsage => couponUsage.coupon_id);
      console.log('Used Coupon IDs:', usedCouponIds);
  
      // Fetch membership coupons
      this.couponService.getMembershipCoupons().subscribe(
        (coupons: Coupon[]) => {
          console.log('Fetched membership coupons:', coupons);
  
          // Filter out used coupons
          this.coupons = coupons.filter(coupon => !usedCouponIds?.includes(coupon.id));
          console.log('Available coupons after removing used ones:', this.coupons);
        },
        (error) => {
          console.error('Error fetching membership coupons:', error);
        }
      );
    } catch (error) {
      console.error('Error fetching coupon usages:', error);
    }
  }

  checkActiveMemberships(): Promise<boolean> {
    return this.packageService.fetchMemeberships()
      .then((response: any) => {
        const membershipsData = response.data.data;
  
        // Filter memberships for the fetched pets
        const petIds = this.pets.map((pet: any) => pet.id);
        const filteredMemberships = membershipsData.filter((membership: any) =>
          petIds.includes(membership.pet_id)
        );
  
        // Check for active memberships in the filtered list
        const hasActiveMembership = filteredMemberships.some((membership: any) => {
          const today = new Date();
          const endDate = new Date(membership.end_date);
          return endDate >= today; // Active membership check
        });
  
        console.log('Has active membership:', hasActiveMembership);
        return hasActiveMembership; // Return true or false based on the check
      })
      .catch(error => {
        console.error('Error fetching memberships:', error);
        return false; // Handle errors gracefully
      });
  }

  async fetchCouponUsages(ownerId: number) {
    this.couponService.getCouponUsagesByOwnerId(ownerId).pipe(
      switchMap((couponUsages: CouponUsage[]) => {
        const couponIds = couponUsages.map(couponUsage => couponUsage.coupon_id);
        const uniqueCouponIds = [...new Set(couponIds)]; 

        const couponRequests = uniqueCouponIds.map(couponId =>
          this.couponService.getCouponById(couponId).pipe(
            map((coupon: Coupon) => {
              const usage = couponUsages.find(cu => cu.coupon_id === couponId);
              if (usage) {
                usage.coupon = coupon; 
                return usage; 
              }
              return undefined; 
            })
          )
        );

        return forkJoin(couponRequests).pipe(
          map(couponsWithDetails => couponsWithDetails.filter((couponUsage): couponUsage is CouponUsage => couponUsage !== undefined))
        );
      })
    ).subscribe(
      (couponsWithDetails: CouponUsage[]) => {
        this.usedCoupons = couponsWithDetails;
        console.log('Fetched coupon usages with details:', this.usedCoupons);
      },
      (error) => {
        console.error('Error fetching coupon details:', error);
      }
    );
  }


  selectPet(petId: number) {
    console.log(petId);
    this.selectedPetId = petId;
    this.selectedPet = this.pets.find(pet => pet.id === petId);
    
    this.checkActiveMembershipsForPet(this.selectedPetId).then(({ hasActiveMembership, endDate }) => {
      this.hasActiveMembership = hasActiveMembership; 
      this.noMembershipMessage = !hasActiveMembership; // Set the membership status
      this.membershipEndDate = endDate; // Store the end date
      if (hasActiveMembership) {
        this.generateQrCode(); 
        this.fetchMembershipCoupons(); // Fetch coupons if there is a membership
      } else {
        this.qrCodeUrl = undefined; // Clear QR code URL
      }
    });
  }
  
  checkActiveMembershipsForPet(petId: number): Promise<{ hasActiveMembership: boolean; endDate?: Date }> {
    return this.packageService.fetchMemeberships()
      .then((response: any) => {
        const membershipsData = response.data.data;
        const membership = membershipsData.find(
          (membership: any) => membership.pet_id === petId && new Date(membership.end_date) >= new Date()
        );
  
        return {
          hasActiveMembership: !!membership,
          endDate: membership ? new Date(membership.end_date) : undefined
        };
      })
      .catch(error => {
        console.error('Error checking memberships:', error);
        return { hasActiveMembership: false };
      });
  }
  

  async loadImages(pets: any) {
    for (let pet of pets) {
      if (pet.image) {
        pet.imageUrl = await this.petInfoService.uploadImage(pet.image);
      }
    }
  }

  generateQrCode() {

    if (!this.selectedPetId) {
      this.qrCodeUrl = undefined; // Clear the QR code URL if no pet is selected
      return; // Exit the method early
    }

    const cardUrl = `http://localhost:4300/qrcode/${this.selectedPetId}`;

    
    QRCode.toDataURL(cardUrl)
      .then(url => {
        this.qrCodeUrl = url; 
      })
      .catch(err => {
        console.error('QR Code generation failed:', err);
      });
  }
  
  openRedeemModal(couponId: number) {
    this.selectedCouponId = couponId;
    this.showRedeemModal = true;
  }

  closeRedeemModal() {
    this.showRedeemModal = false;
    this.selectedCouponId = null; 
  }

  
  async submitRedeemCode() {
    if (this.selectedCouponId === null) {
      await this.presentAlert('Error', 'Selected coupon ID is null.');
      return;
    }
  
    if (this.redeemCode === '') {
      await this.presentAlert('Error', 'Redeem code is empty.');
      return;
    }
  
    console.log('Coupon ID:', this.selectedCouponId);
    console.log('Redeem Code:', this.redeemCode);
    try {
      const coupon = await this.couponService.getCouponById(this.selectedCouponId).toPromise();
  
      if (coupon?.code === this.redeemCode) {
        console.log('Redeem code is valid.');
        
        const dateOfUsage = new Date().toISOString().split('T')[0];
        await this.couponService.addCouponUsage(this.petOwnerId, this.selectedCouponId, dateOfUsage);

        await this.couponService.reduceCouponQuantity(this.selectedCouponId);

        await this.presentAlert('Success', 'Coupon redeemed successfully!');
      } else {
        console.log('Invalid redeem code.');
        await this.presentAlert('Error', 'Invalid redeem code.');
      }
    } catch (error) {
      console.error('Error fetching coupon or adding coupon usage:', error);
      await this.presentAlert('Error', 'An error occurred while redeeming the coupon.');
    } finally {
      this.closeRedeemModal();
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();

    await alert.onDidDismiss();
    //reload
    this.coupons = []; 
    this.usedCoupons = [];
    await this.fetchMembershipCoupons(); 
    await this.fetchCouponUsages(this.petOwnerId);
  }
}

