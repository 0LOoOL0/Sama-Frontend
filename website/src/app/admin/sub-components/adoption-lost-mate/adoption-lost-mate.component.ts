import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pet {
  name: string;
  dateLabel: string;
  dateValue: string;
  dateTransfer: string;
  newOwner: string;
  contact: string;
  email: string;
  outOn: string;
  image: string;
}

@Component({
  selector: 'app-adoption-lost-mate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adoption-lost-mate.component.html',
  styleUrls: ['./adoption-lost-mate.component.scss']
})
export class AdoptionLostMateComponent implements OnInit {

  activeTab: string = 'adoption';
  totalNumber: number = 15;
  totalLeft: number = 8;
  totalTransfer: number = 7;

  adoptionPets = [
    { name: 'Buddy', dateAdopted: this.formatDate('2023-01-15'), dateTransfer: this.formatDate('2023-02-20'), newOwner: 'John Smith', contact: '123-456-7890', email: 'john.smith@example.com', outOn: 'N/A', image: 'assets/buddy.jpg' },
    { name: 'Whiskers', dateAdopted: this.formatDate('2023-03-10'), dateTransfer: this.formatDate('2023-04-05'), newOwner: 'Jane Doe', contact: '987-654-3210', email: 'jane.doe@example.com', outOn: 'N/A', image: 'assets/whiskers.jpg' }
  ];

  lostPets = [
    { name: 'Shadow', dateLost: this.formatDate('2023-02-01'), newOwner: 'N/A', contact: 'N/A', email: 'N/A', outOn: 'N/A', image: 'assets/shadow.jpg' },
    { name: 'Misty', dateLost: this.formatDate('2023-04-10'), newOwner: 'N/A', contact: 'N/A', email: 'N/A', outOn: 'N/A', image: 'assets/misty.jpg' }
  ];

  matePets = [
    { name: 'Rocky', dateAvailableForMate: this.formatDate('2023-05-15'), newOwner: 'N/A', contact: 'N/A', email: 'N/A', outOn: 'N/A', image: 'assets/rocky.jpg' },
    { name: 'Luna', dateAvailableForMate: this.formatDate('2023-06-25'), newOwner: 'N/A', contact: 'N/A', email: 'N/A', outOn: 'N/A', image: 'assets/luna.jpg' }
  ];

  currentPets: Pet[] = [];

  ngOnInit() {
    this.setTab(this.activeTab);  // Initialize currentPets based on the default active tab
  }

  setTab(tab: string) {
    this.activeTab = tab;
    this.currentPets = this.getCurrentPets();  // Update currentPets whenever the tab changes
  }

  getCurrentPets(): Pet[] {
    switch (this.activeTab) {
      case 'adoption':
        return this.adoptionPets.map(pet => ({
          name: pet.name,
          dateLabel: 'Date Adopted',
          dateValue: pet.dateAdopted,
          dateTransfer: pet.dateTransfer,
          newOwner: pet.newOwner,
          contact: pet.contact,
          email: pet.email,
          outOn: pet.outOn,
          image: pet.image
        }));
      case 'lost':
        return this.lostPets.map(pet => ({
          name: pet.name,
          dateLabel: 'Date Lost',
          dateValue: pet.dateLost,
          dateTransfer: 'N/A',  // Placeholder for non-applicable fields
          newOwner: pet.newOwner,
          contact: pet.contact,
          email: pet.email,
          outOn: pet.outOn,
          image: pet.image
        }));
      case 'mate':
        return this.matePets.map(pet => ({
          name: pet.name,
          dateLabel: 'Date Available for Mating',
          dateValue: pet.dateAvailableForMate,
          dateTransfer: 'N/A',  // Placeholder for non-applicable fields
          newOwner: pet.newOwner,
          contact: pet.contact,
          email: pet.email,
          outOn: pet.outOn,
          image: pet.image
        }));
      default:
        return [];
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // Format as 'YYYY-MM-DD'
  }
}
