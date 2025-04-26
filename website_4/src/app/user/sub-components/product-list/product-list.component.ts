import { Component, OnInit } from '@angular/core';
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
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './product-list.component.html',
  styleUrls: [
    './product-list.component.css',
    './custom-style.css',
    './style.css',
    './resposiveness.css',
    '../../../shared/css/style.css',
    '../../../shared/css/custom-style.css',
    '../../../shared/css/resposiveness.css'
  ]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  displayedProducts: any;
  reviews: Review[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'All';
  priceRange: { lower: number | null, upper: number | null } = { lower: 0, upper: 100 };
  currentPage: number = 1;
  itemsPerPage: number = 12;
  maxPages: number = 1;
  direction: number = 1; // 1 for products, 2 for services

  constructor(
    private productService: ProductService,
    private providerService: ProvidersService,
    private router: Router,
    private serviceService: ServicePageService
  ) {
    // You can choose to load products on component construction or in ngOnInit.
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      // Load all products from your API
      const allProducts: any = await this.productService.getProducts().toPromise();

      // Filter out products from provider id = 1
      // Then map each product to add a simpler "name" and "price" property.
      this.products = allProducts
        .filter((product: any) => product.provider_id !== 1)
        .map((product: any) => ({
          ...product,
          name: product.product_name_en, // alias for easier binding
          price: product.price,            // using 'price' as the price property
          // Ensure images is an array (use a default if empty)
          images: (product.images && Array.isArray(product.images) && product.images.length > 0)
            ? product.images
            : ['assets/default-image.png'],
          // Ensure pet_type is an array
          pet_type: Array.isArray(product.pet_type)
            ? product.pet_type
            : [product.pet_type]
        }));
      
      // After mapping, apply the filter (initially with no search so all products are shown)
      this.applyFilter();
      console.log('Loaded products:', this.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  applyFilter() {
    // For products, use the mapped 'name' and 'price' properties.
    this.filteredProducts = this.products.filter((product: any) => {
      // Search: compare lowercase names.
      const matchesSearch = this.searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Convert pet_type array items to lowercase for category check.
      const petTypes: string[] = product.pet_type.map((pt: string) => pt.toLowerCase());

      // Category filtering.
      let matchesCategory: boolean;
      if (this.selectedCategory.toLowerCase() === 'other') {
        // "other" means none of the common types (dog, cat, bird)
        matchesCategory = !petTypes.some(pt => ['dog', 'cat', 'bird'].includes(pt));
      } else {
        matchesCategory =
          this.selectedCategory === 'All' ||
          petTypes.some(pt => pt === this.selectedCategory.toLowerCase());
      }

      // Use price (if available) and check against the price range.
      const priceValue = Number(product.price);
      let withinPriceRange = true;
      if (this.priceRange.lower !== null && this.priceRange.upper !== null && priceValue != null) {
        withinPriceRange = priceValue >= this.priceRange.lower && priceValue <= this.priceRange.upper;
      }

      return matchesSearch && matchesCategory && withinPriceRange;
    });

    console.log('Filtered products:', this.filteredProducts);

    // Update pagination after filtering.
    this.currentPage = 1;
    this.totalPages();
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedProducts = this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages() {
    this.maxPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
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
    if (this.priceRange.lower !== null && this.priceRange.upper !== null && this.priceRange.lower <= this.priceRange.upper) {
      this.applyFilter();
    } else {
      alert("Lower price range cannot be more than upper price range");
    }
  }

  clearFilter() {
    this.priceRange.lower = 0;
    this.priceRange.upper = 100;
    this.applyFilter();
  }

  async loadReviews(productId: number) {
    try {
      const response = await this.providerService.getProductReviewsByProductId(productId);
      this.reviews = response.data as Review[];

      let totalRating: number = 0.0;
      const reviewCount = this.reviews.length;
      this.reviews.forEach(review => totalRating += review.rate);
      const averageRating = reviewCount > 0 ? parseInt((totalRating / reviewCount).toFixed(2)) : 0;
      return averageRating;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return 0;
    }
  }

  navigateTodetail(productId: number) {
    this.router.navigate(['/user-main-component/product-details', productId]);
  }
}
