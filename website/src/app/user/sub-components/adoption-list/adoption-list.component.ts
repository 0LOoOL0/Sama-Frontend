import { Component, OnInit } from '@angular/core';
import { PetOwnerService } from '../../../services/pet-owner.service'; 
import { PetinfoService, Pet } from '../../../services/petinfo.service';
import { UserServiceService } from '../../../services/user.service.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';



@Component({
  selector: 'app-adoption-list', // Selector used to identify this component in HTML
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NavbarComponent],
  templateUrl: './adoption-list.component.html', // Path to the component's HTML template
  styleUrls: ['./adoption-list.component.css'] // Path to the component's CSS file
})
export class AdoptionListComponent implements OnInit {
  // Array to hold all the pets displayed on the adoption list page
  pets: Pet[] = [];
  filteredPets: Pet[] = []; // Array to hold filtered pets

  searchTerm: string = '';

  // Variables for dynamic hero text
heroHeadingText: string = `Adopt a Pet or Reunite <br>with a Lost Companion`;
mainText: string = `Sama Care’s Adoption Center helps you find adoptable pets or reconnect lost animals with their owners. Explore loving cats,<br> dogs, and more, or use our Lost & Found section to bring companions back home. Together,  let’s support pets in Bahrain.`;

  searchControl: FormControl = new FormControl(); // Form control for search input
  filterCriteria: string = ''; // Filter criteria

  constructor(
    private petOwnerService: PetOwnerService,
    private petInfoService: PetinfoService,
    private userService: UserServiceService,
    private userAuthService: UserAuthService
  ) {}

  // Lifecycle hook that gets called after the component has been initialized
  ngOnInit(): void {
    this.petInfoService.getPetsForAdoption().subscribe(
      (data: Pet[]) => {
        this.pets = data; // Assign the fetched data to the pets array
      },
      (error) => {
        console.error('Error fetching pets for adoption:', error);
      }
    );

    // Listen for changes in the search input and filter the pets list
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((searchTerm) => {
      this.filterCriteria = searchTerm.toLowerCase();
      this.filterPets();
    });
  }

  // Method to filter pets based on search input
  filterPets(): void {
    if (this.filterCriteria) {
      this.filteredPets = this.filteredPets.filter((pet) =>
        pet.name.toLowerCase().includes(this.filterCriteria));
    } else {
      this.filteredPets = this.pets;
    }
  }
}
