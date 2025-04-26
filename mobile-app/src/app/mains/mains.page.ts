import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PetInfoService } from '../services/pet-info.service';
import { Product, ProductService } from '../services/product.service';
import { ProviderService } from '../services/provider.service';
import {Cart, CartService} from '../services/cart.service';
import { ToastController } from '@ionic/angular';
import { FavService } from '../services/fav.service';
import { showToast } from '../../utilities/toast-utils';
import { PackageService } from '../services/package.service';


@Component({
  selector: 'app-mains',
  templateUrl: './mains.page.html',
  styleUrls: ['./mains.page.scss'],
})
export class MainsPage implements OnInit {
  profile: any = {};
  pets: any[] = [];
  AllPets: any;
  petListType = 0; // 0: Adoption, 1: Lost Pets, 2: Mating
  products: Product[] = [];
  adopt: any;
  Lost: any = []; // Initialize the Lost array
  mate: any;
  buttonText = 'Adopt';
  hasActiveMembership: boolean = false; 
  ownerAddresses: { [petId: string]: string } = {}; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private petInfoService: PetInfoService,
    private productService: ProductService,
    private providerService: ProviderService,
    private cartService: CartService,
    private toastController: ToastController,
    private favService: FavService,
    private packageService: PackageService,

  ) {}

  ngOnInit() {
    this.authService
      .fetchProfileData()
      .then(profileData => {
        this.profile = profileData;
        console.log('Profile data:', this.profile);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });

    this.petInfoService
      .fetchPets()
      .then((petsData: any) => {
        this.pets = petsData;
        this.loadImages(this.pets);
        console.log(' this.pets:', this.pets);
        console.log('this.pets ===> imageUrl:', this.pets);
        return this.checkActiveMemberships();
      })
      .then((activeMembership) => {
        this.hasActiveMembership = activeMembership; // Set the membership status
      })
      .catch(error => {
        console.error('Error fetching pets data:', error);
      });

      this.petInfoService
      .fetchAllPets()
      .then((petsData: any) => {
        this.AllPets = petsData;
        this.loadImages(this.AllPets);
        this.filterPets();
        console.log('this.AllPets:', this.AllPets);
        console.log('this.AllPets ===> imageUrl:', this.AllPets);
    
        // ✅ Moved here to avoid "undefined" error
        this.AllPets.forEach((pet: any) => {
          this.authService.getPetOwnerData(pet.pet_owner_id)
            .then((response: any) => {
              const ownerCity = response.data.data?.city || 'Unknown city';
              this.ownerAddresses[pet.id] = ownerCity;
            })
            .catch((error) => {
              console.error(`Error fetching owner data for pet ID ${pet.id}:`, error);
            });
        });
      })
      .catch(error => {
        console.error('Error fetching pets data:', error);
      });
    
    this.petInfoService.fetchAllLostPets().subscribe(
      (lostPetsData: any) => {
        this.Lost = lostPetsData.lostPets; // Assuming lostPetsData.lostPets is an array
        console.log('Lost pets:', this.Lost);
      },
      error => {
        console.error('Error fetching lost pets:', error);
      },
    );
    
    this.loadLastSixProducts();
  }
  
  checkActiveMemberships(): Promise<boolean> {
    return this.packageService.fetchMemeberships()
      .then((response: any) => {
        const membershipsData = response.data.data;
  
        // Filter memberships for the fetched pets
        const petIds = this.pets.map((pet: any) => pet.id);
        const filteredMemberships = membershipsData.filter((membership: any) =>
          petIds.includes(membership.pet_id)
        );
  
        // Check for active memberships in the filtered list
        const hasActiveMembership = filteredMemberships.some((membership: any) => {
          const today = new Date();
          const endDate = new Date(membership.end_date);
          return endDate >= today; // Active membership check
        });
  
        console.log('Has active membership:', hasActiveMembership);
        return hasActiveMembership; // Return true or false based on the check
      })
      .catch(error => {
        console.error('Error fetching memberships:', error);
        return false; // Handle errors gracefully
      });
  }
  async loadImages(pets: any) {
    for (let pet of pets) {
      if (pet.image) {
        try {
          pet.imageUrl = await this.petInfoService.uploadImage(pet.image);
          console.log('Image URL for pet:', pet.imageUrl); // Check if image URL is valid
        } catch (error) {
          console.error('Error loading image:', error);
        }
      }
    }
  }

  loadLastSixProducts() {
    const providerName = 'Sama Pet Store';
    this.providerService.getProviderByName(providerName).subscribe(
      response => {
        const providerId = response.data.id;
        this.productService.getProductsByProvider(providerId).subscribe(
          (products: any) => {
            // Log the products to check the structure
            console.log('Fetched products:', products);

            if (Array.isArray(products)) {
              // Sort products by date_added if it is an array
              this.products = products
                .sort(
                  (a: Product, b: Product) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime(),
                )
                .slice(0, 6);
            } else {
              console.error('Expected an array of products but got:', products);
            }
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

  navigateToInfo(id: any) {
    if (this.petListType === 1) {
      this.router.navigate(['/lostpetinfo', id]);
    } else {
      this.router.navigate(['/adoptionpetinfo', id]);
    }
  }

  filterPets() {
    this.adopt = this.AllPets.filter((pet: any) => {
      return pet.allow_adoption === 1;
    });

    this.mate = this.AllPets.filter((pet: any) => {
      return pet.is_neutered === 'yes';
    });

    console.log('Adopt:', this.adopt);
    console.log('Mate:', this.mate);
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  viewPetDetails(pet: any) {
    console.log('Navigating to details for pet:', pet);
    this.router.navigate(['/petdetailes', pet.id]);
  }

  viewProfileDetails(profile: any) {
    console.log('Navigating to details for profile:', profile);
    this.router.navigate(['/main', profile.id]);
  }

  showAdoption() {
    this.petListType = 0;
    this.buttonText = 'Adopt';
  }

  showLostPet() {
    this.petListType = 1;
    this.buttonText = 'Lost';
  }

  showMating() {
    this.petListType = 2;
    this.buttonText = 'Mate';
  }

  getPets(): any[] {
    let pets: any[] = [];
    if (this.petListType === 0) {
      pets = this.adopt;
    } else if (this.petListType === 1) {
      pets = this.Lost;
    } else if (this.petListType === 2) {
      pets = this.mate;
    }

    return pets;
  }

  goToFavorite() {
    this.router.navigate(['/favorite']);
  }

  goToPetService() {
    this.router.navigate(['/pet-service']);
  }

  goToNotification(ownerId: string) {
    this.router.navigate(['/notification', ownerId]);
  }

  goToaddPet() {
    this.router.navigate(['/pet-profile']);
  }

  viewProduct(product: Product) {
    console.log('Navigating to details for product:', product);
    this.router.navigate(['/product-details', product.id]);
  }

  clickButton() {
    if (this.petListType == 0) {
      this.router.navigate(['/mypet']);
    }
    if (this.petListType == 1) {
      this.router.navigate(['/lostform']);
    }
    if (this.petListType == 2) {
    }
  }

  addToCart(product: Product, quantity: number) {
    this.authService.fetchProfileData().then(profile => {
      const petOwnerId = profile.id;
      
      this.cartService.isProductInCart(petOwnerId, product.id).subscribe(isInCart => {
        if (isInCart) {
          // Update the cart by increasing the quantity
          this.cartService.getCartsByPetOwnerId(petOwnerId).subscribe(cartItems => {
            const cartItem = cartItems.find(cart => cart.product_id === product.id);
            if (cartItem && cartItem.id !== undefined) {
              cartItem.quantity += quantity;  // Increment the quantity
              this.cartService.updateCart(cartItem.id, cartItem).subscribe(
                () => {
                  product.isInCart = true;
                  product.quantity = cartItem.quantity;
                  console.log('Cart quantity updated');
                  this.presentToast('Product quantity updated in cart', 'success'); // Show green toast
                },
                error => {
                  console.error('Error updating cart quantity:', error);
                }
              );
            }
          });
        } else {
          // Add the product to the cart for the first time
          const cart: Cart = {
            id: 0,
            pet_owner_id: petOwnerId,
            product_id: product.id,
            quantity: quantity,  // Initial quantity
          };
          this.cartService.createCart(cart).subscribe(
            () => {
              product.isInCart = true;
              product.quantity = quantity;
              console.log('Product added to cart');
              this.presentToast('Product added to cart', 'success'); // Show green toast
            },
            error => {
              console.error('Error adding to cart:', error);
            }
          );
        }
      });
    });
  }
  
  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, 
      color: color,  
      position: 'bottom', 
    });
    toast.present();
  }

  addToFavorites(product: any) {
    this.authService.fetchProfileData().then(profile => {
      const petOwnerId = profile.id;
      this.favService
        .isProductInFavorites(petOwnerId, product.id)
        .subscribe(isInFavorites => {
          if (isInFavorites) {
            this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
              const favToDelete = favs.find(
                fav => fav.provider_id === product.id,
              );
              if (favToDelete && favToDelete.id !== undefined) {
                this.favService.deleteFav(favToDelete.id).subscribe(
                  async () => {
                    product.isFavorite = false;
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
            const fav = { pet_owner_id: petOwnerId, product_id: product.id };
            this.favService.createFav(fav).subscribe(
              async () => {
                product.isFavorite = true;
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

}
