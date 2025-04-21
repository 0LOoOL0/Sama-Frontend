import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl: string = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Get the next available invoice and order numbers.
  getNextNumbers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/next-numbers`)
      .pipe(catchError(this.handleError));
  }

  // Retrieve all invoices (handled by the InvoiceController)
  getAllInvoices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoices`)
      .pipe(catchError(this.handleError));
  }

  getInvoice(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoices/${id}`);
  }

  // Delete an invoice (handled by the InvoiceController)
  deleteInvoice(invoiceId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/invoice/${invoiceId}`)
      .pipe(catchError(this.handleError));
  }
  
  // Retrieve products based on provider id.
  getProductsByProvider(providerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/provider/${providerId}`)
      .pipe(catchError(this.handleError));
  }

  // Retrieve all pet owners.
  getPetOwners(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pet-owners`)
      .pipe(catchError(this.handleError));
  }

  // Create a new invoice.
  // NOTE: This now calls the OrderController endpoint (/order)
  createOrder(orderPayload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/order`, orderPayload)
      .pipe(catchError(this.handleError));
  }

  // Error handling method.
  private handleError(error: any) {
    console.error('InvoiceService error', error);
    return throwError(error);
  }
}
