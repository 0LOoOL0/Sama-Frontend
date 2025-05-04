import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment';
import axios from 'axios';
import { ProvidersService } from '../../../services/providers.service';
import { ServicePageService } from '../../../services/service-page.service';

export interface provider {
  id: number;
  name: string;
  type: string;
  contact_no: string;
  status: string;
}

export interface service {
  serviceNameEn: string;
  serviceNameAr: string;
  descriptionAr: string;
  descriptionEn: string;
  discount: number;
  priceBefore: number;
  priceAfter: number;
  providerType: string;
  providerId: number;
  contact_no: string;
  status: string;
  pet_type: string[];
}

@Component({
  selector: 'app-hospital-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hospital-services.component.html',
  styleUrls: ['./hospital-services.component.scss'],
})
export class HospitalServicesComponent {

  private apiUrl = `${environment.apiUrl}/api`; // Adjust the endpoint if needed
  services: service[] = [
    {
      serviceNameEn: '',
      serviceNameAr: '',
      descriptionAr: '',
      descriptionEn: '',
      discount: 0,
      priceBefore: 0,
      priceAfter: 0,
      providerType: '',
      providerId: 0,
      contact_no: '',
      status: '',
      pet_type: [],
    },

  ];
  allProviders: provider[] = [];
  selectedProvider: string = '';  // To store the selected provider from the dropdown

  // Array of provider arrays for each service
  providers: provider[][] = [];

  constructor(
    private providersService: ProvidersService,
    private servicesPageService: ServicePageService,
    private router: Router
  ) { }

  ngOnInit() {
    // Fetching all providers and storing them in the providers array
    this.providersService.getAllProviders().then(response => {
      const providersList = response.data;
      providersList.forEach((provider: any) => {
        this.allProviders.push({
          id: provider.id,
          name: provider.name,
          type: provider.type,
          contact_no: provider.contact_no,
          status: provider.status,
        });
      });
    });
  }

  providerTypes = ['groomer', 'pet shop', 'pet clinic', 'doctor', 'trainer'];

  // Update the providers list when provider type changes
  onProviderTypeChange(providerType: string, index: number) {
    this.providers[index] = this.allProviders.filter(
      provider => provider.type === providerType,
    );
  }

  onProviderChange(providerId: number, index: number) {
    const selectedProvider = this.allProviders.find(
      provider => provider.id === +providerId,
    );
    if (selectedProvider) {
      this.services[index].contact_no = selectedProvider.contact_no; // Set contact number
      this.services[index].status = selectedProvider.status; // Set contact number
    }
  }

  addPetType(index: number, petType: string) {
    if (!this.services[index].pet_type) {
      this.services[index].pet_type = [];
    }
    this.services[index].pet_type.push(petType);
  }


  //   ngOnInit() {
  //     // Fetching all providers on component initialization
  //     axios.get(`${this.apiUrl}/providers`).then(response => {
  //       this.allProviders = response.data;
  //     }).catch(error => {
  //       console.error('Error fetching providers:', error);
  //     });
  //   }


  saveAllServices() {
    // Logic to save all services
    const token = localStorage.getItem('token');

    console.log(this.services);
    this.services.forEach(async (service) => {
      console.log('Service:', service);
      const result = await axios.post(this.apiUrl + '/services', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          title: service.serviceNameEn,
          title_AR: service.serviceNameAr,
          short_description: service.descriptionEn,
          short_description_AR: service.descriptionAr,
          percentage: service.discount,
          old_price: service.priceBefore,
          new_price: service.priceAfter,
          image: '',
          contact_number: '',
          pet_type: '',
          provider_id: service.providerId
        }
      });
    });
  }

  addService() {
    this.services.push({
      serviceNameEn: '',
      serviceNameAr: '',
      descriptionEn: '',
      descriptionAr: '',
      discount: 0,
      priceBefore: 0,
      priceAfter: 0,
      providerType: '',
      providerId: 0,
      contact_no: '', // Initialize contact number
      status: '',
      pet_type: [], // Initialize pet types array
    });
    this.providers.push([]); // Add an empty provider list for the new service
  }

  removeService(index: number) {
    this.services.splice(index, 1);
    this.providers.splice(index, 1); // Remove the corresponding provider list
  }

  closeForm() {
    this.router.navigateByUrl('/admin-main/services');
  }
}

