import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ChangeImageModalComponent } from '../components/change-image-modal/change-image-modal.component';
import { AuthService } from '../services/auth.service';
import { PetInfoService } from '../services/pet-info.service';
import { ChangeDetectorRef } from '@angular/core';

interface PetDocument {
  documentTitle: string;
  uploadedFile: File | null;
}

@Component({
  selector: 'app-petdetailes',
  templateUrl: './petdetailes.page.html',
  styleUrls: ['./petdetailes.page.scss'],
})
export class PetdetailesPage implements OnInit {
  petDet: any = {};
  id: any;
  isEditMode = false;
  List: PetDocument[] = [];
  input: PetDocument = {
    documentTitle: '',
    uploadedFile: null,
  };
  errorMessage: any;
  isModalOpen = false;
  editModalOpen = false;
  editIndex: number | null = null;

  // temp
  note ='';

  constructor(
    private authService: AuthService,
    private petInfoService: PetInfoService,
    private router: Router,
    private alertController: AlertController,
    private activeRoute: ActivatedRoute,
    private modalController: ModalController,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    console.log('pet id ------->', this.id);
    if (this.id !== null) {
      console.log('pet id inside if ------->', this.id);
      this.petInfoService.getPet(this.id).subscribe((Response: any) => {
        this.petDet = Response.data;
        this.loadImages();
        console.log('pet------->', this.petDet);
      });
    }
  }

