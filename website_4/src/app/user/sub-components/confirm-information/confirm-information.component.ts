import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetinfoService } from '../../../services/petinfo.service';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../../services/user-auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-confirm-information',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './confirm-information.component.html',
  styleUrls: ['./confirm-information.component.css']
})
export class ConfirmInformationComponent implements OnInit {
  pets: any[] = [];              // Array to store pet information
  petIds: string[] = [];         // To hold multiple pet IDs
  profile: any;
  first: string = '';
  phone: string = '';
  oId: any;
  direct: string = '';

  // Added properties for package details.
  packageId: number | undefined;
  selectedPackage: any = {}; // Expecting an object with name, price, imageUrl, etc.

  constructor(
    private route: ActivatedRoute,
    private petService: PetinfoService,
    private auth: UserAuthService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      // Retrieve petIds from query parameters
      this.petIds = params['petIds'] || [];
      this.direct = params['sub'];

      // Retrieve package details from query parameters
      this.packageId = params['pkgId'] ? Number(params['pkgId']) : undefined;
      if (params['pkgName'] && params['pkgPrice']) {
        this.selectedPackage = {
          name: params['pkgName'],
          price: Number(params['pkgPrice']),
          imageUrl: params['pkgImageUrl'] || ''
        };
      }

      if (!Array.isArray(this.petIds)) {
        this.petIds = [this.petIds]; // Ensure it's an array
      }

      console.log('Retrieved Pet IDs:', this.petIds);
      console.log('Package ID:', this.packageId, 'Selected Package:', this.selectedPackage);
      this.logge();
      this.loadPetInfo();
    });
  }

  ngOnInit() {}

  async logge() {
    const profile = await this.auth.getProfile();
    this.first = profile.first_name;
    this.phone = profile.phone;
    this.oId = profile.id;
    console.log('User Profile:', profile);
    console.log('Combined Info:', this.first + this.phone, this.oId);
  }

  async loadPetInfo() {
    try {
      // Loop through each pet ID and fetch its details
      for (const petId of this.petIds) {
        const resp = await this.petService.getPet(Number(petId)).toPromise();
        this.pets.push(resp); 
      }
      console.log('Retrieved Pet Information:', this.pets);
    } catch (error) {
      console.error('Error fetching pet information:', error);
    }
  }

  continue() {
    if (this.direct === 'free') {
      // Handle free trial logic if needed
    } else {
      // Create one temporary cart object without product ID or cart ID.
      // Quantity is the number of selected pets.
      const tempCart = {
        pet_owner_id: this.oId,
        pet_ids: this.petIds.map(id => Number(id)),
        quantity: this.petIds.length,
        package: {
          id: this.packageId,                   // Package ID from query or selection
          name: this.selectedPackage.name,      // Actual package name selected
          price: this.selectedPackage.price,    // Actual package price (e.g. 10)
          imageUrl: this.selectedPackage.imageUrl // Package image URL if provided
        }
      };
      localStorage.setItem('tempCart', JSON.stringify(tempCart));
      console.log('Temporary cart stored:', tempCart);
      
      // Navigate to the shopping bag page
      this.router.navigate(['user-main-component/shopping-bag']);
    }
  }
}
