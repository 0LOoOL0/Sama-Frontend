import { Component, OnInit } from '@angular/core';

interface Contact {
  name: string;
  jobTitle: string;
  phoneNumber: string;
  email: string;
}

@Component({
  selector: 'app-providerprofilesetup',
  templateUrl: './providerprofilesetup.page.html',
  styleUrls: ['./providerprofilesetup.page.scss'],
})
export class ProviderprofilesetupPage implements OnInit {
  profile = {
    businessName: '',
    phoneNumber: '',
    companyEmail: '',
    location: 'House',
    house: '',
    road: '',
    block: '',
    buildingNumber: '',
    apartmentNo: '',
    floor: '',
    street: '',
    buildingName: '',
    buildingNumberOffice: '',
    companyName: '',
    floorOffice: '',
    streetOffice: '',
    contacts: [] as Contact[]
  };

  constructor() { }

  ngOnInit() { }

  addContact() {
    if (this.profile.contacts.length < 5) {
      this.profile.contacts.push({
        name: '',
        jobTitle: '',
        phoneNumber: '',
        email: ''
      });
    }
  }

  removeContact(index: number) {
    this.profile.contacts.splice(index, 1);
  }

  next() {
    // Implement the logic to navigate to the next step
  }
}
