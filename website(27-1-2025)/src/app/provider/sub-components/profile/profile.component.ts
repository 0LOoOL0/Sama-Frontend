
import { Component, OnInit} from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import axios from 'axios';
import { ProviderAuthService } from '../../../services/provider-auth.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{
  //providerData: any;

  constructor(private providerService: ProvidersService,  
    private authService: ProviderAuthService) {
    //cons param ^

  }

  // ngOnInit(){
  //   console.log("ini");
  //   this.providerData = this.authService.getProfile();
  //   console.log("provider data:", this.providerData);
  // }
  
//   async getProviderInfo(providerIdInput: number) {
    

//     try {

//   }catch(error){

//   }
// }
}
