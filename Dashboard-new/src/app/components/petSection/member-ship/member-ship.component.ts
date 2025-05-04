import { Component } from '@angular/core';
import { PetSectionService } from '../service/PetSectionServices';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-ship',
  imports: [/*RouterLink*/],
  templateUrl: './member-ship.component.html',
  styleUrl: './member-ship.component.css'
})
export class MemberShipComponent {
  constructor(private petSectionService: PetSectionService, private router: Router) {}

  navigateToAddPet(): void {
    const ownerId = this.petSectionService.getOwnerId();

    if (ownerId) {
      this.router.navigate(['/add-pet']);
    } else {
      console.error("Owner ID not found. Setting from previous data.");
      
      // Try retrieving from the state (if navigation from petOwnerList carried data)
      const state = history.state.ownerData;
      if (state && state.id) {
        this.petSectionService.setOwnerId(state.id);
        this.router.navigate(['/add-pet']);
      } else {
        console.error("No owner data available.");
      }
    }
  }
}

