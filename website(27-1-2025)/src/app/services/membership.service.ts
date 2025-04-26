// src/app/services/membership.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private apiUrl = `${environment.apiUrl}/api/membership`; // Adjust as needed

  constructor(private http: HttpClient) {}

  // Payload should include package_id, pet_ids, and optionally status.
  storeMembership(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }
}
