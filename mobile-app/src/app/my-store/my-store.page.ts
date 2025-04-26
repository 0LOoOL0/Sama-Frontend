import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.page.html',
  styleUrls: ['./my-store.page.scss'],
})
export class MyStorePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  businessContract: string | ArrayBuffer | null = null;
  licenseCertificate: string | ArrayBuffer | null = null;

 
  uploadBusinessContract(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => (this.businessContract = reader.result);
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeBusinessContract(): void {
    this.businessContract = null;
  }

  uploadLicenseCertificate(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => (this.licenseCertificate = reader.result);
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeLicenseCertificate(): void {
    this.licenseCertificate = null;
  }
}