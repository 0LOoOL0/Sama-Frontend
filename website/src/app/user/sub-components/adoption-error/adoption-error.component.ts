import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PetinfoService } from '../../../services/petinfo.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adoption-error',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,NavbarComponent],
  templateUrl: './adoption-error.component.html',
  styleUrls: ['./adoption-error.component.css']
})
export class AdoptionErrorComponent implements OnInit {
  searchControl: FormControl = new FormControl(); // Form control for search input
  filterCriteria: string = ''; // Filter criteria
  petTypes: string[] = ['Cats', 'Dogs', 'Fish', 'Birds', 'Tortoise', 'Horse', 'Hamsters', 'Rabbits', 'Camels', 'Livestock', 'Reptiles', 'Others'];
  selectedPetType: string = '';
  gender: string = '';
  breed: string = '';
  age: number = 0;
  kilometer: number = 0;

  constructor(private petInfoService: PetinfoService) {}

  ngOnInit(): void {
    // Listen for changes in the search input and update the filter criteria
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((searchTerm) => {
      this.filterCriteria = searchTerm.toLowerCase();
      this.applyFilters();
    });
  }

  applyFilters(): void {
    // Logic to apply filters to the pets (not implemented in this example)
    console.log('Applying filters', {
      filterCriteria: this.filterCriteria,
      selectedPetType: this.selectedPetType,
      gender: this.gender,
      breed: this.breed,
      age: this.age,
      kilometer: this.kilometer
    });
  }
}
