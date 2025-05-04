import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { AllProviderService } from '../../../services/all-provider.service';

interface Provider {
  id: number;
  provider_name_en: string;
  profile_image: string;
  type_en: string;  // Updated to match API response
}

@Component({
  selector: 'app-vet-clinics',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './vet-clinics.component.html',
  styleUrls: ['./vet-clinics.component.scss', 
    '../../../shared/css/style.css', 
    '../../../shared/css/custom-style.css', 
    '../../../shared/css/resposiveness.css']
})
export class VetClinicsComponent implements OnInit {
  providers: Provider[] = [];
  filteredProviders: Provider[] = [];
  pages: number[] = [];
  selectedType: string = 'All';
  searchTerm: string = '';
  itemsPerPage: number = 12;
  currentPage: number = 1;
  selectedFilters: string[] = [];
  providerId: any;
  heroHeading: string = "Pet Services and Products";
  heroText = "Sama Pet Care offers everything your pet needs! From veterinary clinics, grooming, training, and pet sitting to a wide range <br> of quality pet products, find it all in one place. Easily locate nearby services and shops across Bahrain. Pet care made easy!";

  availableTypes: string[] = []; // Initialize availableTypes

  constructor(
    private providersService: ProvidersService, 
    private providerServicess: AllProviderService, // Corrected the typo here
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProviders();
    this.providerId = this.providerServicess.setProviderId(1);
  }

  loadProviders() {
    this.providerServicess.getAllProvider().subscribe(
      (response: any) => {
        console.log('API Response:', response); // Debug API response
  
        if (response?.providers && Array.isArray(response.providers)) {
          this.providers = response.providers.map((provider: any) => {
            // Map the provider data and include the type from the galleries table
            return {
              id: provider.id || 0, // Handle missing ID
              provider_name_en: provider.provider_name_en || 'Unknown Name', // Handle missing name
              profile_image: provider.profile_image || 'default_image.jpg', // Fallback for missing image
              type_en: provider.gallery?.type_en?.toLowerCase() || 'unknown', // Use type_en from galleries table
            };
          });
  
          // Get unique types for dynamic filtering
          const uniqueTypes = [...new Set(this.providers.map(p => p.type_en))];
          this.availableTypes = uniqueTypes;
  
          this.filteredProviders = [...this.providers];
          this.updatePages();
        } else {
          console.error('Invalid response structure or no providers found');
        }
      },
      (error) => {
        console.error('Error fetching providers:', error.message);
      }
    );
  }

  updatePages() {
    const totalItems = this.filteredProviders.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  onSearch(term: string) {
    this.searchTerm = term.toLowerCase();
    this.filterProviders();
  }

  filterProviders() {
    this.filteredProviders = this.providers.filter(provider => {
      const matchesSearchTerm = provider.provider_name_en.toLowerCase().includes(this.searchTerm);
      const matchesFilter = this.selectedFilters.length === 0 || this.selectedFilters.includes(provider.type_en);
      return matchesSearchTerm && matchesFilter;
    });
    this.updatePages();
  }

  applyFilter(typeEn: string) {
    // If the same filter is clicked again, clear it
    if (this.selectedFilters.includes(typeEn)) {
      this.clearFilters();
    } else {
      // Apply the new filter
      this.selectedFilters = [typeEn];
      
      // Update hero section dynamically based on the selected filter
      switch (typeEn.toLowerCase()) {
        case 'groomer':
          this.heroHeading = "Groomer Services";
          this.heroText = "Pamper your pet with top-notch grooming services! From bathing and styling to nail trimming and more, Sama Pet Care <br> helps you find trusted groomers near you in Bahrain. Keep your furry friend looking and feeling their best!";
          break;
        case 'vet clinic':
          this.heroHeading = "Vet Clinic Services";
          this.heroText = "Find trusted veterinary clinics near you for your pet’s health and well-being. From routine check-ups to specialized care,<br> Sama Pet Care connects you to experienced veterinarians across Bahrain. Because your pet deserves the best care,<br> always!";
          break;
        case 'pet shop':
          this.heroHeading = "Pet Shop Services";
          this.heroText = "Discover a network of trusted pet shops offering a wide range of pet essentials! From food and toys to accessories and <br> grooming supplies, find everything your pet needs. Easily locate nearby pet shops across Bahrain. Convenience for <br> you, care for your pet!";
          break;
        case 'trainer':
          this.heroHeading = "Trainer Services";
          this.heroText = "Improve your pet's behavior with professional training services! Whether you're looking for obedience training or <br> behavior correction, Sama Pet Care connects you to experienced trainers in Bahrain.";
          break;
        case 'doctor':
          this.heroHeading = "Doctor Services";
          this.heroText = "Ensure your pet gets the best medical attention with experienced veterinarians. Sama Pet Care helps you find trusted pet <br> doctors in Bahrain for all your pet's health needs.";
          break;
        default:
          this.heroHeading = `${typeEn.charAt(0).toUpperCase() + typeEn.slice(1)} Services`;
          this.heroText = `Discover the best ${typeEn} services for your pet.`;
          break;
      }
  
      // Filter providers based on the selected `type_en`
      this.filteredProviders = this.providers.filter(provider => provider.type_en?.toLowerCase() === typeEn.toLowerCase());
      
      // Update pagination after applying the filter
      this.updatePages();
    }
  }


  
  
  

  clearFilters() {
    this.selectedFilters = [];
  
    // Reset hero section to default values
    this.heroHeading = "Pet Services and Products";
    this.heroText = "Sama Pet Care offers everything your pet needs! From veterinary clinics, grooming, training, and pet sitting to a wide range <br> of quality pet products, find it all in one place. Easily locate nearby services and shops across Bahrain. Pet care made easy!";

    
  
    // Show all providers since no filter is selected
    this.filteredProviders = this.providers;
  
    // Update pagination after clearing the filter
    this.updatePages();
  }
  
  
  

  isFilterSelected(filter: string): boolean {
    return this.selectedFilters.includes(filter);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  getDisplayedProviders(): Provider[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProviders.slice(startIndex, startIndex + this.itemsPerPage);
  }

  viewProvider(providerId: number) {
    this.router.navigate(['/provider-details', providerId]);
  }
}
