import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createBooking(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/bookings`, data);
  }

  getMyBookings() {
    return this.http.get<any[]>(`${this.apiUrl}/api/bookings/mine`);
  }
  
}
