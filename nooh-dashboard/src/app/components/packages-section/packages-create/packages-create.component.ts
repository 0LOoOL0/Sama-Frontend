import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PackageService } from '../service/package.service';

@Component({
  selector: 'app-packages-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './packages-create.component.html',
  styleUrls: ['./packages-create.component.css']
})
export class PackagesCreateComponent implements OnInit {
  packageForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string = '';
  isEditMode: boolean = false;
  packageId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private packageService: PackageService,
    private router: Router
  ) {
    // Initialize the reactive form with validators
    this.packageForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      duration: ['', Validators.required],
      second_price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      is_free_trial: [false, Validators.required],
      status_user: [false, Validators.required],
      status_staff: [false, Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      default_delivery: [''],
      apply_first_offer: [''],
      apply_second_offer: [''],
      title_ar: [''],
      description_ar: ['']
    });
    
  }

  ngOnInit(): void {
    const state = history.state;
    if (state && state.packageData) {
      const packageData = state.packageData;
      this.packageId = packageData.id;
      this.isEditMode = true;
      // Pre-fill the form with existing data
      this.packageForm.patchValue({
        title: packageData.title,
        description: packageData.description,
        price: packageData.price,
        duration: packageData.duration,
        second_price: packageData.second_price,
        is_free_trial: packageData.is_free_trial,
        status_user: packageData.status_user,
        status_staff: packageData.status_staff,
        start_date: packageData.start_date ? this.formatDate(new Date(packageData.start_date)) : '',
      end_date: packageData.end_date ? this.formatDate(new Date(packageData.end_date)) : '',
        default_delivery: packageData.default_delivery,
        apply_first_offer: packageData.apply_first_offer,
        apply_second_offer: packageData.apply_second_offer,
        title_ar: packageData.title_ar,
        description_ar: packageData.description_ar
      });
    }
  }
  

  onSubmit(): void {
    this.submitted = true;
    if (this.packageForm.invalid) {
      return;
    }
    if (this.isEditMode && this.packageId) {
      // Update existing package
      this.packageService.updatePackage(this.packageId, this.packageForm.value).subscribe(
        (response: any) => {
          console.log('Package updated:', response);
          this.router.navigate(['/packages-list']);
        },
        (error: any) => {
          console.error('Error updating package:', error);
          this.errorMessage = 'Error updating package. Please try again.';
        }
      );
    } else {
      // Create new package
      this.packageService.addPackage(this.packageForm.value).subscribe(
        (response: any) => {
          console.log('Package created:', response);
          this.router.navigate(['/packages-list']);
        },
        (error: any) => {
          console.error('Error creating package:', error);
          this.errorMessage = 'Error creating package. Please try again.';
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/packages-list']);
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }
  
}
