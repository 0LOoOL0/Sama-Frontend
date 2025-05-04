import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
// import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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
  image: string;
  is_vaccinated: boolean;
  is_microchipped: boolean;
  is_neutered: boolean;
  is_lost: boolean;
  documents: JSON;
  price?: number;
  allow_adoption: boolean;
  allow_selling: boolean;
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
addPet(petData: any): void {
    try {
      console.log('petData============>', petData);
      const token = localStorage.getItem('token');
      return post(`${this.apiUrl}/api/pet/store`, petData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error: any) {
      console.log(error);
      throw this.handleError(error);
    }
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

  getPetsForAdoption(): Observable<Pet[]>{
    const token = localStorage.getItem('token');
    return this.http.get<Pet[]>(`${this.apiUrl}/pets/adoption`);
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

  fetchAllPets() {
    return this.getAllPets()
      .then(response => {
        console.log('All Pets response:', response);
        const data = response.data as { data: Pet };
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
        'Content-Type': 'multipart/form-data', // Ensure the Content-Type is correctly set
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
function post(url: string, data: any, config: { headers: { Authorization: string; 'Content-Type': string; } }): void{
  // return axios.post(url, data, config)
  //   .then(response => response.data)
  //   .catch(error => {
  //     console.error('Error in post request:', error);
  //     throw error;
  //   });
}

