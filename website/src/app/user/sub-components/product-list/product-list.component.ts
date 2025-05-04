import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../../services/product.service';
import { ProvidersService, Review } from '../../../services/providers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicePageService } from '../../../services/service-page.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css',
    './custom-style.css', './style.css', './resposiveness.css'
  ]
})
export class ProductListComponent {

  products: any;
  services: any;
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


  constructor(private productService:ProductService, private providerService:ProvidersService, private router: Router,
    private serviceService:ServicePageService
  ){
    this.loadProducts();
  }

  async loadProducts() {
    try {
      this.products = await this.productService.getProducts().toPromise();
      console.log('products', this.products);
      this.loadServices();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
   async loadServices(){
    try{  
      await this.serviceService.getServices().then((data: any) => {
        this.services = data;
        console.log('services', this.services);
        this.applyFilter();
      });
      
    }catch(error){
      console.error('Error fetching products:', error);
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
        this.filteredProducts = this.services.filter((service: any) => {
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
}
