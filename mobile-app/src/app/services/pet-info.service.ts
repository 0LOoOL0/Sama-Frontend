import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import axios from 'axios';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Pet {
  id: number;
  created_at: string;
  updated_at: string;
  gender: 'm' | 'f';
  name: string;
  age: number;
  weight: number;
  height: number;
  pet_type: string;
  breed: string;
  color: string;
  image: File | string; 
  is_vaccinated: string;
  is_microchipped: string;
  is_neutered: string;
  description: string;
  price:  number;
  is_lost: boolean;
  documents: Array<{ documentTitle: string; uploadedFile: File }>;
  allow_adoption: boolean;
  allow_selling: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PetInfoService {
  private apiUrl = environment.apiUrl;
  private petId: number | null = null;

  constructor(private http: HttpClient, private storage: AngularFireStorage) {}

  addPet(formData: FormData): Promise<any> {
    for (const [key, value] of (formData as any).entries()) {
      console.log(`${key}: ${value}`);
    }
    const token = localStorage.getItem('token');
    return axios.post(`${this.apiUrl}/api/pet/store`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  getPets() {
    const token = localStorage.getItem('token');
    return axios.get(`${this.apiUrl}/api/petOwner/pets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getPetsByOwnerId(ownerId: number): Observable<Pet[]> {
    const token = localStorage.getItem('token');
    
    // Convert the axios Promise to an Observable
    return from(
      axios.get(`${this.apiUrl}/api/pet_owners/${ownerId}/pets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log('Pets by Owner ID response:', response);
        return response.data.data as Pet[];
      })
      .catch(error => {
        console.error('Error fetching pets by owner ID:', error);
        throw error; 
      })
    );
  }

  getPetById(Id: number): Observable<Pet[]> {
    const token = localStorage.getItem('token');
    
    // Convert the axios Promise to an Observable
    return from(
      axios.get(`${this.apiUrl}/api/pet/${Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log('Pet response:', response);
        return response.data.data as Pet[];
      })
      .catch(error => {
        console.error('Error fetching pet:', error);
        throw error; 
      })
    );
  }
  getAllPets() {
    const token = localStorage.getItem('token');
    return axios.get(`${this.apiUrl}/api/pets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchAllPets() {
    return this.getAllPets()
      .then(response => {
        console.log('All Pets response:', response);
        return response.data.data as Pet; // Correctly access nested data
      })
      .catch(error => {
        console.error('Error fetching all pets:', error);
        throw error; // Rethrow the error or handle it appropriately
      });
  }

  fetchPets(): Promise<Pet> {
    return this.getPets()
      .then(response => {
        console.log('Pets response:', response);
        return response.data.data as Pet; // Correctly access nested data
      })
      .catch(error => {
        console.error('Error fetching pets:', error);
        throw error; // Rethrow the error or handle it appropriately
      });
  }

  getPet(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/pet/${id}`);
  }

  storePet(pet: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/pet`, pet);
  }

  updatePet(id: number, pet: any): Promise<any> {
    console.log('pet in pet-info.service====>', pet);

    const token = localStorage.getItem('token');
    return axios.post(`${this.apiUrl}/api/pet/update/${id}`, pet, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  updateLostStatus(petId: number, isLost: boolean): Observable<any> {
    const token = localStorage.getItem('token');
    const data = { is_lost: isLost ? 1 : 0 };

    return this.http.post(
      `${this.apiUrl}/api/pet/update-lost-status/${petId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  updateAdoptionStatus(petId: number, allowAdoption: boolean): Observable<any> {
    const token = localStorage.getItem('token');
    const data = { allow_adoption: allowAdoption ? 1 : 0 };

    return this.http.post(
      `${this.apiUrl}/api/pet/update-adoption-status/${petId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  updateSellingStatus(petId: number, allowSelling: boolean): Observable<any> {
    const token = localStorage.getItem('token');
    const data = { allow_selling: allowSelling ? 1 : 0 };

    return this.http.post(
      `${this.apiUrl}/api/pet/update-selling-status/${petId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  
  updateMatingStatus(petId: number, allowMating: string): Observable<any> {
    const token = localStorage.getItem('token');

    // Send 'yes' or 'no' directly based on allowMating
    const isNeutered = allowMating.toLowerCase();

    const data = { is_neutered: isNeutered };

    return this.http.post(
      `${this.apiUrl}/api/pet/update-mating-status/${petId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
}

  deleteImage(petId: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(
      `${this.apiUrl}/api/pet/delete-image/${petId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  updateImage(petId: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(
      `${this.apiUrl}/api/pet/update-image/${petId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  deletePet(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/api/pet/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  setPetId(id: number): void {
    this.petId = id;
  }

  getPetId(): number | null {
    return this.petId;
  }

  markPetAsLost(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/pet/lost/${id}`, {});
  }

  markPetAsFound(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/pet/found/${id}`, {});
  }

  getOwnerIdByEmail(email: string) {
    return this.http.get(`${this.apiUrl}/api/petOwners/byEmail`, {
      params: { email },
    });
  }

  updatePetOwner(petId: number, ownerId: number) {
    return this.http.put(`${this.apiUrl}/api/pets/${petId}`, {
      pet_owner_id: ownerId,
    });
  }

  addDocument(petId: number, document: FormData): Promise<any> {
    const token = localStorage.getItem('token');
    return axios.post(`${this.apiUrl}/api/pet/${petId}/documents`, document, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // async uploadImage(filePath: string): Promise<string> {
  //   const token = localStorage.getItem('token');
  //   try {
  //     const response = await axios.get(`${this.apiUrl}/file-url`, {
  //       params: { file_path: filePath },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log('Fetched URL:', response.data.url);
  //     return response.data.url;
  //   } catch (error) {
  //     console.error('Error fetching file URL:', error);
  //     throw error;
  //   }
  // }

  uploadImage(imagePath: string): Promise<string> {
    const ref = this.storage.ref(imagePath);
    return ref.getDownloadURL().toPromise();
  }

    // Method to add a lost pet by a founder
    addLostPetByFounder(petData: any): Promise<any> {
      const token = localStorage.getItem('token');
      return axios.post(`${this.apiUrl}/api/addLostPetByFounder`, petData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  
    fetchAllLostPets(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(`${this.apiUrl}/api/allLostPets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    // Method to show a lost pet reported by a founder
    showLostPetByFounder(id: number): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(`${this.apiUrl}/api/showLostPetByFounder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  
    // Method to delete a lost pet reported by a founder
    deleteLostPetByFounder(id: number): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.delete(`${this.apiUrl}/api/deleteLostPetByFounder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
}
