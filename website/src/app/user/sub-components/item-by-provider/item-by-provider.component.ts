import { Component } from '@angular/core';
import { ProvidersService, Review } from '../../../services/providers.service';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ServicePageService } from '../../../services/service-page.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AllProviderService } from '../../../services/all-provider.service';



export interface Product {
  id: number;
  image: string;
  new_price: number;
  old_price: number;
  percentage: number;
  pet_type: string | null;
  provider_id: number;
  service_image_url: string | null;
  short_description: string;
  short_description_ar: string;
  status: string;
  title: string;
  title_ar: string;
}
export interface Service {
  id: number;
  image: string;
  new_price: number;
  old_price: number;
  percentage: number;
  pet_type: string | null;
  provider_id: number;
  service_image_url: string | null;
  short_description: string;
  short_description_ar: string;
  status: string;
  title: string;
  title_ar: string;
}


@Component({
  selector: 'app-item-by-provider',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './item-by-provider.component.html',
  styleUrls: ['./item-by-provider.component.css','./style.css', './resposiveness.css', './custom-style.css' ]
})
export class ItemByProviderComponent {
  products: Product[] =[];
    servicess: Service[]=[];
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
    providerId!: number
  
constructor(private productService:ProductService, private providerService:ProvidersService, private router: Router,
    private serviceService:ServicePageService,private provoderServicess:AllProviderService
  ){
  }

  ngOnInit() {
    this.loadProducts();
    this.loadServices()



  }


  activeTab: string = 'product'; // default tab is product

  // Function to show product tab
  product(): void {
    this.activeTab = 'product';
  }

  // Function to show service tab
  service(): void {
    this.activeTab = 'service';
  }

  async loadProducts() {
    try {
      const providerId = this.provoderServicess.getProviderId();
      console.log(providerId);
  
      if (!providerId) {
        console.error('Provider ID is invalid or undefined');
        return;
      }
  
      this.provoderServicess.getProductByProviders(providerId).subscribe(
        (response: any) => {
          console.log('Full Response:', response);
  
          // Map response to Product interface
          this.products = response.map((product: any) => ({
            id: product.id,
            image: product.image_url || 'assets/default-image.png',
            new_price: product.new_price,
            old_price: product.old_price,
            percentage: product.discount || 0, // Default value if percentage is null
            pet_type: product.pet_type,
            provider_id: product.provider_id,
            service_image_url: product.image_url, // Assuming service_image_url uses the same value as image_url
            short_description: product.product_description_en,
            short_description_ar: product.product_description_ar,
            status: product.status,
            title: product.product_name_en,
            title_ar: product.product_name_ar || '', // Default empty if null
          }));
  
          console.log('Mapped Products:', this.products);
        },
        (error) => {
          console.error('Error in API call:', error);
        }
      );
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  async loadServices() {
    try {
      const providerId = this.provoderServicess.getProviderId();
      console.log(providerId);
  
      if (!providerId) {
        console.error('Provider ID is invalid or undefined');
        return;
      }
  
      this.provoderServicess.GetService(providerId).subscribe(
        (response: any) => {
          console.log('Full Response:', response);
  
          // Map response to Service interface
          this.servicess = response.map((service: any) => ({
            id: service.id,
            image: service.image || 'assets/default-image.png',
            new_price: service.new_price,
            old_price: service.old_price,
            percentage: service.percentage || 0,
            pet_type: service.pet_type,
            provider_id: service.provider_id,
            service_image_url: service.service_image_url || service.image, // Fallback to `image` if `service_image_url` is null
            short_description: service.short_description,
            short_description_ar: service.short_description_ar,
            status: service.status,
            title: service.title,
            title_ar: service.title_ar,
          }));
  
          console.log('Mapped Services:', this.servicess);
        },
        (error) => {
          console.error('Error in API call:', error);
        }
      );
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }
  
  



  applyFilter() {
    if (this.direction == 1) {
        this.filteredProducts = this.products.filter((product: any) => {
          const matchesSearch = this.searchQuery.trim() === '' || product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          var matchesCategory;
          if(this.selectedCategory === 'other') {        
              matchesCategory = !['dog', 'cat', 'bird'].includes(product.pet_type.toLowerCase());
            }else{
              matchesCategory = this.selectedCategory === 'All' || product.pet_type.includes(this.selectedCategory);
            }
          var withinPriceRange = true;
          if (this.priceRange !== null) {
            if(this.priceRange.lower !== null && this.priceRange.upper !== null){
              withinPriceRange = product.old_price >= this.priceRange.lower && product.old_price <= this.priceRange.upper;
            }   
          }
          return matchesSearch && matchesCategory && withinPriceRange;
        });
        console.log('filter P', this.filteredProducts);
    } else if (this.direction == 2) {
        this.filteredProducts = this.servicess.filter((service: any) => {
          const matchesSearch = this.searchQuery.trim() === '' || service.title.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesCategory = this.selectedCategory === 'All' || service.pet_type.includes(this.selectedCategory);
          var withinPriceRange = true;
          if (this.priceRange !== null) {
            if(this.priceRange.lower !== null && this.priceRange.upper !== null){
              withinPriceRange = service.old_price >= this.priceRange.lower && service.old_price <= this.priceRange.upper;
            }            
          }
          return matchesSearch && matchesCategory && withinPriceRange;
        });
        console.log('filter S', this.filteredProducts);
    }
        // Update pagination
        this.currentPage = 1; // Reset to the first page when applying filter
        this.totalPages();
        this.updatePagination();
        
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedProducts = this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages(){
    this.maxPages =  Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilter();
  }

  applyPriceFilter() {
    if (this.priceRange.lower !== null && this.priceRange.upper !== null 
      && this.priceRange.lower <= this.priceRange.upper) {
      this.applyFilter();
      const clearPriceElement = document.getElementById('clearPrice');
      clearPriceElement && (clearPriceElement.style.display = 'block');
    } else {
      // Handle invalid price range
      alert("Lower price range can not be more than upper price range");
    }    
      
  }

  clearFilter() {
    const element = document.getElementById('clearPrice');

    if (element) {
      this.priceRange.lower = 0;
      this.priceRange.upper = 100;
      element.style.display = 'hide'; // Hide the element
      this.applyFilter();
    }
  }

  switchDeriction(i: Number){
    this.direction = i;
    this.applyFilter();
  }
  
  async loadReviews(productId: number) {
    try {
      const response = await this.providerService.getProductReviewsByProductId(productId);
      this.reviews = response.data as Review[];

      let totalRating: number = 0.0;
      const reviewCount = this.reviews.length;

      this.reviews.forEach(review => {
        totalRating += review.rate;
      });
      const averageRating = reviewCount > 0
        ? parseInt((totalRating / reviewCount).toFixed(2))
        : 0;
        return averageRating;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return 0;
    }
  }

  navigateTodetail(i: number){
    this.router.navigate(['/user-main-component/product-details', i]);
  }

  navigateToServicedetail(i: number){
    this.router.navigate(['/user-main-component/service-details', i]);
  }
}
