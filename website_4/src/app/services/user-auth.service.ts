import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
// import axios from 'axios';
import axios, {  } from 'axios';
import { Observable } from 'rxjs';



axios.defaults.withCredentials = true;

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCSRFToken() {
    return axios.get(`${this.apiUrl}/sanctum/csrf-cookie`);
  }

  async register(userData: FormData) {
    await this.getCSRFToken(); // Ensure CSRF token is fetched before login
    return axios.post(`${this.apiUrl}/api/register`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.data)
      .catch(error => {
        console.error('Register error:', error.response?.data || error.message);
        throw this.handleError(error);
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

  checkEmail(email: string) {
    return axios.post(`${this.apiUrl}/api/check-email`, { email });
  }

  sendVerificationCode(email: string) {
    return axios.post(`${this.apiUrl}/api/send-verification-code`, { email });
  }

  
  getAuthenticatedPetOwnerId(): Promise<number> {
    const token = localStorage.getItem('token');
    if (!token) return Promise.reject('Token not found');
  
    return new Promise<number>((resolve, reject) => {
      axios.get(`${this.apiUrl}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const user = res.data as { id: number };
        resolve(user.id);
      })
      .catch((err) => {
        console.error('Error getting authenticated user ID:', err);
        reject(err);
      });
    });
  }
  
  
  
  
  
  

  verifyCode(codeData: any) {
    return axios.post(`${this.apiUrl}/api/verify-code`, codeData);
  }

  async login(credentials: any): Promise<{ token: string; user: any }> {
    await this.getCSRFToken();
    return axios
      .post<{ token: string; user: any }>(`${this.apiUrl}/api/login`, credentials)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('pet_owner_id', response.data.user.id); // 👈 FIX

        return response.data;
      })
      .catch((error) => {
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
    const response = await axios.get<{ data: any }>(`${this.apiUrl}/api/petOwner/profile`, {
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
      return this.getPetOwnerData(id)
        .then(response => {
          console.log('pet owner data:', response);
          const data = response.data as { data: any }; // Explicitly type the response data
          return data.data; // Correctly access nested data
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
    return axios.post(
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
