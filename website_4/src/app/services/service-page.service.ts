import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicePageService {
  private apiUrl = `${environment.apiUrl}/admin`; // Adjust the endpoint if needed

  constructor() {
    console.log('here:', this.apiUrl);
    // axios.interceptors.request.use(
    //   config => {
    //     const token = localStorage.getItem('token'); // Retrieve the token from storage
    //     config.headers = {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'application/json'
    //     };
    //     return config;
    //   },
    //   error => {
    //     return Promise.reject(error);
    //   },
    // );
  }
  // Get all services
  async getServices(): Promise<any[]> {
    const token = localStorage.getItem('token');
    const result = await axios.get<any[]>(this.apiUrl + '/services', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  }

  async deleteService(id: number): Promise<void> {
    const url = `${this.apiUrl}/services/${id}`; // Correct endpoint for deleting a service
    const token = localStorage.getItem('token');

    return axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // Log success response for better debugging
        console.log(`Service with id=${id} deleted successfully`, response);
      })
      .catch(error => {
        // Check if error.response exists for better error handling
        if (error.response) {
          console.error(
            `Error deleting service by id=${id}:`,
            error.response.data,
          );
        } else {
          console.error(`Error deleting service by id=${id}:`, error.message);
        }
        throw error;
      });
  }
  // Function to delete all services
  async deleteAllServices(): Promise<void> {
    try {
      // Fetch all services first
      const services = await this.getServices();
      // Delete each service one by one
      for (const service of services as any[]) {
        await this.deleteService(service.id);
      }
    } catch (error) {
      console.error('Error deleting all services:', error);
      throw error;
    }
  }
  // Add a new service
  async addService(service: any) {
    const token = localStorage.getItem('token');
    try {
      const result = await axios.post(`${this.apiUrl}/services`, service, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result.data;
    } catch (error) {
      console.error('Error adding service:', error);
      throw error;
    }
  }
// async saveAllServices(){
//   const token = localStorage.getItem('token');
//   const result = await axios.post(this.apiUrl+'/services', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: {
//       serviceNameEn: '',
//       serviceNameAr: '',
//       descriptionEn: '',
//       descriptionAr: '',
//       discount: '',
//       priceBefore: '',
//       priceAfter: ''
//     }
//   });
//   return result.data;
// }
//}

// async deleteService(serviceId: number) {
//   const token = localStorage.getItem('token');
//   const result = await axios.delete(this.apiUrl+'/services/{id}', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     }
//   });
//   return result.data;
// }

// Get a single service by ID
// getServiceById(id: number): Promise<ServiceModel> {
//   const url = `${this.apiUrl}/${id}`;
//   const token = localStorage.getItem('token');
//   return axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     }
//   })
//   .then(response => response.data as ServiceModel) // Adjust data extraction if necessary
//   .catch(error => {
//     console.error(`Error fetching service by id=${id}:`, error);
//     throw error;
//   });
// }

// Update an existing service
updateService(id: number, service: any): Promise<void> | any {
  const url = `${this.apiUrl}/updateService/${id}`;
  const token = localStorage.getItem('token');
  return axios.put(url, service, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(() => {})
  .catch(error => {
    console.error(`Error updating service by id=${id}:`, error);
    throw error;
  });
}

// // Delete a service by ID
// deleteService(id: number): Promise<void> {
//   const url = `${this.apiUrl}/${id}`;
//   const token = localStorage.getItem('token');
//   return axios.delete(url, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   })
//   .then(() => {})
//   .catch(error => {
//     console.error(`Error deleting service by id=${id}:`, error);
//     throw error;
//   });
// }
//
}