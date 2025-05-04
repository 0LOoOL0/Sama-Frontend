import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent {
  constructor(private router:Router){}
  choose(type: string){
      this.router.navigate(['user-main-component/choose-pet'], { queryParams: { value: type } });
  }
}
