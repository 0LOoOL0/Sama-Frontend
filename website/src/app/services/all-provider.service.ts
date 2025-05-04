import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllProviderService {
  private providerId: number | null = null;

  private apiUrls = 'http://127.0.0.1:8000'; 
  

  setProviderId(id: number): void {
    this.providerId = id;
  }

  getProviderId(): number | null {
    return this.providerId;
  }

  constructor(private http: HttpClient) { }


  getAllProvider(): Observable<any> {
    return this.http.get(`${this.apiUrls}/api/providers`);
  }

  EditProductByProviders(profileId: string, productId:any):Observable<any> {
    return this.http.get(`${this.apiUrls}/api/products/getProductbyId/${profileId}/${productId}
      `);
    }

    GetServicebyId(service: any) {
      return this.http.get<any[]>(`${this.apiUrls}/api/servicess/${service}`);
    }

  GetService(profileId:any): Observable<any[]> {
    
    return this.http.get<any[]>(`${this.apiUrls}/api/services/${profileId}`);
  }

  getProductByProviders(profileId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrls}/api/products/${profileId}
`);
  }
}
