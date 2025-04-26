import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { PetInfoService } from '../services/pet-info.service';
import { FavService } from '../services/fav.service';
import { showToast } from '../../utilities/toast-utils';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-adoptionpetinfo',
  templateUrl: './adoptionpetinfo.page.html',
  styleUrls: ['./adoptionpetinfo.page.scss'],
})
export class AdoptionpetinfoPage implements OnInit {
  id: any;
  pet: any;

  description =
    'Amder is a cat that I have found on the side of the road 1 year ago. He is now a cheerful and active cat who loves to play and spend time with people. He has brought so much joy to our lives and continues to surprise us with his playful antics every day.';
  isExpanded = false;
  displayText = '';
  showMoreButton = false;
  photos = ['assets/R.jpeg', 'assets/R2.jpeg', 'assets/R3.jpeg'];

  constructor(
    private authService: AuthService,
    private petInfoService: PetInfoService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private favService: FavService,
  ) {}

  async ngOnInit() {
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    console.log('pet id ------->', this.id);

    if (this.id !== null) {
      this.getPetDetails(this.id);
    }
  }

  getPetDetails(id: number) {
    this.petInfoService.getPet(id).subscribe(
      async (response: any) => {
        this.pet = response.data;
        this.loadImages();
        this.calculateAge();
  
        // Fetch pet owner details
        await this.getPetOwnerDetails(this.pet.pet_owner_id);
  
        // Fetch favorite status for the pet
        this.authService.fetchProfileData().then(profile => {
          const petOwnerId = profile.id;
          this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
            const favoriteIds = favs.map(fav => fav.pet_id);
            this.pet.isFavorite = favoriteIds.includes(this.pet.id);
          });
        });
  
        console.log('Pet details:', this.pet);
      },
      error => {
        console.error('Error fetching pet details:', error);
      }
    );
  }
  

  async getPetOwnerDetails(petOwnerId: number) {
    try {
      const petOwnerData = await this.authService.fetchPetOwnerData(petOwnerId);
      this.pet.petOwner = petOwnerData;
      console.log('Pet Owner details:', this.pet.petOwner);
    } catch (error) {
      console.error('Error fetching pet owner details:', error);
    }
  }

  calculateAge() {
    if (this.pet.age) {
      const birthDate = new Date(this.pet.age);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      // If the birth month hasn't been reached this year, or if it's the current month but the day hasn't been reached, subtract one year
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      this.pet.petAge = age;
    }
  }

  setDisplayText() {
    const words = this.description.split(' ');
    if (words.length > 45) {
      this.displayText = words.slice(0, 45).join(' ') + '...';
      this.showMoreButton = true;
    } else {
      this.displayText = this.description;
      this.showMoreButton = false;
    }
  }

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
    this.displayText = this.isExpanded
      ? this.description
      : this.description.split(' ').slice(0, 45).join(' ') + '...';
  }

  async presentAlertConfirm(action: 'call' | 'chat') {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to ${action} this pet owner?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            if (action === 'call') {
              this.call();
            } else if (action === 'chat') {
              this.chat();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  chat() {
    const message = encodeURIComponent('Hello, I would like to chat with you!');
    window.open(
      `https://wa.me/${this.pet.petOwner.phone}?text=${message}`,
      '_blank',
    );
  }

  call() {
    window.open(`tel:${this.pet.petOwner.phone}`, '_system');
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
                  this.router.navigate(['/adoptionpetinfo/', pet.id]);
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
              this.router.navigate(['/adoptionpetinfo/', pet.id]);
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
    if (this.pet.image && this.pet.image.trim() !== '' && !this.pet.image.includes("via.placeholder.com")) {
        await this.petInfoService.uploadImage(this.pet.image).then(res => {
            this.pet.imageUrl = res;
            console.log('this.petDet.imageUrl', this.pet.imageUrl);
        });
    } else {
        // If the condition is not met, log or handle the case as needed
        console.log('Image URL remains unchanged:', this.pet.imageUrl);
    }
}
   
}
