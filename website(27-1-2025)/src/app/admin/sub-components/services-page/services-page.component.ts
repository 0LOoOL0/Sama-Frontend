import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicePageService } from '../../../services/service-page.service'; // Adjust path as needed
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit {
  services: any[] = []; // Array to hold fetched services
  filteredServices: any[] = []; // Array to hold filtered services
  searchQuery: string = ''; // Variable to hold the search query
  showHospitalServices: boolean = false; 
  newService: any = {}; // Object to hold new service data


  constructor(private servicePageService: ServicePageService, private router: Router) {}

  ngOnInit() {
    this.loadServices();
  }

  // Function to load services from the backend
  async loadServices() {
    try {
      const data = await this.servicePageService.getServices();
      // Switch array elements key title(AR) to titleAr
      data.forEach((element: any) => {
        element.titleAr = element["title(AR)"];
        element.short_descriptionAr = element["short_description(AR)"];
        delete element["title(AR)"];
        delete element["short_description(AR)"];
      });
      console.log('Fetched services data:', data);
      this.services = data;
      this.filteredServices = data; // Initialize filtered services
    } catch (error) {
      console.error('Error loading services:', error);
    }
  }

  // Function to filter services based on the search query
 // Function to filter services based on the search query
filterServices() {
  if (this.searchQuery.trim() === '') {
    this.filteredServices = this.services;
  } else {
    const query = this.searchQuery.toLowerCase();
    this.filteredServices = this.services.filter(service => {
      const title = service.title ? service.title.toLowerCase() : '';
      const titleAr = service.titleAr ? service.titleAr.toLowerCase() : '';
      return title.includes(query) || titleAr.includes(query);
    });
  }
}
   // Function to open form/modal to add a new service
   openAddServiceForm() {
    this.newService = {}; // Reset new service data
    this.showHospitalServices = true; // Display the form or modal
  }

  // Function to save a new service
  async addService() {
    try {
      await this.servicePageService.addService(this.newService);
      this.services.push(this.newService); // Add the new service to the list
      this.filteredServices.push(this.newService); // Add to filtered list
      console.log('New service added:', this.newService);
      this.showHospitalServices = false; // Hide the form or modal
    } catch (error) {
      console.error('Error adding service:', error);
    }
  }

  // Delete Service
  async deleteService(serviceId: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete this service?');
    if (!confirmDelete) {
      return; // Exit if the user does not confirm
    }
    try {
      await this.servicePageService.deleteService(serviceId);
      console.log('Deleting service with ID:', serviceId);
      this.services = this.services.filter((service: any) => service.id !== serviceId);
      this.filterServices(); // Update filtered services list after deletion
      console.log('Updated services list after deletion:', this.services);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  }

  // Delete All Services
  async deleteAllServices() {
    const confirmDeleteAll = window.confirm('Are you sure you want to delete all services?');
    if (!confirmDeleteAll) {
      return; // Exit if the user does not confirm
    }
    try {
      await this.servicePageService.deleteAllServices(); // Call the service method to delete all services
      this.services = []; // Clear the list after deleting
      this.filteredServices = []; // Clear the filtered services list as well
      console.log('All services deleted.');
    } catch (error) {
      console.error('Error deleting all services:', error);
    }
  }
  goToServiceForm() {
    this.router.navigateByUrl('/admin-main/hospitalservice');
  }
}


  



  // addService() {
  //   this.editingService = {
  //     id: 0,
  //     title: '',
  //     short_description: '',
  //     old_price: 0,
  //     new_price: 0,
  //     percentage: 0,
  //     contact_number: '',
  //     pet_type: '',
  //     image: '',
  //     short_description_AR: '',
  //     title_AR: '',
  //     status: 'Online',
  //     provider_id: 1 // This should be set dynamically if needed
  //   };
  //   this.showHospitalServices = true;
  // }

  // editService() {
  //   // this.editingService = { ...service };
  //   this.showHospitalServices = true;
  // }

  // closeHospitalServices() {
  //   this.showHospitalServices = false;
  // }

  // async saveHospitalService(updatedService: ServiceModel) {
  //   try {
  //     if (this.editingService && this.editingService.id) {
  //       // Update existing service
  //       await this.servicePageService.updateService(this.editingService.id, updatedService);
  //       const index = this.services.findIndex(service => service.id === this.editingService!.id);
  //       if (index !== -1) {
  //         this.services[index] = updatedService;
  //       }
  //     } else {
  //       // Add a new service
  //       const newService = await this.servicePageService.createService(updatedService);
  //       this.services.push(newService);
  //     }
  //     this.showHospitalServices = false;
  //   } catch (error) {
  //     console.error('Error saving service:', error);
  //   }
  // }

