import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PetOwnerService } from '../../../services/pet-owner.service';
import { CommonModule } from '@angular/common';
import { CouponService } from '../../../services/coupon.service';
import { ProvidersService } from '../../../services/providers.service';
import { PetinfoService } from '../../../services/petinfo.service';
@Component({
  selector: 'app-my-cards',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.css',
    './style.css', './resposiveness.css', './custom-style.css'
  ]
})
export class MyCardsComponent implements OnInit{
  pets:any;
  prof:any;
  pet:any;
  coupon:any[] = [];
  usedCoupon:any[] = [];
  providers:{ id: number, name: string }[] = [];

  constructor(private petOwner: PetOwnerService, private coupons:CouponService, private proService:ProvidersService,
    private petInfo:PetinfoService
  ){}

  ngOnInit(): void {
    this.checkProfile();
  }
  async checkProfile(){
    await this.petOwner.getProfile().then((data:any) => {
      this.prof = data;
      this.getPets();
      this.getCoupons();
    });
    
  }
  async getPets(){
    this.pets = (await this.petOwner.getPetsByOwnerId(this.prof.id)).pets;
    this.pets.forEach(async (element: any) => {
      try{
        const mem = (await this.petInfo.getPetMembership(element.id) as any).data.data;
        
        if(mem){
          element.memberShip = true;
          element.end_date = mem.end_date;
        }
      }catch(e){
        element.memberShip = false;
          element.end_date = '';
      }
      
    });
    
      this.pet = this.pets[0];
    
  }

  async getCoupons(){
    const coupon = await this.coupons.getCouponUsagesByOwnerId(this.prof.id).toPromise();
    var proIds:number[] = []; 
    if(coupon != null){
      coupon[0].date_of_usage = '';
      for (const element of coupon) {
        if (element.date_of_usage === '') {
          const cc = await this.coupons.getCouponById(element.coupon_id).toPromise();
          if (cc) {
            proIds.push(cc.provider_id);
            this.usedCoupon.push(cc);
          }
        } else {
          const cc = await this.coupons.getCouponById(element.coupon_id).toPromise();
          if (cc) {
            proIds.push(cc.provider_id);
            this.coupon.push(cc);
          }
        }
      }    
    const uniqueProviderIds = Array.from(new Set(proIds));
    
    // Wait for all asynchronous operations to complete before calling getProviderNames
    await Promise.all(uniqueProviderIds.map(id => this.getProviderNames(id)));
    }
  }

  async getProviderNames(id: number) {
    const data: { name: string }[] = (await this.proService.getProviderById(id) as { data: { name: string }[] }).data;
    this.providers.push({ id: id, name: data[0].name });  
  }

  getProviderNameById(id: number): string {
    const provider = this.providers.find(provider => provider.id === id);
    return provider ? provider.name : 'Unknown Provider';
  }

  onPetChange(i: any) { 
    this.pet = this.pets[i];
  }

}
