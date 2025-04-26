import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

axios.defaults.withCredentials = true;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCSRFToken() {
    return axios.get(`${this.apiUrl}/sanctum/csrf-cookie`);
  }

  async register(userData: any) {
    await this.getCSRFToken(); // Ensure CSRF token is fetched before login
    return axios
    .post(`${this.apiUrl}/api/register`, userData)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        return response.data;
      })
      .catch(error => {
        console.error('Login error:', error);
        throw error;
      });
  }

  checkEmail(email: string) {
    return axios.post(`${this.apiUrl}/api/check-email`, { email });
  }

  sendVerificationCode(email: string) {
    return axios.post(`${this.apiUrl}/api/send-verification-code`, { email });
  }

  verifyCode(codeData: any) {
    return axios.post(`${this.apiUrl}/api/verify-code`, codeData);
  }

  async login(credentials: any) {
    await this.getCSRFToken(); // Ensure CSRF token is fetched before login
    return axios
      .post(`${this.apiUrl}/api/login`, credentials)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        return response.data;
      })
      .catch(error => {
        console.error('Login error:', error);
        throw error;
      });
  }

  logout() {
    const token = localStorage.getItem('token');
    return axios
      .post(
        `${this.apiUrl}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        localStorage.removeItem('token');
      });
  }

  async getProfile() {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${this.apiUrl}/api/petOwner/profile`, {
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
    return axios.get(`${this.apiUrl}/api/pet_owner/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchPetOwnerData(id: any) {
    console.log('th id in auth=====>', id);
    return this.getPetOwnerData(id)
      .then(response => {
        console.log('pet owner data:', response);
        return response.data.data; // Correctly access nested data
      })
      .catch(error => {
        console.error('Error fetching pet owner:', error);
        throw error; // Rethrow the error or handle it appropriately
      });
  }

  // getPetOwnerData(id: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/api/petOwner/${id}`);
  // }

  updateProfile(profileData: any, petOwnerId: number) {
    const token = localStorage.getItem('token');
    return axios.put(
      `${this.apiUrl}/api/pet_owner/${petOwnerId}`,
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
      `${this.apiUrl}/api/pet_owner/image/${petOwnerId}`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async updatePass(email: string, password: string, password_confirmation: string) {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `${this.apiUrl}/api/pet-owners/update-password`,
        { email, password, password_confirmation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }
}
