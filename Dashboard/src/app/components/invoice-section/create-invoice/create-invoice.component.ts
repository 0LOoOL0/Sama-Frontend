import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../service/InvoiceService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
  // Dropdown options and bound values
  statuses: string[] = ['Cancelled', 'Pending', 'Paid'];
  selectedStatus: string = 'Pending';

  invoiceNumber!: number;
  orderNumber!: number;
  invoiceDate: string = new Date().toISOString().split('T')[0];

  // Existing customers (pet owners)
  existingCustomers: any[] = [];
  selectedExistingCustomer: any = null;
  
  // Customer info fields
  customerName: string = '';
  contactNo: string = '';
  email: string = '';
  address: string = '';

  // Product selection
  products: any[] = []; // Fetched from backend (for provider id 1)
  selectedProduct: any = null;
  productQuantity: number | null = null;
  discountPercentage: number = 0;
  productTotal: number | null = null;

  // Temporary array for invoice items
  invoiceItems: any[] = [];

  // Delivery and overall total
  delivery: number = 0;
  invoiceTotal: number = 0;

  // To track editing mode: if editing, store index of item in invoiceItems.
  editingIndex: number | null = null;

  constructor(private router: Router, private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    // Fetch next available invoice and order numbers.
    this.invoiceService.getNextNumbers().subscribe(data => {
      console.log('Next Numbers:', data);
      this.invoiceNumber = data.invoice_number;
      this.orderNumber = data.order_number;
    });
    
  
    // Fetch products for provider id 1.
    this.invoiceService.getProductsByProvider(1).subscribe(data => {
      this.products = data;
    });
  
    // Fetch all pet owners (existing customers) from backend.
    this.invoiceService.getPetOwners().subscribe(
      data => {
        console.log('Pet owners response:', data);
        if (Array.isArray(data)) {
          this.existingCustomers = data;
        } else if (data && Array.isArray(data.data)) {
          this.existingCustomers = data.data;
        } else {
          console.error('Unexpected pet owners response structure', data);
          this.existingCustomers = [];
        }
      },
      error => {
        console.error('Error fetching pet owners:', error);
        this.existingCustomers = [];
      }
    );
  }
  
  // When an existing customer is selected, auto-fill customer info.
  onExistingCustomerChange(): void {
    if (this.selectedExistingCustomer) {
      this.customerName = this.selectedExistingCustomer.ownerName;
      this.contactNo = this.selectedExistingCustomer.contactNumber || this.selectedExistingCustomer.phone || '';
      this.email = this.selectedExistingCustomer.email || '';
      this.address = this.selectedExistingCustomer.address || this.selectedExistingCustomer.location || '';
    }
  }

  // Calculate productTotal with discount applied.
  onProductChange(): void {
    if (this.selectedProduct && this.productQuantity != null) {
      const discount = this.discountPercentage;
      const discountedPrice = this.selectedProduct.price - (this.selectedProduct.price * discount / 100);
      this.productTotal = discountedPrice * this.productQuantity;
    }
  }

  onQuantityChange(): void {
    this.onProductChange();
  }

  // Add or update product in invoiceItems.
  addProduct(): void {
    if (this.selectedProduct && this.productQuantity != null && this.productQuantity > 0) {
      const discount = this.discountPercentage;
      const discountedPrice = this.selectedProduct.price - (this.selectedProduct.price * discount / 100);
      const item = {
        product_id: this.selectedProduct.id,
        product_name: this.selectedProduct.product_name_en,
        quantity: this.productQuantity,
        discount_percentage: discount,
        unit_price: this.selectedProduct.price,
        discounted_unit_price: discountedPrice,
        total_price: discountedPrice * this.productQuantity
      };
      if (this.editingIndex !== null) {
        // Update the existing product
        this.invoiceItems[this.editingIndex] = item;
        this.editingIndex = null;
      } else {
        // Add as new product
        this.invoiceItems.push(item);
      }
      this.calculateInvoiceTotal();
      // Clear fields
      this.selectedProduct = null;
      this.productQuantity = null;
      this.discountPercentage = 0;
      this.productTotal = null;
    }
  }

  // Remove an item from the invoice items array.
  removeProduct(index: number): void {
    if (index > -1 && index < this.invoiceItems.length) {
      this.invoiceItems.splice(index, 1);
      this.calculateInvoiceTotal();
      if (this.editingIndex === index) {
        this.editingIndex = null;
      }
    }
  }

  // Edit an existing product item: populate fields with its data.
  editProduct(index: number): void {
    const item = this.invoiceItems[index];
    this.selectedProduct = this.products.find(p => p.id === item.product_id);
    this.productQuantity = item.quantity;
    this.discountPercentage = item.discount_percentage || 0;
    this.productTotal = item.total_price;
    this.editingIndex = index;
  }

  // Calculate the overall invoice total.
  calculateInvoiceTotal(): void {
    const itemsTotal = this.invoiceItems.reduce((sum, item) => sum + item.total_price, 0);
    this.invoiceTotal = itemsTotal + Number(this.delivery);
  }

  onDeliveryChange(): void {
    this.calculateInvoiceTotal();
  }

  // Submit the invoice.
  navigateToInvoice(): void {
    const invoicePayload: any = {
      invoice_date: this.invoiceDate,
      status: this.selectedStatus,
      customer_name: this.customerName,
      contact_no: this.contactNo,
      email: this.email,
      address: this.address,
      delivery: this.delivery,
      products: this.invoiceItems
    };
    
    if (this.selectedExistingCustomer) {
      invoicePayload.pet_owner_id = this.selectedExistingCustomer.id;
    }
  
    this.invoiceService.createOrder(invoicePayload).subscribe(response => {
      this.router.navigate(['/invoice', response.invoice_id], { state: { type: 'order' } });
    }, error => {
      console.error('Invoice submission error:', error);
    });
  }
  
  
  
}
