import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../../user/sub-components/navbar/navbar.component';

import { ProvidersService } from '../../../services/providers.service';
import { Product, ProductService } from '../../../services/product.service';
import { ProviderAuthService } from '../../../services/provider-auth.service';
import { SignupStepsComponent } from '../../../shared/signup-steps/signup-steps.component';
import { CommonModule } from '@angular/common';
import { ServicePageService } from '../../../services/service-page.service';

@Component({
  selector: 'app-product-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('serviceFileInput') serviceFileInput!: ElementRef;

  productForm: FormGroup;
  isEditMode: boolean = false;
  productId: number | null = null;
  priceType: 'beforeAfter' | 'percentage' = 'beforeAfter';
  coverImagePreview: string | ArrayBuffer | null = null;
  serviceImagePreview: string | ArrayBuffer | null = null;
  provider_id: number = 0;
  pg: number = 3;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private providerService: ProvidersService,
    private authService: ProviderAuthService,
    private serv: ServicePageService,
    private location: Location
  ) {
    
    this.productForm = this.fb.group({
      serviceName: ['', Validators.required],
      description: ['', Validators.required],
      petType: ['', Validators.required],
      beforePrice: [null, Validators.required],
      afterPrice: [null],
      percentageDiscount: [null]
    });
  }


  async ngOnInit() {
      try {
        const isAuthenticated = await this.authService.verifyAuthentication();
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
          return;
        }
  
        // const prof = await firstValueFrom(this.authService.getProfile());
        // const prodId = prof.data;
        // this.provider_id = prodId.id;
  
        this.route.params.subscribe(params => {
          if (params['id']) {
            this.isEditMode = true;
            this.productId = +params['id'];
            this.loadProductDetails(this.productId);
          }
        });
      } catch (error) {
        console.error('Error initializing product details:', error);
        this.router.navigate(['/login']);
      }
    }

  loadProductDetails(productId: number) {
    this.productService.getProductById(productId).subscribe(
      (product: Product) => {
        this.productForm.patchValue({
          serviceName: product.name,
          description: product.description,
          petType: product.pet_type,
          beforePrice: product.old_price,
          afterPrice: product.new_price,
          percentageDiscount: product.percentage
        });
        this.priceType = product.old_price !== null ? 'beforeAfter' : 'percentage';
        this.coverImagePreview = product.images[0] || null;
        this.serviceImagePreview = product.images[1] || null;
      },
      error => console.error('Error loading product details:', error)
    );
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      Object.keys(this.productForm.value).forEach(key => {
        formData.append(key, this.productForm.get(key)?.value);
      });

      if (this.fileInput.nativeElement.files[0]) {
        formData.append('coverImage', this.fileInput.nativeElement.files[0]);
      }
      if (this.serviceFileInput.nativeElement.files[0]) {
        formData.append('serviceImage', this.serviceFileInput.nativeElement.files[0]);
      }

      if (this.isEditMode && this.productId) {
        this.serv.updateService(this.productId, formData).then(
          (          response: any) => {
            console.log('Product updated successfully', response);
            this.router.navigate(['/provider/products']);
          },
          (          error: any) => console.error('Error updating product:', error)
        );
      } else {
        this.serv.addService(formData).then(
          response => {
            console.log('Product added successfully', response);
            this.router.navigate(['/provider/products']);
          },
          error => console.error('Error adding product:', error)
        );
      }
    }
  }

  onCancel() {
    this.location.back();
  }

  setPriceType(type: 'beforeAfter' | 'percentage') {
    this.priceType = type;
    if (type === 'beforeAfter') {
      this.productForm.get('afterPrice')?.setValidators(Validators.required);
      this.productForm.get('percentageDiscount')?.clearValidators();
    } else {
      this.productForm.get('afterPrice')?.clearValidators();
      this.productForm.get('percentageDiscount')?.setValidators(Validators.required);
    }
    this.productForm.get('afterPrice')?.updateValueAndValidity();
    this.productForm.get('percentageDiscount')?.updateValueAndValidity();
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  triggerServiceFileInput() {
    this.serviceFileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.previewImage(file, 'cover');
    }
  }

  onServiceFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.previewImage(file, 'service');
    }
  }

  previewImage(file: File, type: 'cover' | 'service') {
    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'cover') {
        this.coverImagePreview = reader.result;
      } else {
        this.serviceImagePreview = reader.result;
      }
    };
    reader.readAsDataURL(file);
  }
}