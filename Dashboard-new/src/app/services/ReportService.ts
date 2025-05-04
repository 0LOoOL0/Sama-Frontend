// src/app/services/ReportService.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getProviderOverview(providerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/provider-overview?provider_id=${providerId}`).pipe(
      catchError(error => {
        console.error('Error fetching provider overview:', error);
        return throwError(() => error);
      })
    );
  }
}
