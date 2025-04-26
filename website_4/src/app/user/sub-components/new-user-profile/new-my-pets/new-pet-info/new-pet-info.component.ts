import { Component, OnInit, OnDestroy } from '@angular/core';
import { PetinfoService, Pet } from '../../../../../services/petinfo.service';
import { Subscription } from 'rxjs';
import { PetSelectionService } from '../../../../../services/PetSelectionService'; // adjust path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-pet-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-pet-info.component.html',
  styleUrl: './new-pet-info.component.css'
})
export class NewPetInfoComponent implements OnInit, OnDestroy {
  selectedPet: Pet | null = null;
  private subscription!: Subscription; // definite assignment assertion added here

  constructor(private petSelectionService: PetSelectionService, private petService: PetinfoService) {}

  ngOnInit(): void {
    this.subscription = this.petSelectionService.selectedPet$.subscribe(pet => {
      this.selectedPet = pet;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isAdoptionPopupVisible: boolean = false;
    isSellPopupVisible: boolean = false;
    isMatePopupVisible: boolean = false;
    isLostPopupVisible: boolean = false;

    openAdoptionPopup() {
      this.isAdoptionPopupVisible = true;
    }
    openSellPopup() {
      this.isSellPopupVisible = true;
    }
    openMatePopup() {
      this.isMatePopupVisible = true;
    }
    openLostPopup() {
      this.isLostPopupVisible = true;
    }
  
    closePopup() {
      this.isAdoptionPopupVisible = false;
      this.isSellPopupVisible = false;
      this.isMatePopupVisible = false;
      this.isLostPopupVisible = false;
    }

    updateAdoption() {
      if (!this.selectedPet) return;
      this.petService.updateAdoptionStatus(this.selectedPet.id, 1).subscribe(() => {
        this.selectedPet!.allow_adoption = 1;
        this.closePopup();
      });
    }
    
    updateSell() {
      if (!this.selectedPet) return;
      this.petService.updateSellingStatus(this.selectedPet.id, 1).subscribe(() => {
        this.selectedPet!.allow_selling = 1;
        this.closePopup();
      });
    }
    
    updateMate() {
      if (!this.selectedPet) return;
      this.petService.updateMatingStatus(this.selectedPet.id, 1).subscribe(() => {
        this.selectedPet!.is_neutered = 1;
        this.closePopup();
      });
    }
    
    
    updateLost() {
      if (!this.selectedPet) return;
      this.petService.updateLostStatus(this.selectedPet.id, 1).subscribe(() => {
        this.selectedPet!.is_lost = 1;
        this.closePopup();
      });
    }
    
}
