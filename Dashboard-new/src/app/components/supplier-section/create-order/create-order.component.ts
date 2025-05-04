import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../service/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CreateOrderComponent implements OnInit {
  orderForm: FormGroup;
  isEditMode: boolean = false;
  orderId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private toastr: ToastrService,
    private router: Router
  ) {
    // Initialize the order form with all required fields.
    this.orderForm = this.fb.group({
      product_name_en: ['', Validators.required],
      product_name_ar: ['', Validators.required],
      pet_type: ['', Validators.required],
      status: [false, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      start_date: ['', Validators.required],
      received_date: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      delivery_price: [null, [Validators.required, Validators.min(0)]]
    });
    
  }

  ngOnInit(): void {
    const state = history.state;
    if (state && state.supplierId) {
      this.supplierService.currentSupplierId = state.supplierId;
      console.log("Supplier ID from navigation state:", state.supplierId);
    } else if (!this.supplierService.currentSupplierId) {
      // No supplier ID in navigation state or service – navigate back
      this.toastr.error("Supplier not selected. Please select a supplier first.");
      this.router.navigate(['/all-suppliers']);
      return;
    }
    
    // Only patch the form if we're editing an existing order
    if (state.orderData) {
      this.isEditMode = true;
      this.orderId = state.orderData.id;
      const mappedData = {
        product_name_en: state.orderData.product_name || '',
        product_name_ar: state.orderData.product_name_ar || '',
        pet_type: state.orderData.pet_type || '',
                // Convert the API status value to boolean for the checkbox:       // Convert status: if API returns 1 or "1", patch as true; otherwise, false. we do this for the form to show true if true, in on submit we change this back so we can actually submit if we dont change it on submit we might get error

        status: (state.orderData.status === 1 || state.orderData.status === "1") ? true : false,
        // Convert quantity to integer:
        quantity: state.orderData.quantity ? parseInt(state.orderData.quantity, 10) : '',
        start_date: state.orderData.date_created || '',
        received_date: state.orderData.date_received || '',
        price: state.orderData.price || '',
        delivery_price: state.orderData.delivery_charges || ''
      };
      this.orderForm.patchValue(mappedData);
    }
  }
  

  // This method updates the status form control based on checkbox state.
  onStatusChange(event: any): void {
    // event.target.checked returns a boolean; convert it to 1 or 0.
    this.orderForm.get('status')?.setValue(event.target.checked ? 1 : 0);
  }

  submitOrder(): void {
    // Check if supplier ID is available from the service
    if (!this.supplierService.currentSupplierId) {
      this.toastr.error("Supplier not selected. Please select a supplier first.");
      return;
    }
    
    if (this.orderForm.valid) {
      const formData = this.orderForm.value;
      // Attach supplier_id from the SupplierService
      formData.supplier_id = this.supplierService.currentSupplierId;

      // Convert status from boolean to integer: true -> 1, false -> 0 (read on ngonit it expalins )
  formData.status = formData.status ? 1 : 0;
      
      if (this.isEditMode && this.orderId) {
        // Update existing order
        this.supplierService.updateOrder(this.orderId, formData).subscribe({
          next: (response: any) => {
            this.toastr.success('Order updated successfully!');
            this.router.navigate(['/orders']);
          },
          error: (error: any) => this.handleError(error)
        });
      } else {
        // Create new order
        this.supplierService.addOrder(formData).subscribe({
          next: (response: any) => {
            this.toastr.success('Order created successfully!');
            this.orderForm.reset();
            this.router.navigate(['/orders']);
          },
          error: (error: any) => this.handleError(error)
        });
      }
    } else {
      this.toastr.warning('Please fill in all required fields.');
    }
  }
  

  private handleError(error: any): void {
    console.error('Error:', error);
    this.toastr.error('Operation failed.');
  }
}
