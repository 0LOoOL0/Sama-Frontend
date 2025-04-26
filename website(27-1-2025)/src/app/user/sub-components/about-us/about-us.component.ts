import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './about-us.component.html',
  styleUrls: [
  './custom-style.css', './style.css', './resposiveness.css']
})
export class AboutUsComponent {

}
