import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-provider',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-provider.component.html',
  styleUrl: './add-provider.component.css',
})
export class AddProviderComponent {
  petCareForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.petCareForm = this.fb.group({
      providerNameEn: [''],
      providerNameAr: [''],
      startDate: [''],
      expiryDate: [''],
      crNo: [''],
      contact1: [''],
      contact2: [''],
      email: [''],
      address: [''],
      place: [''],
      country: [''],
      website: [''],
      instagram: [''],
      contactPersonName: [''],
      position: [''],
      contactPersonPhone: [''],
      contactPersonEmail: [''],
      providerTypeEn: [''],
      providerCategoryEn: [''],
      descriptionEn: [''],
      providerTypeAr: [''],
      providerCategoryAr: [''],
      descriptionAr: [''],
    });
  }

  onSubmit() {
    console.log(this.petCareForm.value);
  }
}