  async confirmDelete(pid: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this pet?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Delete cancelled');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.delPet(pid);
          },
        },
      ],
    });

    await alert.present();
  }

  delPet(pid: number) {
    this.petInfoService.deletePet(pid).subscribe(
      () => {
        console.log('Pet deleted successfully');
        this.router.navigate(['/mypet']); // Adjust the route if necessary
      },
      error => {
        console.error('Error deleting pet:', error);
      },
    );
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  editclose() {
    this.isEditMode = false;
  }

  saveChanges(pet: any) {
    const petData = {
      name: pet.name,
      pet_type: pet.pet_type,
      breed: pet.breed,
      age: pet.age,
      color: pet.color,
      gender: pet.gender,
      is_vaccinated: pet.is_vaccinated,
      is_microchipped: pet.is_microchipped,
      is_neutered: pet.is_neutered,
      weight: pet.weight,
      height: pet.height,
      pet_owner_id: pet.pet_owner_id,
      price: pet.price,
      description: pet.description,
    };

    console.log('pet in petdetailes  ====>', petData);

    this.petInfoService
      .updatePet(pet.id, petData)
      .then(response => {
        console.log('Pet updated successfully:', response);
        this.isEditMode = false; // Exit edit mode
      })
      .catch(error => {
        console.error('Error updating pet:', error);
      });
  }

  transfer() {
    this.router.navigate(['/transfer-ownership', this.id]);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  clearInfo() {
    this.input = {
      documentTitle: '',
      uploadedFile: null,
    };
    this.errorMessage = null;
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.input.uploadedFile = input.files[0];
    } else {
      this.input.uploadedFile = null;
    }
  }

  async addDoc() {
    if (this.input.documentTitle && this.input.uploadedFile) {
      const formData = new FormData();
      formData.append('documentTitle', this.input.documentTitle);
      formData.append('uploadedFile', this.input.uploadedFile);

      try {
        const response = await this.petInfoService.addDocument(
          this.id,
          formData,
        );
        console.log('Document added successfully:', response);
        this.petDet.documents = response.data.documents;
        this.clearInfo();
        this.isModalOpen = false;
        this.errorMessage = null;
      } catch (error) {
        console.error('Error adding document:', error);
        this.errorMessage = 'Failed to add the document. Please try again.';
      }
    } else {
      this.errorMessage = 'Both document title and file are required.';
    }
  }

  async isLost(petId: number) {
    if (this.petDet.is_lost != true){
    const alert = await this.alertController.create({
      header: 'Mark as Lost',
      message: 'Is your pet lost? Do you want to add it to the lost pets list?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Mark as lost cancelled');
          },
        },
        {
          text: 'OK',
          handler: () => {
            this.markPetAsLost(petId);
            this.router.navigate(['/adoptionlist']);
          },
        },
      ],
    });

    await alert.present();
  } else {
    const alert = await this.alertController.create({
      header: 'Cancel Mark as Lost',
      message: 'Do you want to cancel mark your pet as lost?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Mark as lost cancelling cancelled');
          },
        },
        {
          text: 'OK',
          handler: () => {
            this.markPetAsLost(petId);
            this.router.navigate(['/adoptionlist']);
          },
        },
      ],
    });

    await alert.present();
  }

  }

  async AllowAdoption(petId: number) {
    if (this.petDet.allow_adoption != true){
    const alert = await this.alertController.create({
      header: 'Allow Adoption',
      message: 'Do you want to allow this pet for adoption?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Allow adoption cancelled');
          },
        },
        {
          text: 'OK',
          handler: () => {
            this.markPetForAdoption(petId);
            this.router.navigate(['/adoptionlist']);
          },
        },
      ],
    });

    await alert.present();
  } else {
    const alert = await this.alertController.create({
      header: 'Cancel Allow Adoption',
      message: 'Do you want to cancel allowing this pet for adoption?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Allow adoption cancelling cancelled');
          },
        },
        {
          text: 'OK',
          handler: () => {
            this.markPetForNoAdoption(petId);
            this.router.navigate(['/adoptionlist']);
          },
        },
      ],
    });

    await alert.present();
  }
  }

  async AllowSelling(petId: number, pet: any) {
    console.log(this.petDet.allow_selling);
    if (this.petDet.allow_selling !== 1 && this.petDet.allow_selling !== true) {
      const alert = await this.alertController.create({
        header: 'Sell Pet',
        message: 'Do you want to send your pet profile to market place?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Allow selling cancelled');
            },
          },
          {
            text: 'OK',
            handler: async () => {
              await this.markPetForSelling(petId);
              this.isEditMode = true; // Enable edit mode for price and description
              await this.promptModifyPetDetails(pet);
            },
          },
        ],
      });
  
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Cancel Pet Selling',
        message: 'Do you want to cancel selling your pet or modify price and description?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Selling cancelling cancelled');
            },
          },
          {
            text: 'Cancel Selling',
            handler: async () => {
              await this.markPetForNoSelling(petId);
              this.router.navigate(['/marketplace']);
            },
          },
          {
            text: 'Modefy',
            handler: async () => {
              await this.promptModifyPetDetails(pet);
            },
          },
        ],
      });
  
      await alert.present();
    }
  }

  private async promptModifyPetDetails(pet: any) {
    const modifyAlert = await this.alertController.create({
        header: 'Modify Pet Details',
        message: 'Please modify the price and description of your pet.',
        inputs: [
            {
                name: 'price',
                type: 'number',
                placeholder: 'Enter Price',
                value: pet.price || '', // Pre-fill with current price if available
            },
            {
                name: 'description',
                type: 'textarea',
                placeholder: 'Enter Description',
                value: pet.description || '', // Pre-fill with current description if available
                attributes: {
                    maxlength: 1000, // Set the maximum length for the description
                },
            },
        ],
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    console.log('Modification cancelled');
                },
            },
            {
                text: 'Save',
                handler: async (data) => {
                    // Validate description length before saving
                    if (data.description.length > 1000) {
                        const errorAlert = await this.alertController.create({
                            header: 'Error',
                            message: 'Description cannot exceed 1000 characters.',
                            buttons: ['OK'],
                        });
                        await errorAlert.present();
                        return; // Prevent saving if validation fails
                    }

                    // Update the pet object with new price and description
                    pet.price = data.price;
                    pet.description = data.description;

                    // Save the changes
                    await this.saveChanges(pet);
                },
            },
        ],
    });

    await modifyAlert.present();
}

  async AllowMating(petId: number) {
    if (this.petDet.is_neutered != "yes"){
    const alert = await this.alertController.create({
      header: 'Allow Mating',
      message: 'Do you want to find a mate for this pet?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Allow mating cancelled');
          },
        },
        {
          text: 'OK',
          handler: () => {
            this.markPetForMating(petId);
            this.router.navigate(['/adoptionlist']);
          },
        },
      ],
    });

    await alert.present();
  } else {
  const alert = await this.alertController.create({
    header: 'Cancel Allow Mating',
    message: 'Do you want to cancel finding a mate for this pet?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Allow mating cancelling have cancelled');
        },
      },
      {
        text: 'OK',
        handler: () => {
          this.markPetForNotMating(petId);
          this.router.navigate(['/adoptionlist']);
        },
      },
    ],
  });
  await alert.present();
} 
  }

  markPetForAdoption(petId: number) {
    this.petInfoService.updateAdoptionStatus(petId, true).subscribe(
      response => {
        console.log('Pet marked for adoption successfully:', response);
        this.petDet.allow_adoption = true; // Update the local state
      },
      error => {
        console.error('Error marking pet for adoption:', error);
      },
    );
  }

  markPetForNoAdoption(petId: number) {
    this.petInfoService.updateAdoptionStatus(petId, false).subscribe(
      response => {
        console.log('Pet marked for adoption successfully:', response);
        this.petDet.allow_adoption = true; // Update the local state
      },
      error => {
        console.error('Error marking pet for adoption:', error);
      },
    );
  }

  markPetForSelling(petId: number) {
    this.petInfoService.updateSellingStatus(petId, true).subscribe(
      response => {
        console.log('Pet marked for selling successfully:', response);
        this.petDet.allow_selling = true; // Update the local state
      },
      error => {
        console.error('Error marking pet for selling:', error);
      }
    );
  }
  
  markPetForNoSelling(petId: number) {
    this.petInfoService.updateSellingStatus(petId, false).subscribe(
      response => {
        console.log('Pet marked as not available for selling:', response);
        this.petDet.allow_selling = false; // Update the local state
      },
      error => {
        console.error('Error marking pet as not available for selling:', error);
      }
    );
  }

  markPetForMating(petId: number) {
    this.petInfoService.updateMatingStatus(petId, "yes").subscribe(
      response => {
        console.log('Pet marked for mating successfully:', response);
        this.petDet.is_neutered = "true"; // Update the local state
      },
      error => {
        console.error('Error marking pet for mating:', error);
      },
    );
  }

  markPetForNotMating(petId: number) {
    this.petInfoService.updateMatingStatus(petId, "no").subscribe(
      response => {
        console.log('Pet marked for mating successfully:', response);
        this.petDet.is_neutered = "true"; // Update the local state
      },
      error => {
        console.error('Error marking pet for mating:', error);
      },
    );
  }

  markPetAsLost(petId: number) {
    this.petInfoService.updateLostStatus(petId, true).subscribe(
      response => {
        console.log('Pet marked as lost successfully:', response);
        this.petDet.is_lost = true; // Update the local state
      },
      error => {
        console.error('Error marking pet as lost:', error);
      },
    );
  }

  markPetAsNotLost(petId: number) {
    this.petInfoService.updateLostStatus(petId, false).subscribe(
      response => {
        console.log('Pet marked as lost successfully:', response);
        this.petDet.is_lost = true; // Update the local state
      },
      error => {
        console.error('Error marking pet as lost:', error);
      },
    );
  }

  async viewPassportImage(petId: number) {
    const alert = await this.alertController.create({
      header: 'Manage Passport Image',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deletePassportImage(petId);
          },
        },
        {
          text: 'Change',
          handler: () => {
            this.changePassportImage(petId);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Action cancelled');
          },
        },
      ],
    });

    await alert.present();
  }

  deletePassportImage(petId: number) {
    this.petInfoService.deleteImage(petId).subscribe(
      response => {
        console.log('Image deleted successfully:', response);
        
        // Set image to null and force change detection
        this.petDet.image = null;
        this.changeDetectorRef.detectChanges();
        
        // Reload the pet details to refresh the view
        this.reloadPetDetails();
      },
      error => {
        console.error('Error deleting image:', error);
      }
    );
  }

  async loadImages() {
    if (this.petDet.image && this.petDet.image.trim() !== '' && !this.petDet.image.includes("via.placeholder.com")) {
        await this.petInfoService.uploadImage(this.petDet.image).then(res => {
            this.petDet.imageUrl = res;
            console.log('this.petDet.imageUrl', this.petDet.imageUrl);
        });
    } else {
        // If the condition is not met, log or handle the case as needed
        console.log('Image URL remains unchanged:', this.petDet.imageUrl);
    }
}

  async changePassportImage(petId: number) {
    const modal = await this.modalController.create({
      component: ChangeImageModalComponent,
      componentProps: { petId: petId },
    });

    modal.onDidDismiss().then(result => {
      if (result.data.approved && result.data.file) {
        this.uploadNewImage(petId, result.data.file);
      }
    });
    
    return await modal.present();
  }

  uploadNewImage(petId: number, file: File) {
    const formData = new FormData();
    formData.append('uploadedFile', file);
  
    this.petInfoService.updateImage(petId, formData).subscribe(
      response => {
        console.log('Image updated successfully:', response);
  
        this.petDet.image = null;
        this.changeDetectorRef.detectChanges();
        this.reloadPetDetails();
        this.petDet.imageUrl = this.petDet.image;
  
      },
      error => {
        console.error('Error updating image:', error);
      }
    );
  }

  reloadPetDetails() {
    this.petInfoService.getPet(this.id).subscribe(
      (response: any) => {
        this.petDet = response.data;
        this.loadImages();  // Assuming you need to reload images as well
        console.log('Pet details reloaded:', this.petDet);
      },
      (error) => {
        console.error('Error reloading pet details:', error);
      }
    );
  }
}
