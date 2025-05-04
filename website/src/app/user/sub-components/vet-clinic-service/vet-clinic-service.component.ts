import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ProvidersService, Review } from '../../../services/providers.service';
import { AmPmTimePipe } from '../../../shared/am-pm-time/am-pm-time.pipe';
import { ItemByProviderComponent } from '../item-by-provider/item-by-provider.component';
import { AllProviderService } from '../../../services/all-provider.service';
@Component({
  selector: 'app-vet-clinic-service',
  standalone: true,
  imports: [AmPmTimePipe, AmPmTimePipe, CommonModule,ItemByProviderComponent],
  templateUrl: './vet-clinic-service.component.html',
  styleUrls: ['./vet-clinic-service.component.css',
    './style.css', './resposiveness.css', './custom-style.css'
  ]
})
export class VetClinicServiceComponent implements OnInit {
  provider: any;
  avail: any;
  time:any;
  services:any;
   products: any;
    // services: any;
    filteredProducts: any[] = [];
    displayedProducts:any;
    reviews: Review[] = [];
    searchQuery: string = '';
    selectedCategory: string = 'All';
    priceRange: { lower: number | null, upper: number | null } = { lower: 0, upper: 100 };
    tempPriceRange: number | null = null;
    direction: Number = 1;
    currentPage: number = 1;
    itemsPerPage: number = 12;
    maxPages: number = 1;
    providerId:any
  constructor(private route: ActivatedRoute, private location: Location, private providers: ProvidersService,provoderServicess:AllProviderService){

  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  

    this.getProvider(id);
  }

  async getProvider(id: number) {
    try {
      // Get provider by ID and ensure it's an array
      
      const providerResponse = await this.providers.getProviderById(id);
      if (providerResponse && Array.isArray(providerResponse.data)) {
        this.provider = providerResponse.data[0]; // Assuming the provider data is an array


        console.log("this is provider id",this.provider)
      } else {
        console.error('Provider data is not in expected array format');
        return;
      }
  
      // Parse availability_hours and availability_days
      if (this.provider.availability_hours) {
        this.time = JSON.parse(this.provider.availability_hours);
      } else {
        this.time = {}; // Default to empty object if not available
      }
  
      if (this.provider.availability_days) {
        this.avail = JSON.parse(this.provider.availability_days);
      } else {
        this.avail = []; // Default to empty array if not available
      }
  
      // Log provider data
      console.log('Provider:', this.provider);
  
      // Get services by provider ID
      const servicesResponse = await this.providers.getServicesByProviderId(this.provider.id);
      this.services = servicesResponse.data;
  
      // Log services data
      console.log('Services by provider id:', this.services);
    } catch (error) {
      console.error('Error fetching provider data:', error);
    }
  }
  

  checkAvailability(day: string): boolean {
    return this.avail.includes(day.toLowerCase());
  }
  
}
