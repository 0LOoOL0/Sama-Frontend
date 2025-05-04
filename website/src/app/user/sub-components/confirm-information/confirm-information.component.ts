import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetinfoService } from '../../../services/petinfo.service';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../../services/user-auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartService, Cart } from '../../../services/cart.service';

@Component({
  selector: 'app-confirm-information',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './confirm-information.component.html',
  styleUrl: './confirm-information.component.css'
})
export class ConfirmInformationComponent implements OnInit {
  pets: any[] = []; // Array to store pet information
  petIds: string[] = []; // To hold multiple pet IDs
  profile:any;
  first: string = '';
  phone: string ='';
  oId:any;
  direct: string= '';

  constructor(private route: ActivatedRoute, private petService: PetinfoService, private auth: UserAuthService, 
    private router: Router, private cart: CartService) {
    this.route.queryParams.subscribe(params => {
      // Directly retrieve petIds as an array
      this.petIds = params['petIds'] || []; // This will be an array of strings
      this.direct = params['sub']
      if (!Array.isArray(this.petIds)) {
        this.petIds = [this.petIds]; // Ensure it's an array
      }
  
      console.log('Retrieved Pet IDs:', this.petIds);
      this.logge();
      this.loadPetInfo();
    });
  }

  ngOnInit() {
    
  }

  async logge(){
    const profile = await this.auth.getProfile();
    this.first = profile.first_name;
    this.phone = profile.phone;
    this.oId = profile.id;
    console.log(profile);
    console.log('ss', this.first + this.phone, this.oId);
  }

  async loadPetInfo() {
    try {
      // Loop through each pet ID and fetch their details
      for (const petId of this.petIds) {
        const resp = await this.petService.getPet(Number(petId)).toPromise(); // Fetch pet details by ID
        this.pets.push(resp); 
      }
      console.log('Retrieved Pet Information:', this.pets);
    } catch (error) {
      console.error('Error fetching pet information:', error);
    }
  }

  continue(){
    if(this.direct === 'free'){
      //do something to sub the pet for free trial
    }
    else{
      for (let i = 0; i < this.petIds.length; i++) {
        const cr: Cart = {
          pet_owner_id: this.oId,
          product_id: 1,
          pet_id: Number(this.petIds[i]),
          quantity: 1,
          id: 0
        };
        this.cart.createCart(cr).toPromise().then((resp:any) =>{
          console.log('order has been sent to cart', i);
        });
      }
      
      this.router.navigate(['user-main-component/shopping-bag']);
    }
  }
}
