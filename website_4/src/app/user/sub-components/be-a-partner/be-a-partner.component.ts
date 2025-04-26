import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-be-a-partner',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './be-a-partner.component.html',
  styleUrls: ['./be-a-partner.component.css', '../../../shared/css/style.css']
})


export class BeAPartnerComponent {
  constructor(private http: HttpClient) {}

  partner = {
    businessName: '',
    businessCategory: '',
    managerName: '',
    email: '',
    phone: '',
    businessAddress: '',
    socialMedia: ''
  };

  submitForm() {
    const { businessName, businessCategory, managerName, email, phone, businessAddress } = this.partner;
    if (!businessName || !businessCategory || !managerName || !email || !phone || !businessAddress) {
      alert('Please fill in all required fields.');
      return;
    }

    const providerData = {
      type: businessCategory,
      name: businessName,
      contact_no: phone,
      email: email,
      provider_name_en: managerName,
      provider_name_ar: managerName,
      instagram: this.partner.socialMedia || '',
      office: businessAddress,
      road: '',
      block: '',
      city: '',
      password: 'Null',
      status: 'awaiting', // You can also send 'deactive'
      social_media: JSON.stringify([]),
      documents: JSON.stringify([]),
      availability_days: JSON.stringify([]),
      availability_hours: JSON.stringify({ start: '', end: '' }),
      authorized_persons: JSON.stringify([])
    };

    this.http.post('http://localhost:8000/api/providers', providerData)
      .subscribe({
        next: (res) => {
          alert(`Thank you, ${this.partner.managerName}! Your request has been sent.`);
          this.partner = {
            businessName: '',
            businessCategory: '',
            managerName: '',
            email: '',
            phone: '',
            businessAddress: '',
            socialMedia: ''
          };
        },
        error: (err) => {
          console.error(err);
          alert('Something went wrong. Please try again.');
        }
      });
  }
}

