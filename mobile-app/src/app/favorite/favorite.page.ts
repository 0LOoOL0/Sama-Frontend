import { Component, OnInit } from '@angular/core';
import { FavService, Fav } from '../services/fav.service';
import { ProductService } from '../services/product.service';
import { ProviderService } from '../services/provider.service';
import { ServicesService } from '../services/services.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { showToast } from 'src/utilities/toast-utils';
import { PetInfoService } from '../services/pet-info.service';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  items: any[] = [];
  Filtered : any[] = [];
  

  constructor(
    private favService: FavService,
    private productService: ProductService,
    private serviceService: ServicesService,
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService,
    private providerService: ProviderService,
    private petService: PetInfoService
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  async loadFavorites() {
    try {
      const profile = await this.authService.fetchProfileData();
      const profileId = profile.id;
      
      this.favService.getFavsByPetOwnerId(profileId).subscribe(
        (favs: Fav[]) => {
          favs.forEach(fav => {
            if (fav.product_id) {
              this.productService.getProductById(fav.product_id).subscribe(
                product => {
                  if (product) {
                    this.items.push({
                      id: fav.id,
                      product_id: fav.product_id,
                      name: product.name,
                      image: product.images[0],
                      isFavorite: true,
                    });
                  } else {
                    console.error('Product not found for id:', fav.product_id);
                  }
                },
                error => console.error('Error fetching product:', error)
              );
            } else if (fav.service_id) {
              this.serviceService.getServiceById(fav.service_id).subscribe(
                service => {
                  if (service) {
                    this.items.push({
                      id: fav.id,
                      service_id: fav.service_id,
                      name: service.title,
                      image: service.image,
                      isFavorite: true,
                    });
                  } else {
                    console.error('Service not found for id:', fav.service_id);
                  }
                },
                error => console.error('Error fetching service:', error)
              );
            } else if (fav.provider_id) {
              this.providerService.getProviderById(fav.provider_id).then(
                response => {
                  const providerArray = response.data;
                  if (Array.isArray(providerArray) && providerArray.length > 0) {
                    const provider = providerArray[0];
                    this.items.push({
                      id: fav.id,
                      provider_id: fav.provider_id,
                      name: provider.name,
                      image: provider.profile_image,
                      isFavorite: true,
                    });
                  } else {
                    console.error('Provider not found or array invalid:', providerArray);
                  }
                },
                error => console.error('Error fetching provider:', error)
              );
            } else if (fav.pet_id) {
              this.petService.getPetById(fav.pet_id).subscribe(
                petResponse => {
                  // If the response is already an object, handle it directly
                  let pet = Array.isArray(petResponse) ? petResponse[0] : petResponse;
            
                  if (pet && pet.id) {
                    this.items.push({
                      id: fav.id,
                      pet_id: fav.pet_id,
                      name: pet.name,
                      image: pet.image,
                      isFavorite: true,
                    });
                    console.log('Pet loaded:', this.items[this.items.length - 1]);
                  } else {
                    console.error('Pet not found or invalid:', petResponse);
                  }
                },
                error => console.error('Error fetching pet:', error)
              );
            }
          });
          console.log('Favorites loaded:', this.items);
        },
        error => {
          console.error('Error fetching favorites:', error);
        }
      );
    } catch (error) {
      console.error('Error loading profile or favorites:', error);
    }

    this.Filtered = this.items;
  }
  

  async toggleFavorite(item: any) {
    try {
      if (item.isFavorite) {
        await this.favService.deleteFav(item.id).toPromise();
        item.isFavorite = false;
        await showToast(
          this.toastController,
          'Item removed from favorites',
          'danger',
        );
      } else {
        const newFav: Fav = {
          pet_owner_id: (await this.authService.fetchProfileData()).id,
          product_id: item.product_id,
          service_id: item.service_id,
          provider_id: item.provider_id,
        };
        const createdFav = await this.favService.createFav(newFav).toPromise();
        if (createdFav) {
          item.id = createdFav.id;
          item.isFavorite = true;
          await showToast(
            this.toastController,
            'Item added to favorites',
            'success',
          );
        } else {
          await showToast(
            this.toastController,
            'Failed to add item to favorites',
            'danger',
          );
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      await showToast(
        this.toastController,
        'Failed to update favorite status',
        'danger',
      );
    }
    this.items = [];
    this.loadFavorites();
  }

  async navigateToDetails(item: any) {
    if (item.product_id) {
      this.router.navigate(['/product-details', item.product_id]);
    } else if (item.service_id) {
      this.router.navigate(['/providerservice', item.service_id]);
    } else if (item.provider_id) {
      try {
        const response = await this.providerService.getProviderById(
          item.provider_id,
        );
        const providerArray = response.data;

        if (Array.isArray(providerArray) && providerArray.length > 0) {
          const provider = providerArray[0];

          if (provider && provider.type) {
            const providerType = provider.type.toLowerCase();

            switch (providerType) {
              case 'pet shop':
                this.router.navigate([
                  '/vetdetails/petstores/',
                  item.provider_id,
                ]);
                break;
              case 'groomer':
                this.router.navigate(['/vetdetails/groomer', item.provider_id]);
                break;
              case 'trainer':
                this.router.navigate([
                  '/vetdetails/trainer/',
                  item.provider_id,
                ]);
                break;
              case 'doctor':
                this.router.navigate(['/vetdetails/doctor/', item.provider_id]);
                break;
              case 'pet clinic':
                this.router.navigate([
                  '/vetdetails/vetclinic/',
                  item.provider_id,
                ]);
                break;
              default:
                console.error('Unknown provider type:', providerType);
                break;
            }
          } else {
            console.error('Provider type is missing or invalid:', provider);
          }
        } else {
          console.error('Provider array is empty or invalid:', providerArray);
        }
      } catch (error) {
        console.error('Error fetching provider:', error);
      }
    }
  }

  updateFilter(filterType: string) {
    console.log('Selected filter type:', filterType);
    switch (filterType) {
      case 'all':
        this.Filtered = this.items;
        break;
      case 'provider':
        this.Filtered = this.items.filter(item => item.provider_id != null);
        break;
      case 'product':
        this.Filtered = this.items.filter(item => item.product_id != null);
        break;
      case 'service':
        this.Filtered = this.items.filter(item => item.service_id != null);
        break;
      case 'pet':
        this.Filtered = this.items.filter(item => item.pet_id != null);
        break;
      default:
        console.error('Unknown filter type:', filterType);
    }
  }
}
