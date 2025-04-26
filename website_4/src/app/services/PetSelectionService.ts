import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pet } from './petinfo.service'; // adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class PetSelectionService {
  private selectedPetSubject = new BehaviorSubject<Pet | null>(null);
  selectedPet$ = this.selectedPetSubject.asObservable();

  setSelectedPet(pet: Pet | null): void {
    this.selectedPetSubject.next(pet);
  }
}
