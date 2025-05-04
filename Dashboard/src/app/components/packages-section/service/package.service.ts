import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Package {
  id: number;
  title: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  second_price: number;
  status_user: boolean;
  status_staff: boolean;
  // Add other fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  // Update this URL to match your Laravel API endpoint
  private apiUrl = 'http://127.0.0.1:8000/api/packages';

  constructor(private http: HttpClient) {}

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

   // New method to delete a package by id:
   deletePackage(packageId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${packageId}`)
      .pipe(catchError(this.handleError));
  }

  // New method to create a package
  addPackage(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data)
      .pipe(catchError(this.handleError));
  }

  // New method to update a package's status (or other fields)
  updatePackage(packageId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${packageId}`, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('PackageService Error:', error);
    return throwError(() => error);
  }
}
