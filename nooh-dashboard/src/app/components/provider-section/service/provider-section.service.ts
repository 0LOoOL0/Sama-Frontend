import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import {  ServiceProvider } from '../model/provider.model';
import { service } from '../model/service.model';

@Injectable({
  providedIn: 'root',
})
export class ProviderSectionService {

  private apiUrls = 'http://127.0.0.1:8000'; 
  private providerId: number | null = null;
  private selectedProviderSubject = new BehaviorSubject<any>(null);  
  private couponBaseUrl = 'http://127.0.0.1:8000/api/coupons'; // new endpoint






  constructor(private httpClient: HttpClient) {}



  uploadFile(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.apiUrls}/api/upload-image`, formData);
  }

  setProviderId(id: number): void {
    this.providerId = id;
  }

  getProviderId(): number | null {
    return this.providerId;
  }

  // Set selected provider data
  setSelectedProvider(provider: any) {
    this.selectedProviderSubject.next(provider);
  }

  // Get selected provider data
  getSelectedProvider() {
    return this.selectedProviderSubject.asObservable();
  }

  uploadGallery(formData: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrls}/api/gallery`, formData);
  }

  updateGallery(galleryId: any, updatedData: any) {
    return this.httpClient.put(`${this.apiUrls}/api/gallery/${galleryId}`,updatedData);
  }
  
  

  getGallery(provider_id: any): Observable<any> {
    return this.httpClient.get(`${this.apiUrls}/api/gallery/index/${provider_id}
`);
  }



uploadCategory(formData: any): Observable<any> {
  return this.httpClient.post(`${this.apiUrls}/api/category`, formData);  
}


getCategories(provider_id: any): Observable<any[]> {
  return this.httpClient.get<any[]>(`${this.apiUrls}/api/category/index/${provider_id}`);
}

getEditCategories(categories_Id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrls}/api/category/${categories_Id}`)
}

updateCategories(categories_Id: any, form:FormData): Observable<any[]> {
  return this.httpClient.put<any[]>(`${this.apiUrls}/api/category/${categories_Id}`,form)
}


deleteAllCategory(provider_id: string): Observable<any> {
  return this.httpClient.delete(`${this.apiUrls}/api/DeleteCategoriesByProviders/${provider_id}`);
}
deleteCategory(productId: string): Observable<any> {
  return this.httpClient.delete(`${this.apiUrls}/api/category/${productId}`);
}



  AddProvider(profileForm: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrls}/api/provider/information`, profileForm);
  }

  getProvider():Observable<any>{
    return this.httpClient.get(`${this.apiUrls}/api/providers`)
  }
  deleteProvider(id: string): Observable<any> {
    // Return the HTTP DELETE request as an observable
   
    return this.httpClient.delete(`${this.apiUrls}/api/providers/${id}`);
  }
  
  getProfileForUpdate(id:any): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.apiUrls}/api/providers/${id}
    `)

  }

  updateProvider(providerId: any, formData: any): Observable<any> {
    return this.httpClient
      .put<any>(`${this.apiUrls}/api/providers/${providerId}`, formData)
      .pipe(
        catchError((error) => {
          console.error('Error occurred while updating provider:', error);
          return throwError(() => error);
        })
      );
  }
  
   


  AddDoctor(doctorForm: any): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrls}/api/doctor_info/store`, 
      doctorForm 
    );
  }

  GetDocotor(profileId:any): Observable<any[]> {
    
    return this.httpClient.get<any[]>(`${this.apiUrls}/api/providers/${profileId}/doctor_info`);
  }

deleteDoctor(doctorId:any):Observable<any[]>{
  return this.httpClient.delete<any[]>(`${this.apiUrls}/api/doctor_info/delete/${doctorId}`)
}
deleteAllDoctor(providerid:any):Observable<any[]>{
  return this.httpClient.delete<any[]>(`${this.apiUrls}/api/doctor_info/deleteAllDoctorsByProvider/${providerid}`)
}

  GetDocotorById(id:any): Observable<any[]> {
    
    return this.httpClient.get<any[]>(`${this.apiUrls}/api/doctor_info/${id}
`);
  }

  updateDoctorById(doctorId: string | number, providerId: string | number, DoctorDeatils: any): Observable<any> {
    if (!doctorId || !providerId) {
      throw new Error('Invalid doctorId or providerId');
    }
    return this.httpClient.post<any>(`${this.apiUrls}/api/doctor_info/update_doctor/${doctorId}/${providerId}`, DoctorDeatils);
  }
  


  AddService(doctorForm: any): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrls}/api/services/store`, // Fixed route: No profileId in the URL
      doctorForm // doctorForm contains profileId in the body
    );
  }

// Assuming this is your method definition in your service
AddServiceCsv(services: any): Observable<any> {
  return this.httpClient.post(
    `${this.apiUrls}/api/services/store`, 
    services
  );
}

  GetService(profileId:any): Observable<any[]> {
    
    return this.httpClient.get<any[]>(`${this.apiUrls}/api/services/${profileId}`);
  }

  DeleteService(productId:any){
    return this.httpClient.delete<any[]>(`${this.apiUrls}/api/services/${productId}`);

  }

  deleteAllServicesByProvider(providerId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrls}/api/DeleteServicesByProviders/${providerId}'`);
  }

  
