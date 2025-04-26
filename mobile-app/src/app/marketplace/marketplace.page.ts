import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PetInfoService, Pet } from '../services/pet-info.service';
import { AuthService } from '../services/auth.service';
import { FavService } from '../services/fav.service';
import { showToast } from '../../utilities/toast-utils';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})
export class MarketplacePage implements OnInit {
  searchQuery: string = '';
  allPets: any = {};
  ownerAddresses: { [petId: string]: string } = {}; 
  sellingPets: any = [];
  role: string = '';
  backup: any = [];
  showFilterModal: boolean = false;
  filter = {
    priceOrder: '',
    priceRange: { lower: null, upper: null },
    petType: ''
  };
  
  constructor(
    private router: Router,
    private petInfoService: PetInfoService,
    private alertController: AlertController,
    private authService: AuthService,
    private toastController: ToastController,
    private favService: FavService,
  ) {}

  ngOnInit() {
    // Fetch all pets
    this.fetchAllPetsAndOwnerAddresses();
  }

  fetchAllPetsAndOwnerAddresses() {
    this.petInfoService.fetchAllPets().then((petsData: any) => {
      this.allPets = petsData;
      this.filterSellingPets();
  
      // Fetch the profile data to get the pet owner ID
      this.authService.fetchProfileData().then(profile => {
        const petOwnerId = profile.id;
  
        // Get favorites for the current pet owner
        this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
          const favoriteIds = favs.map(fav => fav.pet_id);
  
          // Loop through all pets and fetch their owner’s address
          this.allPets.forEach((pet: any) => {
            // Check if the pet is in favorites
            pet.isFavorite = favoriteIds.includes(pet.id);
  
            // Fetch owner data
            this.authService.getPetOwnerData(pet.pet_owner_id)
              .then((response: any) => {
                const ownerCity = response.data.data?.city || 'Unknown city';
                this.ownerAddresses[pet.id] = ownerCity;
              })
              .catch((error) => {
                console.error(`Error fetching owner data for pet ID ${pet.id}:`, error);
              });
          });
        });
      }).catch(error => {
        console.error('Error fetching profile data:', error);
      });
    }).catch(error => {
      console.error('Error fetching pets data:', error);
    });
  }

  filterSellingPets() {
    this.sellingPets = this.allPets
      .filter((pet: any) => pet.allow_selling === 1)
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      console.log(this.sellingPets)
   
    this.backup = this.sellingPets;
    this.loadImages();
  }

  async loadImages() {
    for (const pet of this.sellingPets) {
        if (pet.image && pet.image.trim() !== '' && !pet.image.includes("via.placeholder.com")) {
            try {
                const res = await this.petInfoService.uploadImage(pet.image);
                pet.imageUrl = res;
                console.log('Updated imageUrl for pet:', pet.imageUrl);
            } catch (error) {
                console.error('Error uploading image for pet:', error);
            }
        } else {
            // If the condition is not met, log or handle the case as needed
            console.log('Image URL remains unchanged for pet:', pet.imageUrl);
        }
    }
}

  getPets(): Pet[] {
    let pets: Pet[] = this.sellingPets;

    if (this.searchQuery) {
        pets = pets.filter((pet: Pet) => 
            pet.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            (this.ownerAddresses[pet.id]?.toLowerCase().includes(this.searchQuery.toLowerCase()) || '') // Check owner's address
        );
    }
    return pets;
}

  navigateToInfo(id: any) {
    this.router.navigate(['/marketinfo', id]);
  }

  addToFavorites(pet: any) {
    this.authService.fetchProfileData().then(profile => {
      const petOwnerId = profile.id;
  
      // Check if the pet is already in favorites
      this.favService.isPetInFavorites(petOwnerId, pet.id).subscribe(isInFavorites => {
        if (isInFavorites) {
          this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
            const favToDelete = favs.find(fav => fav.pet_id === pet.id);
            if (favToDelete && favToDelete.id !== undefined) {
              this.favService.deleteFav(favToDelete.id).subscribe(
                async () => {
                  pet.isFavorite = false; // Update favorite status
                  console.log('Removed from favorites');
                  await showToast(this.toastController, 'Removed from favorites', 'danger');
                },
                error => {
                  console.error('Error removing from favorites:', error);
                }
              );
            }
          });
        } else {
          const fav = { pet_owner_id: petOwnerId, pet_id: pet.id };
          this.favService.createFav(fav).subscribe(
            async () => {
              pet.isFavorite = true; // Update favorite status
              console.log('Added to favorites');
              await showToast(this.toastController, 'Added to favorites', 'success');
            },
            async error => {
              console.error('Error adding to favorites:', error);
              await showToast(this.toastController, 'Error adding to favorites', 'danger');
            }
          );
        }
      }, error => {
        console.error('Error checking favorites:', error);
      });
    });
  }

  async showOptionsPopup() {
      this.router.navigate(['/mypet']);
  }
  
  filterPets() {
    // Filter based on price range and pet type
    this.sellingPets = this.allPets
      .filter((pet: Pet) => {
        const price = pet.price || 0;
  
        // Filter by price range
        const isWithinPriceRange = (!this.filter.priceRange ||
          (this.filter.priceRange.lower == null || price >= this.filter.priceRange.lower) &&
          (this.filter.priceRange.upper == null || price <= this.filter.priceRange.upper));
  
        // Filter by pet type
        const isMatchingPetType = !this.filter.petType || pet.pet_type === this.filter.petType;
  
        return isWithinPriceRange && isMatchingPetType;
      });
  
    // Apply price sorting if selected
    if (this.filter.priceOrder === 'low-to-high') {
      this.sellingPets.sort((a: Pet, b: Pet) => (a.price || 0) - (b.price || 0));
    } else if (this.filter.priceOrder === 'high-to-low') {
      this.sellingPets.sort((a: Pet, b: Pet) => (b.price || 0) - (a.price || 0));
    }
  
    console.log('Filtered Pets:', this.sellingPets);
  }
  
  

  applyFilters() {
    // Apply the filter using only the .filter method
    this.filterPets();
  
    // Optionally close the filter modal
    this.dismissFilter();

    if (this.searchQuery) {
      this.sellingPets = this.sellingPets.filter((pet: Pet)=> 
        pet.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (this.ownerAddresses[pet.id]?.toLowerCase().includes(this.searchQuery.toLowerCase()) || '') // Check owner's address
      );
    }
  }

  dismissFilter() {
    this.showFilterModal = false;
  }
  
  // filterItems() {
  //   this.showFilterModal = true;
  // }

  toggleFilter(){
    this.showFilterModal = true;
  }

  resetFilters() {
    // Reset the filter object to its initial state
    this.filter = {
      priceRange: { lower: null, upper: null },
      petType: '',
      priceOrder: '',
    };
  
    // Reassign sellingPets to allPets to show all pets
    this.sellingPets = this.backup;
  
    console.log('Filters reset. All pets:', this.sellingPets);
  }

}