import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PetOwnerService {

  private apiUrl = `${environment.apiUrl}/api`;

  constructor() {
    axios.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
  }
  
  
  
  

  getAllPetOwners() {
    return axios.get(`${this.apiUrl}/pet_owners`);
  }

  async getProfile(): Promise<any> {
    const token = localStorage.getItem('token');
    const response: { data: { data: any } } = await axios.get(`${this.apiUrl}/petOwner/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data; // Return the data directly
  }

  async fetchProfileData(): Promise<any> {
    try {
      const response = await this.getProfile();
      console.log('Profile response:', response);
      return response; // Return the response directly
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error; // Rethrow the error so it can be handled by the caller
    }
  }

  getPetOwnerData(id: any) {
    const token = localStorage.getItem('token');
    return axios.get(`${this.apiUrl}/pet_owner/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchPetOwnerData(id: any) {
    console.log('th id in auth=====>', id);
    return this.getPetOwnerData(id)
      .then((response) => {
        console.log('pet owner data:', response);
        // return response.data.data; // Correctly access nested data
      })
      .catch(error => {
        console.error('Error fetching pet owner:', error);
        throw error; // Rethrow the error or handle it appropriately
      });
  }

  // getPetOwnerData(id: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/petOwner/${id}`);
  // }

  updateProfile(profileData: any, petOwnerId: number) {
    const token = localStorage.getItem('token');
    return axios.put(
      `${this.apiUrl}/pet_owner/${petOwnerId}`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  updateProfileImage(profileData: any, petOwnerId: number) {
    const token = localStorage.getItem('token');
    return axios.post(
      `${this.apiUrl}/pet_owner/image/${petOwnerId}`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  getCSRFToken() {
    return axios.get(`${this.apiUrl}/sanctum/csrf-cookie`);
  }

  register(userData: any) {
    return axios.post(`${this.apiUrl}/register`, userData);
  }

  checkEmail(email: string) {
    return axios.post(`${this.apiUrl}/check-email`, { email });
  }

  sendVerificationCode(email: string) {
    return axios.post(`${this.apiUrl}/send-verification-code`, { email });
  }

  verifyCode(codeData: any) {
    return axios.post(`${this.apiUrl}/verify-code`, codeData);
  }

  async getPetsByOwnerId(petOwnerId: number): Promise<any>
    {
       const result = await axios.get(`${this.apiUrl}/pet_owners/${petOwnerId}/pets`);
       return result.data;
    }

}
