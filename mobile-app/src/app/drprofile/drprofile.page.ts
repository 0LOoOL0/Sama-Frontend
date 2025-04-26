import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ProviderService, Provider } from '../services/provider.service';
import { ProviderService, Provider, Service, Product, Veterinarian } from '../services/provider.service';
@Component({
  selector: 'app-drprofile',
  templateUrl: './drprofile.page.html',
  styleUrls: ['./drprofile.page.scss'],
})
export class DrprofilePage implements OnInit {
  veterinarianId: number | undefined;
  veterinarian: Veterinarian | undefined; 
  // doctor = {
  //   name: 'Sophia',
  //   phoneNumber: '31234567',
  //   nationality: 'Bahraini',
  //   dob: {
  //     day: 18,
  //     month: 2,
  //     year: 1990
  //   }
  // };

  // nationalities = ['Bahraini', 'American', 'British', 'Indian', 'Canadian'];
  // days = Array.from({ length: 31 }, (_, i) => i + 1);
  // months = [
  //   { name: 'January', value: 1 },
  //   { name: 'February', value: 2 },
  //   { name: 'March', value: 3 },
  //   { name: 'April', value: 4 },
  //   { name: 'May', value: 5 },
  //   { name: 'June', value: 6 },
  //   { name: 'July', value: 7 },
  //   { name: 'August', value: 8 },
  //   { name: 'September', value: 9 },
  //   { name: 'October', value: 10 },
  //   { name: 'November', value: 11 },
  //   { name: 'December', value: 12 },
  // ];
  // years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  constructor( 
    private activatedRoute: ActivatedRoute,  
    private providerService: ProviderService,
 ) { }

 ngOnInit() {
  this.veterinarianId= +this.activatedRoute.snapshot.paramMap.get('id')!;
  if (this.veterinarianId) {
    this.loadVeterinarians(this.veterinarianId);
  }
}

loadVeterinarians(id: number) {
  this.providerService.getVeterianById(id)
    .then(response => {
      if (Array.isArray(response.data)) {
        this.veterinarian = response.data[0];
      } else {
        this.veterinarian = response.data;
      }
    })
    .catch(error => {
      console.error('Error fetching veterinarian details:', error);
    });
}

}