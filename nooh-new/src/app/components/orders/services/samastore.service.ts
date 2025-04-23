import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SamastoreService {
  // Private provider ID (default for Sama Store is 1)
  private _providerId: number = 1;

  // Base URL for the product categories API endpoints
  private baseUrl = 'http://127.0.0.1:8000/api/product-categories';

  private productBaseUrl = 'http://127.0.0.1:8000/api/products';

  private invoiceBaseUrl = 'http://127.0.0.1:8000/api';


  constructor(private http: HttpClient) {
    console.log('SamastoreService initialized with providerId:', this._providerId);
  }

  // Getter for providerId
  get providerId(): number {
    console.log('Getter called for providerId:', this._providerId);
    return this._providerId;
  }

  // Setter for providerId
  set providerId(id: number) {
    console.log('Setter called. Changing providerId from', this._providerId, 'to', id);
    this._providerId = id;
  }

  // New method for Admin Dashboard category creation.
  storeProductCategoryAdminDashboard(categoryData: any, providerData: any): Observable<any> {
    const payload = { category: categoryData, provider_data: providerData };
    console.log('storeProductCategoryAdminDashboard payload:', payload);
    // The endpoint is defined as '/store-product-category-admin-dashboard'
    return this.http.post<any>(`${this.baseUrl}/store-product-category-admin-dashboard`, payload);
  }


  // New method for Admin Dashboard product creation.
  storeProductAdminDashboard(productData: any, providerData: any): Observable<any> {
    const payload = { product: productData, provider_data: providerData };
    console.log('storeProductAdminDashboard payload:', payload);
    return this.http.post<any>(`${this.productBaseUrl}/store-product-admin-dashboard`, payload);
  }

  // In your SamastoreService (samastore.service.ts)
getProducts(): Observable<any[]> {
  console.log('Fetching products...');
  return this.http.get<any[]>(this.productBaseUrl);
}

updateProductAdminDashboard(productData: any, productId: number, providerData: any): Observable<any> {
  const payload = { product: productData, provider_data: providerData };
  console.log('updateProductAdminDashboard payload:', payload);
  return this.http.put<any>(`${this.productBaseUrl}/update-product-admin-dashboard/${productId}`, payload);
}

// Method to fetch product categories using the GET endpoint from your ProductCategoryController
getProductCategories(): Observable<any[]> {
  console.log('Fetching product categories...');
  return this.http.get<any[]>(this.baseUrl);
}

deleteProductAdminDashboard(productId: number, providerData: any): Observable<any> {
  const options = { body: { provider_data: providerData } };
  console.log('deleteProductAdminDashboard payload:', options);
  return this.http.delete<any>(`${this.productBaseUrl}/delete-product-admin-dashboard/${productId}`, options);
}





// You can add additional methods (update, delete, etc.) here as needed.

private handleError(error: any) {
  console.error('OrdersService error', error);
  return throwError(error);
}

getOrderById(id: string): Observable<any> {
  // Assuming invoiceBaseUrl is your API root (e.g. http://127.0.0.1:8000/api)
  return this.http.get<any>(`${this.invoiceBaseUrl}/order/${id}`)
    .pipe(catchError(this.handleError));
}



getOwnerById(id: string): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/pet-owners/${id}`);
}



// Existing method: getOwnerData (for pet owner details)
getOwnerData(id: string): Observable<any> {
  return this.http.get<any>(`${this.invoiceBaseUrl}/pet-owners/${id}`)
    .pipe(catchError(this.handleError));
}

// New method to get orders from OrderController:


getOwnerOrders(id: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.invoiceBaseUrl}/order/owner/${id}/orders`)
    .pipe(catchError(this.handleError));
}



getAllOrders(): Observable<any[]> {
  // Use the invoiceBaseUrl (or another base URL) and the 'order' endpoint
  return this.http.get<any[]>(`${this.invoiceBaseUrl}/order`)
    .pipe(catchError(this.handleError));
}






  // Additional methods (getCategories, updateCategory, etc.) can be added here.
}
