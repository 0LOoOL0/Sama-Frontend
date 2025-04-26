import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { PetOwnerService } from '../../../services/pet-owner.service';


export interface IpetOwner {
  id: number;
  date: string;
  ownerName: string;
  contact: string;
  email: string;
  pets: Ipet[];
  status: string;
  noOfMembership?: number;
}

export interface Ipet {
  id: number;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  gender: string;
  name: string;
  age: string;
  weight: string;
  height: string;
  pet_type: string;
  breed: string;
  color: string;
  image: string;
  is_vaccinated: string;
  is_microchipped: string;
  is_neutered: string;
  is_lost: number;
  allow_adoption: number;
  documents: string;
  pet_owner_id: number;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss',
    './style.css', './output.css'
  ],
})
export class UserProfileComponent {
  constructor(private petOwnerService: PetOwnerService, private cdr: ChangeDetectorRef) { }
  @ViewChild('statusSelect') statusSelect!: ElementRef;
  @ViewChild('typeOfPetTextInput') typeOfPetTextInput!: ElementRef;
  @ViewChild('NoOfPetsRadioInput') NoOfPetsRadioInput!: ElementRef;
  @ViewChild('comparisonInputText') comparisonInputText!: ElementRef;
  @ViewChild('comparisonOperatorSelect') comparisonOperatorSelect!: ElementRef;
  membersCount: number = 0;
  nonMemberCount: number = 0;
  freeTrialsCount: number = 0;
  allPetOwners: IpetOwner[] = [];
  shownPetOwners: IpetOwner[] = [];
  petsExpanded: boolean = false;
  noOfPets: number = 0;
  discountAmount: number = 0;
  amountPaid: number = 0;
  async ngOnInit() {
    try {
      const response = await this.petOwnerService.getAllPetOwners();
      const petOwnersList = response.data.data;
      console.log(petOwnersList);
      for (const petOwner of petOwnersList) {
        const petsResponse = await this.getPetsOfOwner(petOwner.id);
        console.log('Pets:', petsResponse.pets);
        const pets: Ipet[] = petsResponse.pets;

        const p: IpetOwner = {
          id: petOwner.id,
          date: new Date(petOwner.date_of_birth)
            .toLocaleDateString('en-GB')
            .replace(/\//g, '/'),
          ownerName: petOwner.first_name + ' ' + petOwner.last_name,
          contact: petOwner.phone.toString(),
          email: petOwner.email.toString(),
          pets: pets,
          status: petOwner.status,
        };
        this.allPetOwners.push(p);

        console.log('Pet owner:', p);
        if (p.status === 'Member') {
          this.membersCount++;
        } else if (p.status === 'Non-member') {
          this.nonMemberCount++;
        } else {
          this.freeTrialsCount++;
        }
      }
      this.shownPetOwners = [...this.allPetOwners];
      console.log('shownPetOwners:', this.shownPetOwners);
      this.cdr.detectChanges();
    } catch (error) {
      console.log('err:', error);
    }
  }

  selectStatus(status: string): void {
    this.statusSelect.nativeElement.value = status;
    this.onStatusChange({ target: { value: status } });
  }

  onStatusChange(event: any): void {
    console.log("OnStatusChange");
    const selectedType = event.target.value.toLowerCase().replace(' ', '-');
    const filteredPetOwners = this.allPetOwners.filter((petOwner: any) => {
      if (event.target.value === 'all') {
        return true; // Include all providers
      } else {
        const userStatus = petOwner.status.toLowerCase().replace(' ', '-');
        return userStatus === selectedType;
      }
    });
    this.shownPetOwners = [...filteredPetOwners];
    this.cdr.detectChanges();
  }

  onTypeOfPetChange(event: any): void {
    console.log("onTypeOfPetChange");
    const searchValue = event.target.value.toLowerCase();
    const filteredPetOwners = this.allPetOwners.filter((petOwner: any) => {
      const pets = petOwner.pets;
      return pets.some((pet: any) => pet.pet_type.toLowerCase().includes(searchValue));
    });
    this.shownPetOwners = [...filteredPetOwners];
    this.cdr.detectChanges();
  }

  onComparisonTextChange(): void {
    const comparisonValue = this.comparisonInputText.nativeElement.value;
    if (comparisonValue === '' || isNaN(Number(comparisonValue)) || typeof comparisonValue ==='undefined' || comparisonValue === null) {
      this.shownPetOwners = [...this.allPetOwners];
      return;
    }
    const comparisonOperator = this.comparisonOperatorSelect.nativeElement.value;;
    const filteredPetOwners = this.allPetOwners.filter((petOwner: any) => {
      const pets = petOwner.pets;
        if (comparisonOperator === '=') {
          return petOwner.pets.length == Number(comparisonValue);
        } else if (comparisonOperator === '>=') {
          return petOwner.pets.length >= Number(comparisonValue);
        } else if (comparisonOperator === '>=') {
          return petOwner.pets.length <= Number(comparisonValue);
        } else {
          return true;
        }
    });
    this.shownPetOwners = [...filteredPetOwners];
    this.cdr.detectChanges();
  }

  togglePetsExpanded() {
    this.petsExpanded = !this.petsExpanded;
  }
  // Methods for add, edit, delete actions
  addAction() {
    console.log('Add action triggered');
  }

  editAction() {
    console.log('Edit action triggered');
  }

  deleteAction() {
    console.log('Delete action triggered');
  }

  async getPetsOfOwner(ownerId: number) {
    let pets: any = await this.petOwnerService.getPetsByOwnerId(ownerId)
    console.log('Pets before loop:', pets);
    console.log('Type of pets:', typeof pets);
    console.log('Is pets an array:', Array.isArray(pets.pets));
    
    Array.from(pets.pets).forEach((pet: any) => {
      console.log('Pet HERERER:', pet);
      pet.created_at = new Date(pet.created_at)
        .toLocaleDateString('en-GB')
        .replace(/\//g, '/');
      pet.updated_at = new Date(pet.updated_at)
        .toLocaleDateString('en-GB')
        .replace(/\//g, '/');
      pet.deleted_at = new Date(pet.deleted_at)
        .toLocaleDateString('en-GB')
        .replace(/\//g, '/');
      const ageInMilliseconds = (new Date()).getTime() - new Date(pet.age).getTime();
      const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
      pet.age = Math.floor(ageInYears);
      console.log('age:', ageInYears);
    });
    return pets;
  }



  onSearchChange(event: any): void {
    console.log("onSearchChange");
    const searchValue = event.target.value.toLowerCase();
    const filteredPetOwners = this.allPetOwners.filter((petOwner: any) => {
      const ownerName: string = (petOwner.first_name + ' ' + petOwner.last_name).toLocaleLowerCase();
      const contact: string = String(petOwner.contact);
      const email: string = petOwner.email.toLocaleLowerCase();
      const petName: string = 'Whiskers'.toLocaleLowerCase();
      const type: string = 'Cat'.toLocaleLowerCase();
      const status: string = petOwner.status.toLocaleLowerCase();
      const period: string = '1 year'.toLocaleLowerCase();
      return (
        ownerName.includes(searchValue) ||
        contact.includes(searchValue) ||
        email.includes(searchValue) ||
        petName.includes(searchValue) ||
        type.includes(searchValue) ||
        status.includes(searchValue) ||
        period.includes(searchValue)
      );

    });
    this.shownPetOwners = [...filteredPetOwners]; // Create a new array reference
    this.cdr.detectChanges();
  }

}

