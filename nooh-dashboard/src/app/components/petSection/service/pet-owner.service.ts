import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetOwnerService {
  // Base URL for the pet owner API endpoints. Adjust as needed.
  private baseUrl = 'http://127.0.0.1:8000/api/owner';

  // Variable to store the current owner's ID for editing purposes.
  private ownerId: number | null = null;

  constructor(private http: HttpClient) { }

  // Retrieve all pet owners.
  getOwners(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Add a new pet owner.
  addPetOwner(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  // Retrieve a single pet owner by its ID.
  getOwner(ownerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${ownerId}`);
  }

  // Update a pet owner by its ID.
  updateOwner(ownerId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${ownerId}`, data);
  }

  // Setter for the current owner ID.
  setOwnerId(id: number): void {
    this.ownerId = id;
  }

  // Getter for the current owner ID.
  getOwnerId(): number | null {
    return this.ownerId;
  }
}
