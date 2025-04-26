import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PetInfoService } from '../services/pet-info.service';
import { AuthService } from '../services/auth.service';
import { FavService } from '../services/fav.service';
import { showToast } from '../../utilities/toast-utils';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-adoptionlist',
  templateUrl: './adoptionlist.page.html',
  styleUrls: ['./adoptionlist.page.scss'],
})
export class AdoptionlistPage implements OnInit {
  searchQuery: string = '';
  AllPets: any = {};
  ownerAddresses: { [petId: string]: string } = {};
  adoptionPets: any = [];
  lostPets: any = [];
  lostOwnerPets: any = [];
  mattingPets: any = [];
  petListType = 1;
  role: string = '';
  constructor(
    private router: Router,
    private petInfoService: PetInfoService,
    private alertController: AlertController,
    private authService: AuthService,
    private toastController: ToastController,
    private favService: FavService,
  ) { }

  ngOnInit() {
    // Fetch all pets
    this.fetchAllPetsAndOwnerAddresses();

    // Fetch lost pets from the lost_pets table
    this.petInfoService.fetchAllLostPets().subscribe((lostPetsData: any) => {
      this.lostPets = lostPetsData.lostPets;
    }, error => {
      console.error('Error fetching lost pets:', error);
    });
  }

  fetchAllPetsAndOwnerAddresses() {
    this.petInfoService.fetchAllPets().then((petsData: any) => {
      this.AllPets = petsData;
      this.loadImages();
      this.filterPets();

      // Fetch the profile data to get the pet owner ID
      this.authService.fetchProfileData().then(profile => {
        const petOwnerId = profile.id;

        // Get favorites for the current pet owner
        this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
          const favoriteIds = favs.map(fav => fav.pet_id);

          // Loop through all pets and fetch their owner’s address
          this.AllPets.forEach((pet: any) => {
            // Check if the pet is in favorites
            pet.isFavorite = favoriteIds.includes(pet.id);

            // Fetch owner data
            this.authService.getPetOwnerData(pet.pet_owner_id)
              .then((response: any) => {
                // Assuming the response contains an object with the city in 'response.data.city'
                console.log('Owner response:', response.data); // Log the full response to inspect it

                // Access the city field correctly (adjust this based on actual response structure)
                const ownerCity = response.data.data?.city || 'Unknown city'; // Adjust if necessary
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

  filterPets() {
    this.adoptionPets = this.AllPets
      .filter((pet: any) => pet.allow_adoption === 1)
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    this.mattingPets = this.AllPets
      .filter((pet: any) => pet.is_neutered === 'yes')
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    this.lostOwnerPets = this.AllPets.filter((pet: any) => pet.is_lost === 1);
  }

  getPets(): any[] {
    let pets: any[] = [];
    if (this.petListType === 1) {
      pets = this.adoptionPets;
    } else if (this.petListType === 2) {
      pets = [...this.lostPets, ...this.lostOwnerPets]
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (this.petListType === 3) {
      pets = this.mattingPets;
    }

    if (this.searchQuery) {
      pets = pets.filter(pet =>
        pet.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        pet.location?.toLowerCase().includes(this.searchQuery.toLowerCase()) || // Check pet's location
        (this.ownerAddresses[pet.id]?.toLowerCase().includes(this.searchQuery.toLowerCase()) || '') // Check owner's address
      );
    }

    return pets;
  }

  getFabLabel(): string {
    if (this.petListType === 1) {
      return 'Adopt';
    } else if (this.petListType === 2) {
      return 'Report Lost';
    } else if (this.petListType === 3) {
      return 'Find Mate';
    } else {
      return '';
    }
  }
  navigateToInfo(id: any) {
    if (this.petListType === 2) {
      // Determine if the user is the founder or owner
      this.router.navigate(['/lostpetinfo', id], { queryParams: { role: this.role } });
    } else {
      this.router.navigate(['/adoptionpetinfo', id]);
    }
  }


  isFounder(): boolean {
    return this.role === 'founder';
  }
  showAdoption() {
    this.petListType = 1;
  }

  showLostPet() {
    this.petListType = 2;
  }

  showMating() {
    this.petListType = 3;
  }

  async showOptionsPopup() {
    if (this.petListType === 1) {
      this.router.navigate(['/mypet']);
    } else if (this.petListType === 2) {
      this.router.navigate(['/lostform']);
    } else {
      this.router.navigate(['/mypet']);

    }
  }

  // async showAlert(option1: string, option2: string, formType: string) {
  //   const alert = await this.alertController.create({
  //     header: 'ARE YOU?',
  //     buttons: [
  //       {
  //         text: option1,
  //         handler: () => {
  //           this.role = 'owner';  // Set the role as 'owner' based on user selection
  //           console.log('Role:', this.role);
  //           this.navigateToForm(formType, 'owner');
  //         },
  //       },
  //       {
  //         text: option2,
  //         handler: () => {
  //           this.role = 'founder';  // Set the role as 'founder' based on user selection
  //           console.log('Role:', this.role);
  //           this.navigateToForm(formType, 'founder');
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }

  navigateToForm(formType: string, role: string) {
    if (formType === 'lostForm' && role === 'founder') {
      this.router.navigate(['/lostform', { role }]);
    } else if (formType === 'lostForm' && role === 'owner') {
      // Implementation to be added later
    }
  }

  addToFavorites(pet: any) {
    this.authService.fetchProfileData().then(profile => {
      const petOwnerId = profile.id;

      // Check if the pet is already in favorites
      this.favService.isPetInFavorites(petOwnerId, pet.id).subscribe(isInFavorites => {
        if (isInFavorites) {
          // If it's already in favorites, proceed to remove it
          this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
            const favToDelete = favs.find(fav => fav.pet_id === pet.id);
            if (favToDelete && favToDelete.id !== undefined) {
              this.favService.deleteFav(favToDelete.id).subscribe(
                async () => {
                  pet.isFavorite = false; // Update favorite status
                  console.log('Removed from favorites');
                  await showToast(this.toastController, 'Removed from favorites', 'danger');
                  this.router.navigate(['/adoptionlist/']);
                },
                error => {
                  console.error('Error removing from favorites:', error);
                }
              );
            }
          });
        } else {
          // If it's not in favorites, proceed to add it
          const fav = { pet_owner_id: petOwnerId, pet_id: pet.id };
          this.favService.createFav(fav).subscribe(
            async () => {
              pet.isFavorite = true; // Update favorite status
              console.log('Added to favorites');
              await showToast(this.toastController, 'Added to favorites', 'success');
              this.router.navigate(['/adoptionlist/']);
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

  async loadImages() {
    for (const pet of this.AllPets) {
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
}
