import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PackageService, Membership } from '../services/package.service';
import { PetInfoService, Pet } from '../services/pet-info.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  isModalOpen = false;
  isPetModalOpen = false;
  packages: any = [];
  myPets: any = [];
  selectedPackage: any = null;
  selectedPets: any[] = [];
  memberships: any = {};
  filteredMemberships: any[] = [];

  constructor(
    private packagesService: PackageService,
    private petService: PetInfoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.fetchSubscriptions();

    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        await this.closePetModal(); // Close the modal on route change
      }
    });
  }

 async fetchSubscriptions() {
    this.petService.fetchPets().then((response: any) => {
      this.myPets = response;
      console.log('myPets  ==========>', this.myPets);
      this.cdr.detectChanges();

      // Fetch memberships after pets are retrieved
      return this.packagesService.fetchMemeberships();
    }).then((response: any) => {
      const membershipsData = response.data.data;

      this.memberships = {};
      membershipsData.forEach((membership: any) => {
        if (this.myPets.some((pet: Pet) => pet.id === membership.pet_id)) {
          this.memberships[membership.pet_id] = membership; // Store in object
        }
      });

      console.log('Filtered memberships  ==========>', this.memberships);
      this.cdr.detectChanges();

      // Create an array from the memberships object
      this.filteredMemberships = Object.values(this.memberships);

      return this.packagesService.fetchPackages();
    }).then((response: any) => {
      const packagesData = response.data;

      const freeTrialPackageIds = packagesData
        .filter((membership: any) => membership.is_free_trial)
        .map((membership: any) => membership.id);

      const hasEverHadFreeTrial = this.myPets.some((pet: Pet) => {
        const membership = this.memberships[pet.id];
        return membership && freeTrialPackageIds.includes(membership.package_id);
      });

      this.packages = packagesData.filter((membership: any) => {
        return membership.status === 1 && !(membership.is_free_trial && hasEverHadFreeTrial);
      });

      console.log('Filtered Packages  ==========>', this.packages);
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  openPetModal(pkg: any) {
    this.selectedPackage = pkg;
    this.selectedPets = []; 
    this.setOpenPets(true);
  }

  async closePetModal() {
    this.isPetModalOpen = false; // Directly set to false
    this.selectedPets = []; // Clear selected pets if needed
    await this.modalController.dismiss();
  } 

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.selectedPets = [];
  }

  setOpenPets(isOpen: boolean) {
    this.isPetModalOpen = isOpen;
  }

  selectPet(pet: any) {
    const membership = this.memberships[pet.id];

    if (membership && this.isMembershipActive(membership)) {
      return; 
    }

    const index = this.selectedPets.indexOf(pet);
    if (index === -1) {
      this.selectedPets.push(pet); 
    } else {
      this.selectedPets.splice(index, 1); 
    }

    console.log('Selected Pets:', this.selectedPets);
  }

  confirmPetSelection() {
    if (this.selectedPets.length > 0 && this.selectedPackage) {
      const petsWithActiveMembership = this.selectedPets.filter(pet => {
        const membership = this.memberships[pet.id];
        return membership && this.isMembershipActive(membership);
      });
      const length = this.selectedPets.length
      if (petsWithActiveMembership.length > 0) {
        alert('Some selected pets already have an active membership. Please select pets without active memberships.');
        return;
      }
      const membershipData = {
        package_id: this.selectedPackage.id,
        pet_ids: this.selectedPets.map(pet => pet.id),
        start_date: new Date().toISOString(),
        end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
      };
      localStorage.setItem('membershipData', JSON.stringify(membershipData));
      console.log('Confirmed Pet Selections:', this.selectedPets);
      this.closePetModal();
      setTimeout(() => {
        this.router.navigate(['/check-out', 'sub', this.selectedPackage.price*length]);
      }, 300); // Adjust the delay as necessary
  
    }
  }

  edit(id: any) {
    this.closePetModal();
    this.router.navigate(['/petdetailes', id]);
  }

  isMembershipActive(membership: any): boolean {
    if (!membership) {
      return false;
    }

    const today = new Date();
    const endDate = new Date(membership.end_date);
    return endDate >= today;
  }

  getEndDate(petId: any): string | null {
    const membership = this.memberships[petId];
    if (membership) {
      const endDate = new Date(membership.end_date);
      return endDate.toLocaleDateString('en-US'); 
    }
    return null;
  }

  saveSelection(selectedPackage: any, selectedPet: any) {
    console.log('Saving selection:', selectedPackage, selectedPet);
  }

  async deleteSubscription(subscriptionId: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this subscription?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Deletion canceled');
          }
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await this.packagesService.deleteMembership(subscriptionId); // Await the deletion
              this.cdr.detectChanges(); // Trigger change detection
              await this.fetchSubscriptions(); // Fetch updated subscription
            } catch (error) {
              console.error('Error deleting subscription:', error);
            }
          }
        }
      ]
    });
    
    await alert.present(); // Present the alert
  }

  isSubscriptionActive(endDate: string): boolean {
    const today = new Date();
    const end = new Date(endDate);
    return end >= today;
  }
}
