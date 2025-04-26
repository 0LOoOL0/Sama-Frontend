import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-transfer-ownership-step3',
  standalone:true,
  imports: [NavbarComponent],
  templateUrl: './transfer-ownership-step3.component.html',
  styleUrls: ['./transfer-ownership-step3.component.css']
})
export class TransferOwnershipStep3Component {
  petSelectionForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.petSelectionForm = this.fb.group({
      pets: this.fb.array([])
    });
  }

  onSubmit(): void {
    if (this.petSelectionForm.valid) {
      console.log('Selected Pets: ', this.petSelectionForm.value);
      // Code to handle form submission, e.g., navigating to the next step.
      this.router.navigate(['/user-main-component/my-pets']);
    } else {
      console.error('Form is invalid');
    }
  }
}
