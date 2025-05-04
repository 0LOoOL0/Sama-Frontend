import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pet-navigation',
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './pet-navigation.component.html',
  styleUrl: './pet-navigation.component.css'
})

export class PetNavigationComponent {

}
