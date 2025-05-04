import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { from, Observable } from 'rxjs';
export interface Provider {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  name: string;
  address: string;
  contact_no: string;
  profile_image?: string;
  social_media: string;
  documents: string;
  type: string;
  email: string;
  availability: string;
}

export interface PetOwner {
  id: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  nationality: string;
  profile_image?: string;
  location: string;
  date_of_birth: string;
  house?: string;
  road?: string;
  block?: string;
  building_name?: string;
  apt_number?: string;
  floor?: string;
  company?: string;
}

export interface Veterinarian {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  provider_id: number;
  name: string;
  email: string;
  bio: string;
  education: string;
  years_of_experience: number;
  picture: string;
  specialization: string;
}

export interface Service {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  title: string;
  short_description: string;
  old_price: number;
  new_price: number;
  percentage: number;
  contact_number: string;
  pet_type: string;
  provider_id: number;
  image: string;
}

export interface Product {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  name: string;
  old_price: number;
  new_price?: number;
  quantity: number;
  description: string;
  contact_number: string;
  pet_type: string;
  provider_id: number;
  images: string;
  percentage?: number;
}

export interface Review {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  service_id?: number | null;
  product_id?: number | null;
  pet_owner_id: number;
  date: string;
  rate: number;
  comment: string;
  petOwner?: PetOwner;
}
axios.defaults.withCredentials = true;

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private apiUrl = `${environment.apiUrl}/api`;

  constructor() {
    // axios.interceptors.request.use(
    //   response => {
    //     const token = localStorage.getItem('token'); // Retrieve the token from storage
    //     // if (token) {
    //     //   if (!config.headers) {
    //     //     config.headers = {};
    //     //   }
    //     //   config.headers['Authorization'] = `Bearer ${token}`;
    //     // }
    //     // return config;
    //   },
    //   error => {
    //     return Promise.reject(error);
    //   },
    // );
  }
  

  getAllProviders() {
    return axios.get(`${this.apiUrl}/providers`);
  }

  getProviderById(providerId: number) {
    return axios.get(`${this.apiUrl}/providers/${providerId}`);
  }

  createProvider(providerData: any) {
    return axios.post(`${this.apiUrl}/providers`, providerData);
  }

  updateProvider(id: number, providerData: any) {
    return axios.put(`${this.apiUrl}/providers/${id}`, providerData);
  }

  deleteProvider(id: number) {
    return axios.delete(`${this.apiUrl}/providers/${id}`);
  }
  addProduct(productData: any, provider_id: number){
    return axios.post(`${this.apiUrl}/product/addProduct/${provider_id}`);
  }
  deleteProduct(product_id: number, provider_id: number){
    return axios.post(`${this.apiUrl}/product/deleteProduct/${provider_id}/${product_id}`);
  }
  updateProduct(productData: any, provider_id: number){
    return axios.post(`${this.apiUrl}/product/updateProduct/${productData}/${provider_id}`);
  }
  getServicesByProviderId(providerId: number) {
    return axios.get(`${this.apiUrl}/providers/${providerId}/services`);
  }

  getProductsByProviderId(providerId: number) {
    return axios.get(`${this.apiUrl}/providers/${providerId}/products`);
  }

  getVeterinariansByProviderId(providerId: number) {
    return axios.get(`${this.apiUrl}/providers/${providerId}/veterinarians`);
  }

  getVeterianById(id: number) {
    return axios.get(`${this.apiUrl}/veterinarians/${id}`);
  }

  getServiceById(id: number) {
    return axios.get(`${this.apiUrl}/services/${id}`);
  }

  getProductById(id: number) {
    return axios.get(`${this.apiUrl}/products/${id}`);
  }

  getServiceReviewsByServiceId(serviceId: number) {
    return axios.get(`${this.apiUrl}/services/${serviceId}/reviews`);
  }
  getPetOwnerById(id: number) {
    return axios.get(`${this.apiUrl}/pet_owners/${id}`);
  }
  getProductReviewsByProductId(productId: number) {
    return axios.get(`${this.apiUrl}/products/${productId}/reviews`);
  }
  getProviderByName(name: string): Observable<any> {
    return from(axios.get(`${this.apiUrl}/providers/name/${name}`));
  }
  getAddress(): Observable<any> {
    const token = localStorage.getItem('provider_token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return from(axios.get(`${this.apiUrl}/provider/address`, config));
  }



  async addReview(reviewData: Omit<Review, 'petOwner'>): Promise<any> {
    try {
      // Log the reviewData after omitting petOwner
      console.log('Review data before sending:', reviewData);

      // Send the review data to the server
      const response = await axios.post(`${this.apiUrl}/api/reviews`, reviewData);
      
      // Log server response
      console.log('Server response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  }

}
