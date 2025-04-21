import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
//import { AddNewOwnerProfileComponent } from '../add-new-owner-profile/add-new-owner-profile.component';
import { PetHeaderComponent } from "../pet-header/pet-header.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-add-new-owner',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink, PetHeaderComponent,RouterLinkActive],
  templateUrl: './add-new-owner.component.html',
  styleUrl: './add-new-owner.component.css'
})
export class AddNewOwnerComponent {

}
