import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-transfer-ownership-step1',
  standalone:true,
  imports: [NavbarComponent],
  templateUrl: './transfer-ownership-step1.component.html',
  styleUrls: ['./transfer-ownership-step1.component.css']
})
export class TransferOwnershipStep1Component {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Data: ', this.contactForm.value);
      // Code to handle form submission, e.g., navigating to the next step.
      this.router.navigate(['/user-main-component/transfer-2']);
    } else {
      console.error('Form is invalid');
    }
  }
  skip(){this.router.navigate(['/user-main-component/transfer-2']);}
}
