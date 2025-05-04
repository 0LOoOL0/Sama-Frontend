import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-transfer-ownership-step2',
  standalone:true,
  imports:[NavbarComponent],
  templateUrl: './transfer-ownership-step2.component.html',
  styleUrls: ['./transfer-ownership-step2.component.css']
})
export class TransferOwnershipStep2Component {
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
      this.router.navigate(['/user-main-component/transfer-3']);
    } else {
      console.error('Form is invalid');
    }
  }
  addMorePets(){}
}
