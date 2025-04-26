import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PetInfoService } from '../services/pet-info.service';

@Component({
  selector: 'app-transfer-ownership',
  templateUrl: './transfer-ownership.page.html',
  styleUrls: ['./transfer-ownership.page.scss'],
})
export class TransferOwnershipPage implements OnInit {
  NewEmail: any;
  id: any;
  constructor(
    private alertController: AlertController,
    private activeRoute: ActivatedRoute,
    private petService: PetInfoService, // Add your service here
  ) {}

  ngOnInit() {
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    console.log('id in ogOnInit=====>', this.id);
  }

  async transfer() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to transfer this pet?`,
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
            this.transferOwnerShip();
          },
        },
      ],
    });

    await alert.present();
  }

  async transferOwnerShip() {
    try {
      const response: any = await this.petService
        .getOwnerIdByEmail(this.NewEmail)
        .toPromise();
      if (response && response.ownerId) {
        await this.petService
          .updatePetOwner(this.id, response.ownerId)
          .toPromise();
        console.log('Ownership transferred successfully');
        // Handle successful transfer, maybe navigate away or show a message
      } else {
        console.log('No owner found with that email');
        // Handle no owner found
      }
    } catch (error) {
      console.error('Error transferring ownership:', error);
      // Handle errors, maybe show an alert
    }
  }
}
