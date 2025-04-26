import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, from, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// import axios, { AxiosRequestHeaders, isAxiosError, AxiosRequestConfig } from 'axios';
// import { AxiosError } from 'axios';
import { Router } from '@angular/router';
// axios.defaults.withCredentials = true;
@Injectable({
  providedIn: 'root'
})
export class ProviderAuthService {
  private apiUrl: string = environment.apiUrl;
  private emailVerifiedSubject = new BehaviorSubject<boolean>(false);
  emailVerified$ = this.emailVerifiedSubject.asObservable();
  private tokenKey: string = 'provider_token';

  constructor(private http: HttpClient, private router: Router) {
  
  }

  checkEmail(email: string): Promise<any> {
    return fetch(`${this.apiUrl}/api/check-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error checking email:', error);
        throw error;
    });
}

  sendVerificationCode(email: string): Promise<any> {
    return fetch(`${this.apiUrl}/api/send-verification-code`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error sending verification code:', error);
        throw error;
    });
}

  verifyCode(codeData: any): Promise<any> {
    return fetch(`${this.apiUrl}/api/verify-code`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(codeData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error verifying code:', error);
        throw error;
    });
}

  
  getCSRFToken(): Observable<any> {
    return from(fetch(`${this.apiUrl}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).catch(error => {
        console.error('Error fetching CSRF token:', error);
        throw error;
    }));
}

  updateProfile(profileData: any, provider_id: number): Promise<any> {
    const token = localStorage.getItem('token');
    return fetch(`${this.apiUrl}/api/provider/${provider_id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error updating profile:', error);
        throw error;
    });
}
  updateProfileImage(profileData: any, petOwnerId: number): Promise<any> {
    const token = localStorage.getItem('token');
    return fetch(`${this.apiUrl}/api/pet_owner/image/${petOwnerId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
        body: profileData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error updating profile image:', error);
        throw error;
    });
}

  getProviderToken(): string | null {
    return localStorage.getItem('provider_token');
  }

  isLoggedIn(): boolean {
    return !!this.getProviderToken();
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

 // Register Pending Provider
 async registerPendingProvider(formData: any): Promise<any> {
  console.log('Sending request to:', `${this.apiUrl}/api/register-pending-provider`);
  console.log('FormData contents:');
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    // const response = await axios.post(`${this.apiUrl}/api/register-pending-provider`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });
    // console.log('Server response:', response.data);
    // return response.data;
  } catch (error) {
    // if (isAxiosError(error)) {
    //   const axiosError = error as AxiosError;
      // console.error('Axios error:', response?.data || axiosError.message);
      // throw new Error(axiosError.response?.data.message || 'An error occurred during registration');
    // } else {
    //   console.error('Unexpected error:', error);
    //   throw new Error('An unexpected error occurred');
    // }
  
}

// private handleError(error: any) {
//   let errorMessage = 'An unknown error occurred';
//   if (error.response) {
//     // The request was made and the server responded with a status code
//     // that falls out of the range of 2xx
//     errorMessage = error.response.data.message || JSON.stringify(error.response.data);
//   } else if (error.request) {
//     // The request was made but no response was received
//     errorMessage = 'No response received from server';
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     errorMessage = error.message;
//   }
//   return new Error(errorMessage);
// }
 }
getProviderStatus(token: string) {
  return this.http.post<any>(`${this.apiUrl}/api/get-provider-status`, { token: token });
}


// Admin approves provider
approveProvider(providerId: string) {
  // return axios.post(`${this.apiUrl}/api/approve-provider/${providerId}`);
}

  async Registration(userData: any){
    await this.getCSRFToken(); // Ensure CSRF token is fetched before login
    return 
    // return axios.post<{ token: string }>(`${this.apiUrl}/api/registration`, userData)
    //   .then((response: { data: { token: string } }) => {
    //     const data = response.data;
    //     localStorage.setItem('token', data.token);
    //     return response.data;
    //   });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, credentials, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Prologout`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('provider_token')}` },
      withCredentials: true
    });
  }

  register(credentials: { email: string; password: string; confirmpassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/provider/register`, credentials, { withCredentials: true });
  }
 
  storeProviderInformation(providerInfo: any): void {
    localStorage.setItem('provider_information', JSON.stringify(providerInfo));
  }

  getStoredProviderInformation(): any {
    const storedInfo = localStorage.getItem('provider_information');
    return storedInfo ? JSON.parse(storedInfo) : null;
  }

  isAuthenticated() {
    const token = localStorage.getItem(this.tokenKey);
    return of(!!token).pipe(
      map(isAuth => {
        // if (isAuth) {
        //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // }
        return isAuth;
      })
    );
  }

  verifyAuthentication(): Promise<any> {
    return this.isAuthenticated().toPromise();
  }
  
  getProfile() {
    // const config {
    //   headers: this.getAuthHeaders(),
    // };
    // return from(axios.get(`${this.apiUrl}/api/provider/profile`)).pipe(
    //   catchError(error => {
    //     console.error('Error fetching profile:', error);
    //     throw error;
    //   })
    // );
  }

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem(this.tokenKey);
    return {
      'Authorization': `Bearer ${token}`
    };
  }
}

function resolve() {
  throw new Error('Function not implemented.');
}
