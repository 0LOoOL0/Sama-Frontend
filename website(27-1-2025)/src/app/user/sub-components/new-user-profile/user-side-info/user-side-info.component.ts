import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../../../services/user-auth.service';

@Component({
  selector: 'app-user-side-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-side-info.component.html',
  styleUrls: ['./user-side-info.component.css', '../new-user-profile.component.css']
})
export class UserSideInfoComponent implements OnInit {

  userProfile: any;
  address = {
    a: '',
    b: '',
    c:'',
    d:'',
    e:'',
    f:'',
    g:'',
    h:'',
    i:''
  };
  displayedAdd: string = '';

   constructor(private userAuthService: UserAuthService) {}

   ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userAuthService.fetchProfileData()
      .then((profileData: any) => {
        this.userProfile = profileData;
        this.loadAddress();
      })
      .catch(error => {
        console.error('Error loading user profile:', error);
      });
  }

  loadAddress(){
    if(this.userProfile.location === 'office'){
      this.address.a = 'Location: ' + this.userProfile.location;
      this.address.b = ', City: ' + this.userProfile.city;
      this.address.c = ', Road: ' + this.userProfile.road;
      this.address.d = ', Block: ' + this.userProfile.block;
      this.address.e = ', Building: ' + this.userProfile.building_name;
      this.address.f = ', Floor: ' + this.userProfile.floor;
      this.address.g = ', Company: ' + this.userProfile.company;
      this.displayedAdd = this.address.a+this.address.b+this.address.c+this.address.d+this.address.e+this.address.f+this.address.g;    
    
    }else if(this.userProfile.location == 'House'){
      // this.address.a = 'Location: ' + this.userProfile.location;
      this.address.b = 'City: ' + this.userProfile.city;
      this.address.c = ', House: ' + this.userProfile.house;
      this.address.d = ', Road: ' + this.userProfile.road;
      this.address.e = ', Block: ' + this.userProfile.block;
      this.displayedAdd = this.address.a+this.address.b+this.address.c+this.address.d+this.address.e;
    
    }else if(this.userProfile.location === 'apartment'){
      this.address.a = 'Location: ' + this.userProfile.location;
      this.address.b = ', City: ' + this.userProfile.city;
      this.address.c = ', Road: ' + this.userProfile.road;
      this.address.d = ', Block: ' + this.userProfile.block;
      this.address.e = ', Building: ' + this.userProfile.building_name;
      this.address.f = ', Apartment: ' + this.userProfile.apartment;
      this.address.g = ', Floor: ' + this.userProfile.floor;
      
      this.displayedAdd = this.address.a+this.address.b+this.address.c+this.address.d+this.address.e+this.address.f+this.address.g; 
    }
  }
}
