import { Component } from '@angular/core';
import { NavbarComponent } from '../../../user/sub-components/navbar/navbar.component';

@Component({
  selector: 'app-pet-profile',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './pet-profile.component.html',
  styleUrl: './pet-profile.component.css'
})
export class PetProfileComponent {

}
