import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/ProductService';
import { ServiceService } from '../services/ServiceService';

@Component({
  selector: 'app-pet-policy-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-policy-details.component.html',
  providers: [DatePipe],
  styleUrls: ['./pet-policy-details.component.css']
})
export class PetPolicyDetailsComponent implements OnInit {
  policyNumber: string = '';
  pet: any = null;
  policy: any = null;
  owner: any = null;
  isExpired: boolean = false;
  loading = true;
  error = '';
  currentDateTime!: string;

  availableProducts: any[] = [];
  availableServices: any[] = [];
  activeTab: 'products' | 'services' = 'products';

  order: any = null;
  showReceipt = false;
  isDetailsCollapsed = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private productService: ProductService,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.policyNumber = this.route.snapshot.paramMap.get('policyNumber') || '';
    this.fetchPolicyDetails();
    this.loadProviderData();

    const now = new Date();
    this.currentDateTime = now.toLocaleString();
  }

  fetchPolicyDetails() {
    this.http.get(`http://localhost:8000/api/policy/${this.policyNumber}`).subscribe({
      next: (data: any) => {
        this.pet = data.pet;
        this.policy = data.policy;
        this.owner = data.owner;
        this.isExpired = new Date(data.policy.end_date) < new Date();
        this.loading = false;
        console.log('Owner Data:', this.owner);
      },
      error: () => {
        this.error = 'Policy not found or error fetching details.';
        this.loading = false;
      }
    });
  }

  loadProviderData() {
    const providerId = 1;

    this.productService.getProviderProducts(providerId).subscribe({
      next: (products) => {
        this.availableProducts = products.map(p => ({
          id: p.id,
          name: p.product_name_en,
          price: p.price,
          selected: false,
          imageUrl: p.image_url ?? 'assets/products/default.png'
        }));
      },
      error: () => console.error('Failed to fetch products')
    });

    this.serviceService.getProviderServices(providerId).subscribe({
      next: (services) => {
        this.availableServices = services.map(s => ({
          id: s.id,
          name: s.title,
          price: s.new_price,
          selected: false
        }));
      },
      error: () => console.error('Failed to fetch services')
    });
  }

  submitOrder() {
    const selectedProducts = this.availableProducts.filter(p => p.selected);
    const selectedServices = this.availableServices.filter(s => s.selected);
  
    if (selectedProducts.length === 0 && selectedServices.length === 0) {
      alert('Please select at least one product or service.');
      return;
    }
  
    const basePayload = {
      invoice_date: new Date().toISOString().split('T')[0],
      customer_name: `${this.owner.first_name} ${this.owner.last_name}`,
      contact_no: this.owner.phone,
      email: this.owner.email || 'noemail@sama.com',
      address: `${this.owner.house || ''} ${this.owner.road || ''} ${this.owner.block || ''} ${this.owner.city || ''}`.trim() || 'No address provided',
      delivery: 0,
      status: 'pending',
      pet_owner_id: this.owner.id
    };
  
    let hasSubmitted = false;
  
    if (selectedProducts.length > 0) {
      const productPayload = {
        ...basePayload,
        total_amount: selectedProducts.reduce((sum, p) => sum + p.price, 0),
        products: selectedProducts.map(p => ({
          product_id: p.id,
          quantity: 1,
          discount_percentage: this.isExpired ? 0 : 20
        }))
      };
  
      console.log('Product Payload:', productPayload);
  
      this.http.post('http://localhost:8000/api/orders', productPayload).subscribe({
        next: (res) => {
          console.log('✅ Product order submitted:', res);
          this.order = res;
          hasSubmitted = true;
          if (!selectedServices.length) this.showReceipt = true;
        },
        error: err => {
          console.error('❌ Product order error:', err);
          alert('Product order failed.');
        }
      });
    }
  
    if (selectedServices.length > 0) {
      const servicePayload = {
        ...basePayload,
        total_amount: selectedServices.reduce((sum, s) => sum + s.price, 0),
        services: selectedServices.map(s => ({
          service_id: s.id,
          quantity: 1,
          discount_percentage: this.isExpired ? 0 : 20
        }))
      };
  
      console.log('Service Payload:', servicePayload);
  
      this.http.post('http://localhost:8000/api/service-orders', servicePayload).subscribe({
        next: (res) => {
          console.log('✅ Service order submitted:', res);
          this.order = res;
          if (!hasSubmitted) this.showReceipt = true;
          else setTimeout(() => this.showReceipt = true, 300); // delay for UX sync
        },
        error: err => {
          console.error('❌ Service order error:', err);
          alert('Service order failed.');
        }
      });
    }
  }
  
  
  
  
  

  printReceipt() {
    window.print();
  }

  emailReceipt() {
    alert('Email functionality is not implemented yet.');
  }

  closeReceipt() {
    this.showReceipt = false;
  }

  toggleDetailsSection() {
    this.isDetailsCollapsed = !this.isDetailsCollapsed;
  }

  goBack() {
    this.router.navigate(['/provider-dashboard']);
  }
}
