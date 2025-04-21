import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  public currentSupplierId: number | null = null; // Supplier ID from the supplier list

  private suppliersApiUrl = 'http://127.0.0.1:8000/api/suppliers';
  private ordersApiUrl = 'http://127.0.0.1:8000/api/sama-orders';
  private productApiUrl = 'http://127.0.0.1:8000/api/products';

  constructor(private http: HttpClient) {}

  // Supplier methods...
  addSupplier(supplierData: any): Observable<any> {
    return this.http.post(this.suppliersApiUrl, supplierData);
  }
  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(this.suppliersApiUrl);
  }
  updateSupplier(id: number, supplierData: any): Observable<any> {
    return this.http.put(`${this.suppliersApiUrl}/${id}`, supplierData);
  }
  deleteSupplier(supplierId: number): Observable<{ message: string; deleted: boolean }> {
    return this.http.delete<{ message: string; deleted: boolean }>(`${this.suppliersApiUrl}/${supplierId}`);
  }

  // Orders methods
  addOrder(orderData: any): Observable<any> {
    return this.http.post(this.ordersApiUrl, orderData);
  }
  updateOrder(id: number, orderData: any): Observable<any> {
    return this.http.put(`${this.ordersApiUrl}/${id}`, orderData);
  }

  // Product methods
  addProduct(productData: any): Observable<any> {
    return this.http.post(this.productApiUrl, productData);
  }

  getOrdersBySupplier(supplierId: number): Observable<any> {
    const url = `${this.ordersApiUrl}/supplier/${supplierId}`;
    return this.http.get(url);
  }

  // Orders methods in SupplierService
deleteOrder(orderId: number): Observable<{ message: string; deleted: boolean }> {
  return this.http.delete<{ message: string; deleted: boolean }>(`${this.ordersApiUrl}/${orderId}`);
}

  

  
}
