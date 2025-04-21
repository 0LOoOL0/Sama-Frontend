import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../service/supplier.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // ✅ Import Router

@Component({
  selector: 'app-all-suppliers',
  standalone: true,  
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './all-suppliers.component.html',
  styleUrls: ['./all-suppliers.component.css'],
  //providers: [SupplierService]
})
export class AllSuppliersComponent implements OnInit {
  suppliers: any[] = [];
  toastr: any;

  constructor(private supplierService: SupplierService, private router: Router) {} // ✅ Inject Router

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    if (!this.supplierService) {
      console.error('SupplierService is undefined!');
      return;
    }

    this.supplierService.getSuppliers().subscribe(
      (response: any) => {
        this.suppliers = response.data; 
        console.log('Suppliers:', this.suppliers);
      },
      (error) => {
        console.error('Error fetching suppliers:', error);
      }
    );
  }

  // Navigate to create supplier (if needed)
  navigateToCreateSupplier(supplier: any = null) {
    this.router.navigate(['/create-supplier'], { state: { supplierData: supplier } });
  }

  // New method: When a supplier is selected for creating an order,
  // store its ID in the service and navigate to the create order page.
  selectSupplierForOrder(supplier: any): void {
    this.supplierService.currentSupplierId = supplier.id;
    this.router.navigate(['/create-order']);
  }

  deleteSupplier(supplierId: number) {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.deleteSupplier(supplierId).subscribe({
        next: (response) => {
          console.log('Delete Response:', response);
          if (response.deleted) {
            this.suppliers = this.suppliers.filter(supplier => supplier.id !== supplierId);
          }
        },
        error: (error) => {
          console.error('Error deleting supplier:', error);
        }
      });
    }
  }
}
