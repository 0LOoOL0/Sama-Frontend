import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ServiceProvider } from '../model/provider.model';
import { service } from '../model/service.model';

@Injectable({
  providedIn: 'root',
})
export class ProviderSectionService {

  private apiUrls = 'http://127.0.0.1:8000';
  private providerId: number | null = null;
  private selectedProviderSubject = new BehaviorSubject<any>(null);


  constructor(private httpClient: HttpClient) { }

  getCoupons(): Observable<any> {
    return this.httpClient.get(`${this.apiUrls}/api/coupons`)
  }
  getProviderById(providerId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrls}/api/providers/${providerId}`);
  }


  uploadFile(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.apiUrls}/api/upload-image`, formData);
  }

  getProviderByCouponId(providerId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrls}/api/providers/${providerId}`).pipe(
      tap((response: any) => console.log("API Response:", response)) // Log response
    );
  }

  setProviderId(id: number): void {
    this.providerId = id;
  }

  getProviderId(): number | null {
    return this.providerId;
  }

  setCouponProviderId(id: number): void {
    console.log("Setting provider ID:", id);
    this.providerId = id;
  }

  getCouponProviderId(): number | null {
    console.log("Fetching stored provider ID:", this.providerId);
    return this.providerId;
  }
  getCouponsByProviderId(providerId: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.apiUrls}/api/provider-coupons?provider_id=${providerId}`);
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
    return this.httpClient.put(`${this.apiUrls}/api/gallery/${galleryId}`, updatedData);
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

  updateCategories(categories_Id: any, form: FormData): Observable<any[]> {
    return this.httpClient.put<any[]>(`${this.apiUrls}/api/category/${categories_Id}`, form)
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

  getProvider(): Observable<any> {
    return this.httpClient.get(`${this.apiUrls}/api/providers`)
  }
  deleteProvider(id: string): Observable<any> {
    // Return the HTTP DELETE request as an observable

    return this.httpClient.delete(`${this.apiUrls}/api/providers/${id}`);
  }

  getProfileForUpdate(id: any): Observable<any[]> {
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

  GetDocotor(profileId: any): Observable<any[]> {

    return this.httpClient.get<any[]>(`${this.apiUrls}/api/providers/${profileId}/doctor_info`);
  }

  deleteDoctor(doctorId: any): Observable<any[]> {
    return this.httpClient.delete<any[]>(`${this.apiUrls}/api/doctor_info/delete/${doctorId}`)
  }
  deleteAllDoctor(providerid: any): Observable<any[]> {
    return this.httpClient.delete<any[]>(`${this.apiUrls}/api/doctor_info/deleteAllDoctorsByProvider/${providerid}`)
  }

  GetDocotorById(id: any): Observable<any[]> {

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

  GetService(profileId: any): Observable<any[]> {

    return this.httpClient.get<any[]>(`${this.apiUrls}/api/services/${profileId}`);
  }

  DeleteService(productId: any) {
    return this.httpClient.delete<any[]>(`${this.apiUrls}/api/services/${productId}`);

  }

  deleteAllServicesByProvider(providerId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrls}/api/DeleteServicesByProviders/${providerId}'`);
  }


  GetServiceItemUpdate(productId: any) {
    return this.httpClient.get<any[]>(`${this.apiUrls}/api/servicess/${productId}`);
  }


  PostUpdateSevice(productId: any, serviceFrom: any) {
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


  DeleteProductByProviders(profileId: string, productId: any): Observable<any> {
    return this.httpClient.delete(`${this.apiUrls}/api/products/deleteProduct/${profileId}/${productId}
    `);
  }

  EditProductByProviders(profileId: string, productId: any): Observable<any> {
    return this.httpClient.get(`${this.apiUrls}/api/products/getProductbyId/${profileId}/${productId}
    `);
  }
  updateProductByProviders(provider_id: any, productId: any, updatedProduct: any): Observable<any> {
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
    return this.httpClient.get<any>(`${this.apiUrls}/api/products/update_status/${productId}`,);
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

  getPetOwners(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrls}/api/pet_owner`);
  }

}
