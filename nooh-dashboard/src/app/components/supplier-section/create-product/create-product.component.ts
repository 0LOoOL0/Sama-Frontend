import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../service/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  // New property for product image in Base64 format.
  productImageBase64: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private toastr: ToastrService,
    private router: Router
  ) {
    // Initialize the form with all product fields.
    this.productForm = this.fb.group({
      product_name_en: ['', Validators.required],
      product_name_ar: ['', Validators.required],
      pet_type: ['', Validators.required],
      status: [1, Validators.required],          // Default to 1 (true)
      pet_owner_id: [0, Validators.required],      // Default to 0 if not collected
      quantity: ['', [Validators.required, Validators.min(1)]],
      start_date: ['', Validators.required],
      received_date: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      delivery_price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // This component is solely for creating products.
  }

  // Trigger the hidden file input when the image is clicked.
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Handler for file selection.
  onProductImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Optionally add type checking.
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.toastr.error('Invalid file type. Only PNG, JPG, or JPEG are allowed.');
        this.productImageBase64 = null;
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          this.productImageBase64 = e.target.result as string;
          console.log('Product image Base64:', this.productImageBase64);
        }
      };
      reader.readAsDataURL(file);
    }
  }


  submitProduct(): void {
    if (this.productForm.valid) {
      const formData = {
        ...this.productForm.value,
        imageUrl: this.productImageBase64
      };
        // Send the Base64 string as "imageUrl"
      this.supplierService.addProduct(formData).subscribe({
        next: (response: any) => {
          this.toastr.success('Product created successfully!');
          this.productForm.reset();
          this.router.navigate(['/products']);
        },
        error: (error: any) => this.handleError(error)
      });
    } else {
      this.toastr.warning('Please fill in all required fields.');
    }
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    this.toastr.error('Operation failed.');
  }
}
