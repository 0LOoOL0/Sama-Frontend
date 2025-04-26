import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map, switchMap } from 'rxjs/operators';
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
  providedIn: 'root',
})
export class ProviderService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor() {
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token'); // Retrieve the token from storage
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  getAllProviders() {
    return axios.get(`${this.apiUrl}/providers`);
  }

  getProviderById(providerId: number) {
    return axios.get(`${this.apiUrl}/providers/${providerId}`);
  }

  getProviderById2(providerId: number): Observable<Provider> {
    return from(axios.get<Provider>(`${this.apiUrl}/providers/${providerId}`)).pipe(
      map((response: AxiosResponse<Provider>) => response.data)
    );
  }

  createProvider(providerData: any) {
    return axios.post(`${this.apiUrl}/providers`, providerData);
  }
  
  async getAllProviders2(): Promise<Provider[]> {
    return axios.get(`${this.apiUrl}/providers`).then(response => response.data);
  }

  updateProvider(id: number, providerData: any) {
    return axios.put(`${this.apiUrl}/providers/${id}`, providerData);
  }

  deleteProvider(id: number) {
    return axios.delete(`${this.apiUrl}/providers/${id}`);
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

  async addReview(reviewData: Omit<Review, 'petOwner'>): Promise<any> {
    try {
      // Log the reviewData after omitting petOwner
      console.log('Review data before sending:', reviewData);

      // Send the review data to the server
      const response = await axios.post(`${this.apiUrl}/reviews`, reviewData);
      
      // Log server response
      console.log('Server response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  }

  async getAverageRatingByProviderId(providerId: number): Promise<number> {
    try {
      // Fetch services provided by the provider
      const servicesResponse = await this.getServicesByProviderId(providerId);
      const services = servicesResponse.data;
  
      let totalReviews = 0;
      let totalRating = 0;
  
      // Iterate over each service to fetch and process reviews
      for (const service of services) {
        const serviceReviewsResponse = await this.getServiceReviewsByServiceId(service.id);
        const serviceReviews = serviceReviewsResponse.data;
  
        serviceReviews.forEach((review: Review) => {
          totalRating += review.rate;
          totalReviews++;
        });
      }
  
      // Calculate average rating
      const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
      return averageRating;
    } catch (error) {
      console.error('Error calculating average rating:', error);
      throw error;
    }
  }

  async getAverageRatingByProductId(productId: number): Promise<number | null> {
    try {
      const response = await axios.get(`${this.apiUrl}/products/${productId}/reviews`);
      const reviews: Review[] = response.data;
  
      if (reviews.length === 0) {
        return null;
      }
  
      const totalRating = reviews.reduce((sum, review) => sum + review.rate, 0);
      return totalRating / reviews.length;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }
}
