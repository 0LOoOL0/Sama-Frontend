import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/share/header/header.component';
import { AddPetComponent } from './components/petSection/add-pet/add-pet.component';
import { TransferComponent } from './components/petSection/popups/transfer/transfer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent/*, AddPetComponent, TransferComponent*/],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SamaPet';
}
