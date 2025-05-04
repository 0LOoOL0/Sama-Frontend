import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetSectionService {
  // Base URL for pet-related endpoints
  private petBaseUrl = 'http://127.0.0.1:8000/api';
  // Base URL for pet owner endpoints
  private ownerBaseUrl = 'http://127.0.0.1:8000/api/owner';

  // Variable to store the current owner's ID
  private ownerId: number | null = null;

  constructor(private http: HttpClient) { }

  // ===== Pet Related Methods =====

  addPet(petData: any): Observable<any> {
    return this.http.post(`${this.petBaseUrl}/pets`, petData);
  }

  getPet(petId: number): Observable<any> {
    return this.http.get<any>(`${this.petBaseUrl}/pet/${petId}`);
  }
  

  getOwnerDetails(ownerId: number): Observable<any> {
    console.log("Fetching owner details from backend for ID:", ownerId);
    return this.http.get<any>(`${this.ownerBaseUrl}/${ownerId}`);
}



// Retrieve all pet owners.
getOwners(): Observable<any[]> {
    return this.http.get<any[]>(this.ownerBaseUrl);
  }

  // Add a new pet owner.
  addPetOwner(data: any): Observable<any> {
    return this.http.post<any>(this.ownerBaseUrl, data);
  }

  // Retrieve a single pet owner by its ID.
  getOwner(ownerId: number): Observable<any> {
    return this.http.get<any>(`${this.ownerBaseUrl}/${ownerId}`);
  }

  // Update a pet owner by its ID.
  updateOwner(ownerId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.ownerBaseUrl}/${ownerId}`, data);
  }

  // Setter for the current owner ID.
  setOwnerId(id: number): void {
    this.ownerId = id;
  }

  // Getter for the current owner ID.
  getOwnerId(): number | null {
    return this.ownerId;
  }


  // package section
  getPackages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.petBaseUrl}/packages`);
}

getUserPackages(): Observable<any[]> {
  return this.http.get<any[]>(`${this.petBaseUrl}/getUserPackages`);
}


// update pet
updatePet(petId: number, petData: any): Observable<any> {
  return this.http.put<any>(`${this.petBaseUrl}/pets/${petId}`, petData);
}


// ========== Membership Related Methods ==========

  // Add a new membership
  addMembership(membershipData: any): Observable<any> {
    return this.http.post<any>(`${this.petBaseUrl}/memberships`, membershipData);
  }

  // Update an existing membership by its id
  updateMembership(membershipId: number, membershipData: any): Observable<any> {
    return this.http.put<any>(`${this.petBaseUrl}/memberships/${membershipId}`, membershipData);
  }

// Update pet's adoption status method
updateAdoptionStatus(petId: number, payload: any): Observable<any> {
  return this.http.put<any>(`${this.petBaseUrl}/pets/update-adoption-status/${petId}`, payload)
    .pipe(
      catchError((error) => {
        console.error('Error updating pet adoption status:', error);
        return throwError(() => error);
      })
    );
}

// Fetch adoptable pets
getPetsForAdoption(): Observable<any[]> {
  return this.http.get<any[]>(`${this.petBaseUrl}/pets/get-pets-for-adoption`)
    .pipe(
      catchError((error) => {
        console.error('Error fetching adoptable pets:', error);
        return throwError(() => error);
      })
    );
}

updateMatingStatus(petId: number, payload: any): Observable<any> {
  return this.http.put<any>(`${this.petBaseUrl}/pets/update-mating-status/${petId}`, payload)
    .pipe(
      catchError((error) => {
        console.error('Error updating pet mating status:', error);
        return throwError(() => error);
      })
    );
    
}


getPetsForMating(): Observable<any[]> {
  return this.http.get<any[]>(`${this.petBaseUrl}/pets/get-pets-for-mating`)
    .pipe(
      catchError((error) => {
        console.error('Error fetching mating pets:', error);
        return throwError(() => error);
      })
    );
}

updateLostStatus(petId: number, payload: any): Observable<any> {
  return this.http.put<any>(`${this.petBaseUrl}/pets/update-lost-status/${petId}`, payload)
    .pipe(
      catchError((error) => {
        console.error('Error updating lost status:', error);
        return throwError(() => error);
      })
    );
}

getPetsForLost(): Observable<any[]> {
  return this.http.get<any[]>(`${this.petBaseUrl}/pets/get-pets-for-lost`)
    .pipe(
      catchError((error) => {
        console.error('Error fetching lost pets:', error);
        return throwError(() => error);
      })
    );
}


updateSellingStatus(petId: number, payload: any): Observable<any> {
  return this.http.put<any>(`${this.petBaseUrl}/pets/update-selling-status/${petId}`, payload)
    .pipe(
      catchError((error) => {
        console.error('Error updating pet selling status:', error);
        return throwError(() => error);
      })
    );
}

getPetsForSelling(): Observable<any[]> {
  return this.http.get<any[]>(`${this.petBaseUrl}/pets/get-pets-for-selling`)
    .pipe(
      catchError((error) => {
        console.error('Error fetching sold pets:', error);
        return throwError(() => error);
      })
    );
}

 // Search for pet owner by email.
 // In your PetSectionService.ts
searchOwnerByEmail(email: string): Observable<any> {
  return this.http.get<any>(`${this.ownerBaseUrl}/search-by-email?email=${email}`)
    .pipe(
      catchError((error) => {
        console.error('Error searching owner by email:', error);
        return throwError(() => error);
      })
    );
}


// Update pet owner id.
updatePetOwner(petId: number, data: any): Observable<any> {
  return this.http.put<any>(`${this.petBaseUrl}/pets/update-pet-owner/${petId}`, data)
    .pipe(
      catchError((error) => {
        console.error('Error updating pet owner:', error);
        return throwError(() => error);
      })
    );
}

getOwnerOrders(ownerId: number): Observable<any[]> {
  const url = `http://127.0.0.1:8000/api/owner/${ownerId}/orders`;
  return this.http.get<any[]>(url);
}




getPetsWithMembershipByOwner(ownerId: number): Observable<any> {
  return this.http.get(`${this.petBaseUrl}/owner/${ownerId}/pets-with-membership`);
}


// pet-section.service.ts
updatePetCollarCode(petId: number, code: string) {
  return this.http.put(
    `${this.petBaseUrl}/pets/${petId}/collar-code`,
    { code }        // Laravel only needs 'code'; petId is in the URL
  );
}



}