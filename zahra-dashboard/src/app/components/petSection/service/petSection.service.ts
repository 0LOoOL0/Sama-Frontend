import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetOwner } from '../model/owner.model';

@Injectable({
  providedIn: 'root'
})
export class PetOwnerService {

  private petOwnerApiUrl = 'http://127.0.0.1:8000/api/pet_owners';
  private memApiUrl = 'http://127.0.0.1:8000/api/memberships/pet/membership';
  private petsApiUrl = 'http://127.0.0.1:8000/api/pet';
  private apiUrl = 'http://127.0.0.1:8000';
  private apiUrls = 'http://127.0.0.1:8000/api';
  private ownerId: number | null = null;

  constructor(private httpClient: HttpClient) { }

  getPetOwners(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.petOwnerApiUrl);
  }
  
  getPets(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.petsApiUrl);
  }

  getPetsByOwnerId(petOwnerId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/pet-owner/${petOwnerId}/pets`);
  }

  setOwnerId(id: number): void {
    this.ownerId = id;
  }

  getOwnerId(): number | null {
    return this.ownerId;
  }

  getOwnerDataById(ownerId: string): Observable<PetOwner> {
    const url = `${this.petOwnerApiUrl}/${ownerId}`; 
    return this.httpClient.get<PetOwner>(url);
  }

  getPetsWithMembershipByOwner(ownerId: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrls}/owner/${ownerId}/pets-with-membership`);
  }
}
