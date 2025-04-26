import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Fav {
  id?: number; // Marked as optional
  pet_owner_id: number;
  provider_id?: number;
  product_id?: number;
  service_id?: number;
  pet_id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FavService {
  private apiUrl = `${environment.apiUrl}/api/favs`;

  constructor(private http: HttpClient, private authService: AuthService) {
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

  // Fetch all favs
  getFavs(): Observable<Fav[]> {
    return from(axios.get<Fav[]>(this.apiUrl)).pipe(
      map(response => response.data),
    );
  }

  // Fetch a single fav by id
  getFavById(id: number): Observable<Fav> {
    return from(axios.get<Fav>(`${this.apiUrl}/${id}`)).pipe(
      map(response => response.data),
    );
  }

  // Create a new fav
  createFav(fav: Fav): Observable<Fav> {
    return from(axios.post<Fav>(this.apiUrl, fav)).pipe(
      map(response => response.data),
    );
  }

  // Update an existing fav
  updateFav(id: number, fav: Fav): Observable<Fav> {
    return from(axios.put<Fav>(`${this.apiUrl}/${id}`, fav)).pipe(
      map(response => response.data),
    );
  }

  // Delete a fav
  deleteFav(id: number): Observable<void> {
    return from(axios.delete(`${this.apiUrl}/${id}`)).pipe(
      map(response => response.data),
    );
  }

  // Fetch favs by pet owner ID
  getFavsByPetOwnerId(petOwnerId: number): Observable<Fav[]> {
    return from(
      axios.get<Fav[]>(`${this.apiUrl}/pet_owner/${petOwnerId}`),
    ).pipe(map(response => response.data));
  }
  isProductInFavorites(
    petOwnerId: number,
    productId: number,
  ): Observable<boolean> {
    return this.getFavsByPetOwnerId(petOwnerId).pipe(
      map(favs => favs.some(fav => fav.product_id === productId)),
    );
  }
  isProviderInFavorites(
    petOwnerId: number,
    providerId: number,
  ): Observable<boolean> {
    return this.getFavsByPetOwnerId(petOwnerId).pipe(
      map(favs => favs.some(fav => fav.provider_id === providerId)),
    );
  }
  isPetInFavorites(petOwnerId: number, petId: number): Observable<boolean> {
    return this.getFavsByPetOwnerId(petOwnerId).pipe(
      map(favs => favs.some(fav => fav.pet_id === petId)),
    )
  }
  async toggleFavorite(item: any): Promise<void> {
    try {
      if (item.isFavorite) {
        await this.deleteFav(item.id).toPromise();
        item.isFavorite = false;
      } else {
        const petOwnerId = await this.authService.getProfile();
        const newFav: Fav = {
          product_id: item.product_id,
          service_id: item.service_id,
          provider_id: item.provider_id,
          pet_owner_id: petOwnerId.id,
        };
        const createdFav = await this.createFav(newFav).toPromise();
        if (createdFav) {
          item.id = createdFav.id;
          item.isFavorite = true;
        } else {
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }
}
