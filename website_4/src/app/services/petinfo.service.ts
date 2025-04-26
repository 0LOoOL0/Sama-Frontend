import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
// import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';


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
  image: string;
  is_vaccinated: boolean;
  is_microchipped: boolean;
  is_neutered: 0 | 1;

  documents: JSON;
  price?: number;
  is_lost: 0 | 1;
  allow_adoption: 0 | 1;
  allow_selling: 0 | 1;
  pet_owner_id: number;  // <-- Add this line
  petOwner?: { id: number; /* other properties */ };
}

@Injectable({
  providedIn: 'root',
})
export class PetinfoService {
  private apiUrl = environment.apiUrl;
  private petId: number | null = null;

  constructor(private http: HttpClient) {
    axios.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      // if (token) {
      //   if (!config.headers) {
      //     config.headers = {};
      //   }
      //   config.headers['Authorization'] = `Bearer ${token}`;
      // }
      return config;
    },
      error => {
        return Promise.reject(error);
      }
    );
  }
  // private storage: AngularFireStorage
  addPet(petData: any): Promise<any> {
    try {
      console.log('petData============>', petData);
      const token = localStorage.getItem('token');
      return post(`${this.apiUrl}/api/pet/store`, petData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error: any) {
      console.log(error);
      throw this.handleError(error);
    }
  }

  updateAdoptionStatus(petId: number, status: 0 | 1): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/pets/${petId}/adoption`, {
      allow_adoption: status,
    });
  }
  
  updateSellingStatus(petId: number, status: 0 | 1): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/pets/${petId}/selling`, {
      allow_selling: status,
    });
  }
  
  updateLostStatus(petId: number, status: 0 | 1): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/pets/${petId}/lost`, {
      is_lost: status,
    });
  }
  
  updateMatingStatus(petId: number, isNeutered: 0 | 1): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/pets/${petId}/mating`, {
      is_neutered: isNeutered,
    });
  }
  
  
  
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = error.response.data.message || JSON.stringify(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response received from server';
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }
    return new Error(errorMessage);
  }

 

  getPets():void {
    const token = localStorage.getItem('token');
    // return axios.get<any>(`${this.apiUrl}/api/petOwner/pets`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }) ;
  }

  getAllPets() {
    const token = localStorage.getItem('token');
    return axios.get(`${this.apiUrl}/api/pets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  
  getPetsByOwnerId(ownerId: number) {
    const token = localStorage.getItem('token');
    return axios.get<{ pets: Pet[] }>(`${this.apiUrl}/api/pets/owner/${ownerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  

  // In petinfo.service.ts

  addDocument(petId: number, formData: FormData): Promise<any> {
    const token = localStorage.getItem('token');
    return axios.post(`${this.apiUrl}/api/pet/addDocument/${petId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }) as Promise<any>;
  }
  

  



  fetchAllPets() {
    return this.getAllPets()
      .then(response => {
        console.log('All Pets response:', response);
        const data = response.data as { data: Pet[] };

        return data.data; // Correctly access nested data
      })
      .catch(error => {
        console.error('Error fetching all pets:', error);
        throw error; // Rethrow the error or handle it appropriately
      });
  }

  fetchPets(): void {
    // this.getPets()
    //   .subscribe({
    //     next: (response) => {
    //       console.log('Pets response:', response);
    //       const responseData = response.data as { data: Pet };
    //       console.log('Fetched pets:', responseData.data); // Correctly access nested data
    //     },
    //     error: (error) => {
    //       console.error('Error fetching pets:', error);
    //       throw error; // Rethrow the error or handle it appropriately
    //     }
    //   });
  }

  getPet(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/pet/${id}`);
  }

  storePet(pet: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/pet`, pet);
  }

  updatePet(id: number, pet: any) {
    const token = localStorage.getItem('token');
    return axios.post(`${this.apiUrl}/api/pet/update/${id}`, pet, {
      headers: {
        Authorization: `Bearer ${token}`,
        //'Content-Type': 'multipart/form-data', // Ensure the Content-Type is correctly set
      },
    });
  }

  deletePet(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/pet/${id}`);
  }

  setPetId(id: number): void {
    this.petId = id;
  }

  getPetId(): number | null {
    return this.petId;
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

  getPetMembership(id: number) {
    return axios.get(`${this.apiUrl}/api/pet/membership/${id}`);
  }

  addLostByFounder(pet: any){
    const token = localStorage.getItem('token');
    return axios.post(`${this.apiUrl}/api/addLostPetByFounder`, pet, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Ensure the Content-Type is correctly set
      },
    });
  }

  getAllLostPets() {
    return axios.get(`${this.apiUrl}/api/allLostPets`);
  }

  getPetsForAdoption(): Observable<Pet[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Pet[]>(`${this.apiUrl}/api/pets/adoption`, { headers });
  }
  
  getPetsForLost(): Observable<Pet[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    // Adjust the endpoint URL if needed
    return this.http.get<Pet[]>(`${this.apiUrl}/api/pets/lost`, { headers });
  }
  
  getPetsForMating(): Observable<Pet[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    // Adjust the endpoint URL if needed
    return this.http.get<Pet[]>(`${this.apiUrl}/api/pets/mating`, { headers });
  }
  
  getPetsForSelling(): Observable<Pet[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    // Adjust the endpoint URL if needed
    return this.http.get<Pet[]>(`${this.apiUrl}/api/pets/selling`, { headers });
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

  // uploadImage(imagePath: string): Promise<string> {
  //   const ref = this.storage.ref(imagePath);
  //   return ref.getDownloadURL().toPromise();
  // }


}
function post(url: string, data: any, config: { headers: { Authorization: string; 'Content-Type': string; } }): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    axios.post(url, data, config)
      .then(response => resolve(response.data))
      .catch(error => {
        console.error('Error in post request:', error);
        reject(error);
      });
  });
}






