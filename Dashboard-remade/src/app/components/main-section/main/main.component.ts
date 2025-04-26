import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { HeaderComponent } from '../../share/header/header.component';



@Component({
  selector: 'app-main',
  imports: [RouterModule,HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