GetServiceItemUpdate(productId: any) {
  return this.httpClient.get<any[]>(`${this.apiUrls}/api/servicess/${productId}`);
}

  
  PostUpdateSevice(productId:any, serviceFrom:any){
    return this.httpClient.post<any[]>(`${this.apiUrls}/api/updateService/${productId}`, serviceFrom);

  }


  AddProduct(productForm: any, profileId: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrls}/api/products/addProduct/${profileId}`, productForm);
  }
  getProductByProviders(profileId: any): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrls}/api/products/${profileId}
`);
  }

  DeleteAllProductByProvider(profileId: any): Observable<any> {
    return this.httpClient.delete(`${this.apiUrls}/api/DeleteProductsByProviders/${profileId}
      `);
  }

  
  DeleteProductByProviders(profileId: string, productId:any): Observable<any> {
  return this.httpClient.delete(`${this.apiUrls}/api/products/deleteProduct/${profileId}/${productId}
    `);
}

EditProductByProviders(profileId: string, productId:any):Observable<any> {
  return this.httpClient.get(`${this.apiUrls}/api/products/getProductbyId/${profileId}/${productId}
    `);
  }
  updateProductByProviders(provider_id: any,productId: any, updatedProduct:any): Observable<any> {
    return this.httpClient.put(`${this.apiUrls}/api/products/updateProduct/${provider_id}/${productId}`, updatedProduct);
}

  
  // Get table data from a specific provider
  getTableDataFromProvider(providerId: string): Observable<any> {
    return this.httpClient.get<any[]>(`${this.apiUrls}/${providerId}/tableData`);
  }


 

  // Add this method to your ProviderSectionService
getProviderData(): Observable<any> {
  return this.httpClient.get<any>(this.apiUrls); 
}




// Fetch specific provider data by ID
getProviderDataById(providerId: string): Observable<any> {
  return this.httpClient.get<any>(`${this.apiUrls}/api/providers/${providerId}`); // URL mein providerId include kiya
}



providerToggle(id: any) {
  return this.httpClient.get<any>(`${this.apiUrls}/api/providers/update_status/${id}`); 
}

productToggle(productId: any) {
  return this.httpClient.get<any>(`${this.apiUrls}/api/products/update_status/${productId}`, ); 
}

serviceToggle(productId: any) {
  return this.httpClient.get<any>(`${this.apiUrls}/api/services/update_status/${productId}`); 
}

doctorToggle(productId: any) {
  return this.httpClient.get<any>(`${this.apiUrls}/api/doctor_info/update_status/${productId}`); 
}

categoryToggle(id: any) {
  return this.httpClient.get<any>(`${this.apiUrls}/api/category/update_status/${id}`); 
}


// NEW: Store Coupon
// NEW: Store Coupon (Admin Dashboard)
storeCouponAdminDashboard(couponData: any, providerData: any): Observable<any> {
  const payload = { coupon: couponData, provider_data: providerData };
  console.log('storeCouponAdminDashboard payload:', payload);
  return this.httpClient.post<any>(`${this.couponBaseUrl}/store-coupon-admin-dashboard`, payload)
    .pipe(
      catchError((error) => {
        console.error('Error in storeCouponAdminDashboard:', error);
        return throwError(() => error);
      })
    );
}

// NEW: Method to retrieve the list of providers.
getProviders(): Observable<any[]> {
  console.log('Fetching providers from:', `${this.apiUrls}/api/providers`);
  return this.httpClient.get<any[]>(`${this.apiUrls}/api/providers`)
    .pipe(
      catchError((error) => {
        console.error('Error fetching providers:', error);
        return throwError(() => error);
      })
    );
}

getCoupons(): Observable<any[]> {
  return this.httpClient.get<any[]>(`${this.apiUrls}/api/coupons/populate-table`);
}

updateCouponAdminDashboard(couponId: number, payload: any) {
  return this.httpClient.put<any>(`${this.couponBaseUrl}/update-coupon-admin-dashboard/${couponId}`, payload)
    .pipe(
      catchError((error) => {
        console.error('Error updating coupon:', error);
        return throwError(() => error);
      })
    );
}


deleteCouponAdminDashboard(couponId: number): Observable<any> {
  return this.httpClient.delete<any>(`${this.couponBaseUrl}/delete-coupon-admin-dashboard/${couponId}`)
    .pipe(
      catchError((error) => {
        console.error('Error deleting coupon:', error);
        return throwError(() => error);
      })
    );
}



  
}
