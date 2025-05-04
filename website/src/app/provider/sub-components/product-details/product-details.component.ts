import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderAuthService } from '../../../services/provider-auth.service';
import { ChangeDetectorRef } from '@angular/core';
import {
  ProvidersService,
  Review,
  PetOwner,
} from '../../../services/providers.service';
import { empty } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productId: number | undefined;
  product?: Product;
  reviews: Review[] = [];
  selectedImage: string | undefined;
  averageRating: number = 0.0;
  reviewCount: number = 0;
  type: string = 'product';
  arrayNumbers: number[] = [1,2,3,4,5];

  quantity = 1;
  maxQuantity = 10;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private providerService: ProvidersService,
    private authService: ProviderAuthService,
    private cdr: ChangeDetectorRef,
    
  ) {
    this.productId = 1;
  }

  async ngOnInit() {
    try {
      const isAuthenticated = await this.authService.verifyAuthentication();
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
        return;
      }

      //this.productId = +this.activatedRoute.snapshot.paramMap.get('id')! || 1;
      if (this.productId) {
        await this.loadProduct(this.productId);
        await this.loadReviews(this.productId);
      }
    } catch (error) {
      console.error('Error initializing product details:', error);
      this.router.navigate(['/login']);
    }
  }

  async loadProduct(id: number) {
    this.productService.getProductById(id).subscribe(
      async product => {
        console.log('Product fetched successfully:', product);

        this.product = {
          ...product,
          images: product.images || [],
        };

        this.selectedImage = this.product.images[0];

        this.maxQuantity = product.quantity || 10;

        const profile = await this.authService.fetchProfileData();
      },
      error => {
        console.error('Error fetching product:', error);
      },
    );
    // try {
    //   const response = await this.providerService.getProductById(id);
    //   const productData = response.data;
    //   console.log("proData:", productData );
    //   if (productData) {
    //     this.product = {
    //       ...productData,
    //       images: productData.images ? JSON.parse(productData.images) : [],
    //       isInCart: productData.isInCart || false,
    //     };
    //     // if (this.product.images && this.product.images.length > 0) {
    //     //   this.selectedImage = this.product.images[0];
    //     // }
    //     // this.maxQuantity = this.product.quantity || 10;
    //   }
    // } catch (error) {
    //   console.error('Error fetching product:', error);
    // }
  }

  async loadReviews(productId: number) {
    try {
      const response = await this.providerService.getProductReviewsByProductId(productId);
      this.reviews = response.data;

      let totalRating: number = 0.0;
      this.reviewCount = this.reviews.length;

      this.reviews.forEach(review => {
        totalRating += review.rate;
      });
      this.averageRating = this.reviewCount > 0
        ? parseFloat((totalRating / this.reviewCount).toFixed(2))
        : 0.0;
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }
  getStarArray(): number[] {
    const starCount = Math.round(this.averageRating); // Rounding average rating for simplicity
    return Array(starCount).fill(0).map((_, index) => index);
  }

  changeMainImage(image: string) {
    this.selectedImage = image;
  }

  navigateToReviews() {
    //this.navCtrl.navigateForward(`/review/${this.type}/${this.productId}`);
  }
}