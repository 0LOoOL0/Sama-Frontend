import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../../services/product.service';
import { ProvidersService, Review } from '../../../services/providers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicePageService } from '../../../services/service-page.service';

@Component({
  selector: 'app-sama-store',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './sama-store.component.html',
  styleUrls: ['./sama-store.component.css',
    './custom-style.css', './style.css', './resposiveness.css', '../../../shared/css/style.css'
  ]
})
export class SamaStoreComponent {
  products: any;
  filteredProducts: any[] = [];
  displayedProducts:any;
  reviews: Review[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'All';
  priceRange: { lower: number | null, upper: number | null } = { lower: 0, upper: 200 };
  tempPriceRange: number | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 12;
  maxPages: number = 1;
  clearButton: boolean = false;
  constructor(private productService:ProductService, private providerService:ProvidersService, private router: Router,){
    this.loadProducts();
  }

  async loadProducts() {
    try {
      // Always use provider id 1
      const productsData = await this.productService.getProductsByProvider(1).toPromise();
      if (!productsData) {
        this.products = [];
      } else {
        this.products = productsData.map((product: any) => {
          // If images is missing or empty, set a default value
          if (!product.images || !Array.isArray(product.images) || product.images.length === 0) {
            product.images = ['assets/default-image.png'];
          }
          return product;
        });
      }
      this.applyFilter();
      console.log('products', this.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  
  

  applyFilter() {
    console.log("applyFilter() called");
  console.log("searchQuery:", this.searchQuery, "selectedCategory:", this.selectedCategory, "priceRange:", this.priceRange);
    this.filteredProducts = this.products.filter((product: any) => {
      // Use product.product_name_en for search comparison.
      const matchesSearch =
        this.searchQuery.trim() === '' ||
        product.product_name_en.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      // Convert pet_type array items to lowercase.
      const petTypes: string[] = Array.isArray(product.pet_type)
        ? product.pet_type.map((pt: string): string => pt.toLowerCase())
        : [String(product.pet_type).toLowerCase()];
  
      // Check category match.
      let matchesCategory: boolean;
      if (this.selectedCategory.toLowerCase() === 'other') {
        // "other" means none of the common types (dog, cat, bird)
        matchesCategory = !petTypes.some((pt: string): boolean => ['dog', 'cat', 'bird'].includes(pt));
      } else {
        matchesCategory =
          this.selectedCategory === 'All' ||
          petTypes.some((pt: string): boolean => pt === this.selectedCategory.toLowerCase());
      }
      
      // Use old_price if available, else price_before.
      const priceValue = product.old_price || product.price_before;
      let withinPriceRange = true;
      if (this.priceRange.lower !== null && this.priceRange.upper !== null && priceValue != null) {
        withinPriceRange = priceValue >= this.priceRange.lower && priceValue <= this.priceRange.upper;
      }
      
      
      return matchesSearch && matchesCategory && withinPriceRange;
    });
    
    console.log('filter P', this.filteredProducts);
  
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
      this.clearButton = true;
    } else {
      // Handle invalid price range
      alert("Lower price range can not be more than upper price range");
    }    
      
  }

  clearFilter() {
      this.priceRange.lower = 0;
      this.priceRange.upper = 200;
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

// Updated navigation: when clicking on a product, navigate to the discount-details page.
navigateTodetail(productId: number) {
  this.router.navigate(['/user-main-component/discount-details', productId]);
}

  ngAfterViewInit() {
    this.togglePriceRange();
  }

  togglePriceRange() {
    const minRange = document.getElementById("min-range") as HTMLInputElement | null;
    const maxRange = document.getElementById("max-range") as HTMLInputElement | null;
    const sliderTrack = document.querySelector(".slider-track") as HTMLElement | null;
    const minValueText = document.getElementById("min-value");
    const maxValueText = document.getElementById("max-value");

    function updateSliderTrack() {
      const minValue = minRange ? parseInt(minRange.value) : 0;
      const maxValue = maxRange ? parseInt(maxRange.value) : 0;

      // Ensure min doesn't exceed max
      if (minRange && minValue > maxValue) {
        minRange.value = maxValue.toString();
      }

      const minPercentage = minRange ? (minValue / parseInt(minRange.max)) * 100 : 0;
      const maxPercentage = maxRange ? (maxValue / parseInt(maxRange.max)) * 100 : 0;

      if (sliderTrack) {
        sliderTrack.style.background = `linear-gradient(
          to right,
          #EFEFEF ${minPercentage}%,
          #7C58D3 ${minPercentage}%,
          #7C58D3 ${maxPercentage}%,
          #EFEFEF ${maxPercentage}%
        )`;
      }
      if (minValueText) {
        minValueText.textContent = minValue + " $";
      }
      if (maxValueText) {
        maxValueText.textContent = maxValue + " $";
      }
    }

    if (minRange && maxRange) {
      minRange.addEventListener("input", updateSliderTrack);
      maxRange.addEventListener("input", updateSliderTrack);
      updateSliderTrack(); // Initialize on page load
    }
  }


  addToCart(product: any) {
    const tempCartRaw = localStorage.getItem('tempCart');
    let cartArray: any[] = [];
  
    // If there's existing temp cart data (array), parse it
    if (tempCartRaw) {
      try {
        const parsed = JSON.parse(tempCartRaw);
        cartArray = Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        console.error("Error parsing temp cart:", e);
      }
    }
  
    // Check if product is already in cart
    const alreadyExists = cartArray.find(item => item.product_id === product.id);
    if (alreadyExists) {
      alert('This product is already in the cart!');
      return;
    }
  
    // Add to cart
    const newItem = {
      product_id: product.id,
      provider_id: product.provider_id,
      quantity: 1,
      maxQuantity: product.quantity || 10,
      imageUrl: product.images?.[0] || 'assets/default-image.png',
      label: product.product_name_en,
      price: product.price || product.old_price || product.price_before,
      selected: true
    };
  
    cartArray.push(newItem);
    localStorage.setItem('tempCart', JSON.stringify(cartArray));
    alert('Product added to cart successfully!');
  }
  
}
