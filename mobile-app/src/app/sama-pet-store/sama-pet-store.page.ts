import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../services/product.service';
import { ProviderService } from '../services/provider.service';
import { AuthService } from '../services/auth.service';
import { FavService } from '../services/fav.service';
import { Cart, CartService } from '../services/cart.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { showToast } from '../../utilities/toast-utils';
@Component({
  selector: 'app-sama-pet-store',
  templateUrl: './sama-pet-store.page.html',
  styleUrls: ['./sama-pet-store.page.scss'],
})
export class SamaPetStorePage implements OnInit {
  products: Product[] = [];
  viewType: string = 'grid';
  showFilterModal: boolean = false;
  filterLayout: string = 'grid';
  selectedPetType: string | null = null;
  petTypes: string[] = [
    'Dogs',
    'Cats',
    'Birds',
    'Fish',
    'Hamster',
    'Guinea Pig',
    'Rabbit',
  ];
  reviewRatings: number[] = [1, 2, 3, 4, 5];
  selectedReviewRating: number | null = null; //
  searchTerm: string = '';
  type: string = '';
  priceOrder: string = 'lowest';
  priceRange: { lower: number; upper: number } = { lower: 0, upper: 1000 };
  isSearchVisible: boolean = false;
  providerId: number | null = null; //

  constructor(
    private productService: ProductService,
    private providerService: ProviderService,
    private authService: AuthService,
    private favService: FavService,
    private cartService: CartService,
    private toastController: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.type = this.activatedRoute.snapshot.paramMap.get('type')!;
    const providerName = 'Sama Pet Store';
  
    this.providerService.getProviderByName(providerName).subscribe(
      async response => {
        const providerId = response.data.id;
  
        this.productService.getProductsByProvider(providerId).subscribe(
          async products => {
            // Filter products if the type is 'collar'
            if (this.type === 'collar') {
              products = products.filter(product => product.name.toLowerCase() === 'collar');
            }
  
            this.products = await Promise.all(
              products.map(async product => {
                if (typeof product.images === 'string') {
                  product.images = JSON.parse(product.images) as string[];
                }
                product.isFavorite = false;
                product.isInCart = false;
  
                // Fetch and assign the average rating
                product.averageRating =
                  (await this.providerService.getAverageRatingByProductId(
                    product.id,
                  )) ?? undefined;
                return product;
              }),
            );
            this.updateProductStatus();
          },
          error => {
            console.error('Error fetching products by provider ID:', error);
          },
        );
      },
      error => {
        console.error('Error fetching provider by name:', error);
      },
    );
  }

  updateProductStatus() {
    this.authService.fetchProfileData().then(profile => {
      const petOwnerId = profile.id;

      this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
        this.products.forEach(product => {
          product.isFavorite = favs.some(fav => fav.product_id === product.id);
        });
      });

      this.cartService.getCartsByPetOwnerId(petOwnerId).subscribe(carts => {
        this.products.forEach(product => {
          product.isInCart = carts.some(cart => cart.product_id === product.id);
        });
      });
    });
  }

  addToFavorites(product: Product) {
    this.authService.fetchProfileData().then(profile => {
      const petOwnerId = profile.id;
      this.favService
        .isProductInFavorites(petOwnerId, product.id)
        .subscribe(isInFavorites => {
          if (isInFavorites) {
            this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
              const favToDelete = favs.find(
                fav => fav.product_id === product.id,
              );
              if (favToDelete && favToDelete.id !== undefined) {
                this.favService.deleteFav(favToDelete.id).subscribe(
                  async () => {
                    product.isFavorite = false;
                    await showToast(
                      this.toastController,
                      'Item removed from favorites',
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
            const fav = {
              pet_owner_id: petOwnerId,
              product_id: product.id,
            };
            this.favService.createFav(fav).subscribe(
              async () => {
                product.isFavorite = true;
                await showToast(
                  this.toastController,
                  'Item added to favorites',
                  'success',
                );
              },
              error => {
                console.error('Error adding to favorites:', error);
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
          // If the product is already in the cart, increment the quantity
          this.cartService.getCartsByPetOwnerId(petOwnerId).subscribe(cartItems => {
            const cartItem = cartItems.find(cart => cart.product_id === product.id);
            if (cartItem && cartItem.id !== undefined) {
              cartItem.quantity += 1;  // Increment the quantity
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
          // If the product is not in the cart, add it with quantity 1
          const cart: Cart = {
            id: 0,
            pet_owner_id: petOwnerId,
            product_id: product.id,
            quantity: 1,  // Set initial quantity to 1
          };
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
  

  openSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  searchProducts() {
    this.filterProducts(); // Assuming filterProducts also handles search
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
    this.filterProducts();
  }

  resetFilter() {
    this.filterLayout = 'grid';
    this.selectedPetType = null;
    this.selectedReviewRating = null;
    this.searchTerm = '';
    this.priceOrder = 'lowest';
    this.priceRange = { lower: 0, upper: 1000 };
    this.loadProducts();
  }

  filterProducts() {
    let filteredProducts = this.products.filter(product => {
      const matchesPetType = this.selectedPetType
        ? product.pet_type.includes(this.selectedPetType)
        : true;
      const matchesSearchTerm = this.searchTerm
        ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;
      const matchesPriceRange =
        product.new_price >= this.priceRange.lower &&
        product.new_price <= this.priceRange.upper;

      // New condition to filter by review rating
      const matchesReviewRating =
        this.selectedReviewRating !== null
          ? product.averageRating !== undefined &&
            Math.round(product.averageRating) >= this.selectedReviewRating
          : true;

      return (
        matchesPetType &&
        matchesSearchTerm &&
        matchesPriceRange &&
        matchesReviewRating
      );
    });

    // Sorting products based on priceOrder
    filteredProducts.sort((a, b) => {
      if (this.priceOrder === 'lowest') {
        return a.new_price - b.new_price;
      } else {
        return b.new_price - a.new_price;
      }
    });

    this.products = filteredProducts;
  }

  selectReviewRating(rating: number): void {
    this.selectedReviewRating = rating;
    console.log(`Selected rating: ${rating}`);
    this.filterProducts();
  }
  filterProductsByRating(rating: number): void {
    console.log(`Filtering products with rating ${rating} or higher.`);
  }

  selectPetType(petType: string) {
    if (this.selectedPetType === petType) {
      this.selectedPetType = null;
    } else {
      this.selectedPetType = petType;
    }
    this.filterProducts();
  }

  navigateToDetails(product: Product) {
    this.router.navigate(['/product-details', product.id]);
  }
}
