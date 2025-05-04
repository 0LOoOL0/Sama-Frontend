import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SupplierService } from '../service/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-supplier',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit {
  supplierForm: FormGroup;
  profileImageBase64: string | null = null;
  supplierId: number | null = null;
  isEditMode: boolean = false;
  orders: any[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef; // Hidden file input reference

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      key_person: ['', Validators.required],
      contact1: ['', [Validators.required, Validators.pattern('[0-9]{8,15}')]],
      contact2: ['', Validators.pattern('[0-9]{8,15}')],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      website: [''],
      instagram: [''],
      profile_image: ['']
    });
  }

  ngOnInit(): void {
    const state = history.state;
    if (state.supplierData) {
      this.isEditMode = true;
      this.supplierId = state.supplierData.id;
      this.supplierForm.patchValue(state.supplierData);
      if (state.supplierData.profileImage) {
        this.profileImageBase64 = state.supplierData.profileImage;
      }
      
      // Load orders for this supplier
      this.loadOrders();
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onProfileImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageBase64 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitSupplier(): void {
    if (this.supplierForm.valid) {
      const formData = { ...this.supplierForm.value, profile_image: this.profileImageBase64 };
      if (this.isEditMode && this.supplierId) {
        this.supplierService.updateSupplier(this.supplierId, formData).subscribe({
          next: (response: any) => {
            this.toastr.success('Supplier updated successfully!');
            this.router.navigate(['/all-suppliers']);
          },
          error: (error: any) => this.handleError(error)
        });
      } else {
        this.supplierService.addSupplier(formData).subscribe({
          next: (response) => {
            this.toastr.success('Supplier added successfully!');
            this.supplierForm.reset();
            this.profileImageBase64 = null;
            this.supplierId = response.data.id;
            // Optionally, load orders if any after creation
            this.loadOrders();
            this.router.navigate(['/all-suppliers']);
          },
          error: (error) => this.handleError(error)
        });
      }
    } else {
      this.toastr.warning('Please fill in all required fields.');
    }
  }

  // Load orders for the current supplier
  loadOrders(): void {
    if (!this.supplierId) {
      return;
    }
    this.supplierService.getOrdersBySupplier(this.supplierId).subscribe(
      (response: any) => {
        this.orders = response.data || response;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  navigateToCreateOrder(): void {
    if (this.supplierId) {
      this.supplierService.currentSupplierId = this.supplierId;
      this.router.navigate(['/create-order'], { state: { supplierId: this.supplierId } });
    } else {
      this.toastr.error("Please save the supplier before creating an order.");
    }
  }

  navigateToCreateProduct(): void {
    this.router.navigate(['/create-product']);
  }

  navigateToEditOrder(order: any): void {
    this.router.navigate(['/create-order'], { state: { orderData: order, supplierId: this.supplierId } });
  }

  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.supplierService.deleteOrder(orderId).subscribe(
        (response: any) => {
          this.orders = this.orders.filter(order => order.id !== orderId);
        },
        (error) => {
          console.error('Error deleting order:', error);
        }
      );
    }
  }

  deleteAllOrders(): void {
    // Implement bulk deletion logic if available
    console.log("Delete All Orders clicked");
  }

  private handleError(error: any): void {
    console.error("Error:", error);
    this.toastr.error('Operation failed.');
  }
}
