import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: String = environment.apiUrl + '/api';

  constructor(private httpClient: HttpClient) { }

  get<T>(endpoint: string, options: any): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  post<T>(endpoint: string, body: any, options: any): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  put<T>(endpoint: string, body: any, options: any): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  delete<T>(endpoint: string, options: any): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.httpClient.delete<T>(url, options) as Observable<T>;
  }
}
