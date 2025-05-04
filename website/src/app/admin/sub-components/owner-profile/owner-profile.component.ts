import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PetOwnerService } from '../../../services/pet-owner.service';
import { PetinfoService } from '../../../services/petinfo.service';
import { PackagesService } from '../../../services/packages.service';
import { CollarService } from '../../../services/collar.service';
@Component({
  selector: 'app-owner-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.scss']
})
export class OwnerProfileComponent implements OnInit {
  ownerId: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  profileImage: string = '';
  place: string = '';
  houseAddress: string = '';
  roadAddress: string = '';
  blockAddress: string = '';
  nationality: string = '';
  fullName: string = `${this.firstName} ${this.lastName}`;
  allPets: any[] = [];
  shownPets: any[] = [];
  membershipsPets: any[] = [];
  nonMembershipsPets: number = 0;
  freeTrialPets: number = 0;
  dateOfBirth: string = '';

  constructor(private route: ActivatedRoute, private petOwnerService: PetOwnerService,
    private petInfoService: PetinfoService, private packagesService: PackagesService,
    private colSer: CollarService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ownerId = params.get('owner-id') || '';
      this.loadOwnerProfile(this.ownerId);
    });
  }

  async loadOwnerProfile(ownerId: string) {
    const profileData = (await this.petOwnerService.getPetOwnerData(ownerId)).data.data;
    console.log('Profile data:', profileData);
    this.ownerId = profileData.id;
    this.firstName = profileData.first_name;
    this.lastName = profileData.last_name;
    this.fullName = `${this.firstName} ${this.lastName}`;
    this.email = profileData.email;
    this.phone = profileData.phone;
    this.houseAddress = profileData.house;
    this.roadAddress = profileData.road;
    this.blockAddress = profileData.block;
    this.place = profileData.city;
    this.profileImage = profileData.profile_image;
    this.nationality = profileData.nationality;
    this.address = `${this.houseAddress}, ${this.roadAddress}, ${this.blockAddress}`;
    this.dateOfBirth = profileData.date_of_birth;
    const ownerPets = (await this.petOwnerService.getPetsByOwnerId(Number(ownerId))).pets;
    for (const pet of ownerPets) {
      console.log('Pet:', pet);
      let petMembership = null;
      try {
        petMembership = (await this.petInfoService.getPetMembership(pet.id)).data.data;
      } catch (error) {
        console.error('No membership', error);
      }
      if (!petMembership) {
        this.nonMembershipsPets++;
        console.log('Pet has no membership:', pet);
        continue;
      }
      console.log('petMembership:', petMembership);
      const packageId = petMembership.package_id;
      const packageData = (await this.packagesService.getPackageById(packageId)).data;
      console.log('packageData:', packageData);
      if (packageData.is_free_trial === 1 && packageData.status === 1) {
        this.freeTrialPets++;
      } else {
        this.membershipsPets.push(pet);
      }
    }
    this.allPets.push(...ownerPets);
    this.shownPets = this.allPets;
  }



    invoices = [
      {
        petName: 'Buddy', issueDate: '2023-01-01', expiryDate: '2024-01-01', userType: 'member',
        status: 'paid', period: '', package: 'gold', delivery: 'yes', tax: 5, amount: 100, image: 'path/to/buddy.jpg'
      },
      {
        petName: 'Max', issueDate: '2023-02-01', expiryDate: '2024-02-01', userType: 'free-trial',
        status: 'pending', period: '', package: 'silver', delivery: 'yes', tax: 5, amount: 50, image: 'path/to/max.jpg'
      },
      {
        petName: 'Bella', issueDate: '2023-03-01', expiryDate: '2024-03-01', userType: 'non-member',
        status: 'done', period: '', package: 'none', delivery: 'no', tax: 0, amount: 0, image: 'path/to/bella.jpg'
      }
    ];

    togglePetSelection(pet: any) {
      pet.selected = !pet.selected;
    }

    performAction(action: string) {
      const selectedPets = this.allPets.filter(pet => pet.selected);
      if (selectedPets.length > 0) {
        console.log(`Performing ${action} action on`, selectedPets);
        // Implement the logic for adopt/lost/mate actions here
      } else {
        alert('Please select at least one pet.');
      }
    }

    addPet() {
      console.log('Adding a new pet');
      // Implement the logic for adding a pet here
    }

    printCard() {
      console.log('Printing card');
      // Implement the logic for printing a card here
    }

    printInvoice() {
      console.log('Printing invoice');
      // Implement the logic for printing an invoice here
    }

    calculatePeriod(invoice: any) {
      if (invoice.issueDate && invoice.expiryDate) {
        const issueDate = new Date(invoice.issueDate);
        const expiryDate = new Date(invoice.expiryDate);
        const timeDiff = Math.abs(expiryDate.getTime() - issueDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        invoice.period = `${Math.floor(diffDays / 30)} Months`;
      }
    }
    confirmCode(petId:number, code:any){
      this.colSer.updateCollar(petId, code);
      console.log('successful update');
    }
  }
