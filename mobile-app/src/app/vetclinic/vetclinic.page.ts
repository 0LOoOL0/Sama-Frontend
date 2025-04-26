import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProviderService } from '../services/provider.service';
import { ProductService , Product} from '../services/product.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FavService } from '../services/fav.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { showToast } from '../../utilities/toast-utils';
import { Router } from '@angular/router';
import {Cart, CartService} from '../services/cart.service';
import axios from 'axios';
@Component({
  selector: 'app-vetclinic',
  templateUrl: './vetclinic.page.html',
  styleUrls: ['./vetclinic.page.scss'],
})
export class VetclinicPage implements OnInit {
  searchQuery: string = '';
  viewType: string = 'grid';
  showFilterModal: boolean = false;
  filterLayout: string = 'grid';
  priceRange: { lower: number; upper: number } = { lower: 0, upper: 1000 };
  kilometerRange: number = 30;
  priceOrder: string = 'lowest';
  type: string | undefined;
  reviewRatings: number[] = [1, 2, 3, 4, 5];
  selectedReviewRating: number | null = null;
  products: Product[] = [];

  clinics: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private providerService: ProviderService,
    private navCtrl: NavController,
    private authService: AuthService,
    private favService: FavService,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.paramMap.get('type')!;
    if (this.type === 'groomers') {
      this.loadGroomers();
    }
    if (this.type === 'vet clinics') {
      this.loadVetClinics();
    }
    if (this.type === 'pet stores') {
      this.loadShops();
    }
    if (this.type === 'trainer') {
      this.loadTrainer();
    }
    if (this.type === 'products') {
      this.loadProducts();
    }
  }
 // Load products
 loadProducts() {
  this.productService.getProducts().subscribe(
    async products => {
      // Use async/await to handle image parsing and processing
      this.products = await Promise.all(
        products.map(async product => {
          // Parse images if it's a string
          if (typeof product.images === 'string') {
            try {
              product.images = JSON.parse(product.images) as string[];
            } catch (error) {
              console.error('Error parsing images:', error);
              product.images = []; // Handle the error by setting an empty array
            }
          }

          return product; // Return the processed product
        })
      );
    },
    error => {
      console.error('Error fetching products:', error);
    }
  );
}


  loadVetClinics() {
    this.providerService
      .getAllProviders()
      .then(response => {
        this.clinics = response.data.filter(
          (provider: { type: string }) => provider.type === 'pet clinic',
        );
        this.authService.fetchProfileData().then(profile => {
          const petOwnerId = profile.id;
          this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
            const favoriteIds = favs.map(fav => fav.provider_id);
            this.clinics.forEach((clinic: any) => {
              clinic.isFavorite = favoriteIds.includes(clinic.id);
            });
            this.cdr.detectChanges();
          });
        });
      })
      .catch(error => {
        console.error('Error fetching providers:', error);
      });
  }

  loadGroomers() {
    this.providerService
      .getAllProviders()
      .then(response => {
        this.clinics = response.data.filter(
          (provider: { type: string }) => provider.type === 'groomer',
        );
        this.authService.fetchProfileData().then(profile => {
          const petOwnerId = profile.id;
          this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
            const favoriteIds = favs.map(fav => fav.provider_id);
            this.clinics.forEach((clinic: any) => {
              clinic.isFavorite = favoriteIds.includes(clinic.id);
            });
            this.cdr.detectChanges();
          });
        });
      })
      .catch(error => {
        console.error('Error fetching providers:', error);
      });
  }

  loadShops() {
    this.providerService
      .getAllProviders()
      .then(response => {
        this.clinics = response.data.filter(
          (provider: { type: string }) => provider.type === 'pet shop',
        );
        this.authService.fetchProfileData().then(profile => {
          const petOwnerId = profile.id;
          this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
            const favoriteIds = favs.map(fav => fav.provider_id);
            this.clinics.forEach((clinic: any) => {
              clinic.isFavorite = favoriteIds.includes(clinic.id);
            });
            this.cdr.detectChanges();
          });
        });
      })
      .catch(error => {
        console.error('Error fetching providers:', error);
      });
  }
  loadTrainer() {
    this.providerService
      .getAllProviders()
      .then(response => {
        this.clinics = response.data.filter(
          (provider: { type: string }) => provider.type === 'trainer',
        );
        this.authService.fetchProfileData().then(profile => {
          const petOwnerId = profile.id;
          this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
            const favoriteIds = favs.map(fav => fav.provider_id);
            this.clinics.forEach((clinic: any) => {
              clinic.isFavorite = favoriteIds.includes(clinic.id);
            });
            this.cdr.detectChanges();
          });
        });
      })
      .catch(error => {
        console.error('Error fetching providers:', error);
      });
  }

  filterClinics() {
    if (this.searchQuery.trim() === '') {
      if (this.type === 'groomers') {
        this.loadGroomers();
      }
      if (this.type === 'vet clinics') {
        this.loadVetClinics();
      }
      if (this.type === 'pet stores') {
        this.loadShops();
      }
      if (this.type === 'trainer') {
        this.loadTrainer();
      }
    } else {
      this.clinics = this.clinics.filter(clinic =>
        clinic.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    }
  }

  onSearchInput(event: any) {
    this.searchQuery = event.target.value;
    this.filterClinics();
  }
  openFilter() {
    this.showFilterModal = true;
  }

  dismissFilter() {
    this.showFilterModal = false;
  }

  applyFilter() {
    this.viewType = this.filterLayout;
    this.dismissFilter();
  }

  resetFilter() {
    this.filterLayout = 'grid';
    this.priceRange = { lower: 0, upper: 1000 };
    this.kilometerRange = 30;
    this.priceOrder = 'lowest';
    this.selectedReviewRating = null;
  }

  selectReviewRating(rating: number) {
    this.selectedReviewRating = rating;
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]); // Navigate to the specific page, like 'vetclinic/products'
  }
  

  goToVetDetails(clinicId: number) {
    this.navCtrl.navigateForward(`/vetdetails/${this.type}/${clinicId}`);
  }
  addToFavorites(clinic: any) {
    this.authService.fetchProfileData().then(profile => {
      const petOwnerId = profile.id;
      this.favService
        .isProviderInFavorites(petOwnerId, clinic.id)
        .subscribe(isInFavorites => {
          if (isInFavorites) {
            this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
              const favToDelete = favs.find(
                fav => fav.provider_id === clinic.id,
              );
              if (favToDelete && favToDelete.id !== undefined) {
                this.favService.deleteFav(favToDelete.id).subscribe(
                  async () => {
                    clinic.isFavorite = false;
                    console.log('Removed from favorites');
                    await showToast(
                      this.toastController,
                      ' Removed from favorites',
                      'danger',
                    );
                  },
                  error => {
                    console.error('Error removing from favorites:', error);
                  },
                );
              }
            });
          } else {
            const fav = { pet_owner_id: petOwnerId, provider_id: clinic.id };
            this.favService.createFav(fav).subscribe(
              async () => {
                clinic.isFavorite = true;
                await showToast(
                  this.toastController,
                  ' Added to favorites',
                  'success',
                );
              },
              async error => {
                console.error('Error adding to favorites:', error);
                await showToast(
                  this.toastController,
                  'Error adding to favorites',
                  'danger',
                );
              },
            );
          }
        });
    });
  }


  addToCart(product: Product) {
    this.authService.fetchProfileData().then(profile => {
      const petOwnerId = profile.id;
      this.cartService.isProductInCart(petOwnerId, product.id).subscribe(isInCart => {
        if (isInCart) {
          this.cartService.getCartsByPetOwnerId(petOwnerId).subscribe(cartItems => {
            const cartItem = cartItems.find(cart => cart.product_id === product.id);
            if (cartItem && cartItem.id !== undefined) {
              cartItem.quantity += 1; // Increment the quantity
              this.cartService.updateCart(cartItem.id, cartItem).subscribe(
                async () => {
                  await showToast(this.toastController, 'Quantity updated', 'success');
                },
                error => {
                  console.error('Error updating cart quantity:', error);
                }
              );
            }
          });
        } else {
          const cart: Cart = { id: 0, pet_owner_id: petOwnerId, product_id: product.id, quantity: 1 };
          this.cartService.createCart(cart).subscribe(
            async () => {
              product.isInCart = true;
              await showToast(this.toastController, 'Item added to cart', 'success');
            },
            error => {
              console.error('Error adding to cart:', error);
            }
          );
        }
      });
    });
  }
  navigateToDetails(product: Product) {
    this.router.navigate(['/product-details', product.id]);
  }
}
