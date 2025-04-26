import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { PetInfoService } from '../services/pet-info.service';
@Component({
  selector: 'app-lostpetinfo',
  templateUrl: './lostpetinfo.page.html',
  styleUrls: ['./lostpetinfo.page.scss'],
})
export class LostpetinfoPage implements OnInit {

  id: any;
  description =
    'Amder is a cat that I have found on the side of the road 1 year ago. He is now a cheerful and active cat who loves to play and spend time with people. He has brought so much joy to our lives and continues to surprise us with his playful antics every day.';
  isExpanded = false;
  displayText = '';
  showMoreButton = false;
  photos = ['assets/R.jpeg', 'assets/R2.jpeg', 'assets/R3.jpeg'];

  pet: any = {
    gender: 'unknown',
    name: 'unknown',
    pet_type: 'unknown',
    breed: 'unknown',
    color: 'unknown',
    image: '',
    location: 'unknown',
    description: 'No description available',
    petAge: 'unknown',
    weight: 'unknown',
    role: 'unknown', // Add role field here
  };

  constructor(
    private authService: AuthService,
    private petInfoService: PetInfoService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alertController: AlertController,
  ) {}

  async ngOnInit() {
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    console.log('pet id ------->', this.id);

    if (this.id !== null) {
      this.getLostPetDetails(this.id);
    }
  }

  getLostPetDetails(id: number) {
    this.petInfoService.showLostPetByFounder(id).subscribe(
      async (response: any) => {
        console.log('API response:', response);

        const lostPet = response.lostPet;

        // Populate the pet data with available fields, use 'unknown' if not available
        this.pet.gender = lostPet.gender || 'unknown';
        this.pet.name = lostPet.name || 'unknown';
        this.pet.pet_type = lostPet.pet_type || 'unknown';
        this.pet.breed = lostPet.breed || 'unknown';
        this.pet.color = lostPet.color || 'unknown';
        this.pet.image = lostPet.image || '';
        this.pet.location = lostPet.location || 'unknown';
        this.pet.description = lostPet.description || 'No description available';
        this.pet.role = lostPet.role || 'owner';  // Set role from the lost_pet table

        // These fields are not in the lost_pets table, so default to 'unknown'
        this.pet.petAge = 'unknown';
        this.pet.weight = 'unknown';

        await this.getPetOwnerDetails(lostPet.pet_owner_id);
        console.log('Lost Pet details:', this.pet);
      },
      error => {
        console.error('Error fetching lost pet details:', error);
      },
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

  setDisplayText() {
    const words = this.pet.description.split(' ');
    if (words.length > 45) {
      this.displayText = words.slice(0, 45).join(' ') + '...';
      this.showMoreButton = true;
    } else {
      this.displayText = this.pet.description;
      this.showMoreButton = false;
    }
  }

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
    this.displayText = this.isExpanded
      ? this.pet.description
      : this.pet.description.split(' ').slice(0, 45).join(' ') + '...';
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
}