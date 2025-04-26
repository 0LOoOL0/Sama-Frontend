import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { NavController } from '@ionic/angular';
import {
  ProviderService,
  Review,
  PetOwner,
} from '../services/provider.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { FavService } from '../services/fav.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  productId: number | undefined;
  product: Product | undefined;
  reviews: Review[] = [];
  selectedImage: string | undefined;
  averageRating: number = 0.0;
  reviewCount: number = 0;
  type: string = 'product';

  quantity = 1;
  maxQuantity = 10;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private providerService: ProviderService,
    private navCtrl: NavController,
    private cartService: CartService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private favService: FavService,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if (this.productId) {
      this.loadProduct(this.productId);
      this.loadReviews(this.productId);
    }
  }

  loadProduct(id: number) {
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
        const petOwnerId = profile.id;

        this.cartService.isProductInCart(petOwnerId, id).subscribe(isInCart => {
          if (this.product) {
            this.product.isInCart = isInCart;
            this.cdr.detectChanges();
          }
        });
      },
      error => {
        console.error('Error fetching product:', error);
      },
    );
  }

  increaseQuantity() {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  async loadReviews(productId: number) {
    try {
      const response = await this.providerService.getProductReviewsByProductId(
        productId,
      );
      console.log('Reviews fetched successfully:', response.data);
      this.reviews = response.data;

      for (const review of this.reviews) {
        if (review.pet_owner_id) {
          try {
            const petOwner = await this.loadPetOwner(review.pet_owner_id);
            review.petOwner = petOwner;
          } catch (error) {
            console.error('Error fetching pet owner for review:', error);
          }
        }
      }

      let totalRating: number = 0.0;
      const reviewCount: number = this.reviews.length;

      this.reviews.forEach(review => {
        totalRating += review.rate;
      });
      this.averageRating =
        reviewCount > 0
          ? parseFloat((totalRating / reviewCount).toFixed(2))
          : 0.0;
      this.reviewCount = reviewCount;
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

  loadPetOwner(id: number): Promise<PetOwner> {
    return this.providerService
      .getPetOwnerById(id)
      .then(response => {
        if (Array.isArray(response.data)) {
          return response.data[0];
        } else {
          return response.data;
        }
      })
      .catch(error => {
        console.error('Error fetching pet owner details:', error);
        throw error;
      });
  }

  changeMainImage(image: string) {
    this.selectedImage = image;
  }

  navigateToReviews() {
    this.navCtrl.navigateForward(`/review/${this.type}/${this.productId}`);
  }
  addToCart(product: Product, quantity: number) {
    this.cartService
      .toggleCartItem(product, quantity)
      .then(() => {
        this.presentToast('Product added to cart successfully!')
      })
      .catch(error => {
        console.error('Error toggling cart item:', error);
      });
  }
  async toggleFavorite(product: Product) {
    try {
      await this.favService.toggleFavorite(product);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success', 
      position: 'bottom', 
    });
    await toast.present();
  }
  
}
