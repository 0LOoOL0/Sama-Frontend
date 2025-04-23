import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProviderSectionService } from '../service/provider-section.service';
import { service } from '../model/service.model';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-provider-service',
  imports: [CommonModule,FormsModule],
  templateUrl: './provider-service.component.html',
  styleUrl: './provider-service.component.css'
})
export class ProviderServiceComponent {

  ProductDetails: service[] = [];
  tableData: service[] =[]
  getService:any[]=[]
  currentPage: number = 1; 
  itemsPerPage: number = 5; 
  isFormVisible = false;
  isEditMode = false; 
  editingProductId: string | null = null; 
  showPopup = false; 
  providerId: any; 
  searchTerm: string = ''; 




  constructor(private providerService: ProviderSectionService , private toastr:ToastrService) {

  }



  ngOnInit(): void {
    this.getServiceAll();
  }

  // it auto fill suses ngModel 2 way data binding
  // as you enter the field it automatically adds here so no need to get via html name and setting it
  serviceFrom: service = {
    serviceNameEng: '' ,
    serviceNameAra:'',
    serviceDescriptionEn:  '',
    serviceDescriptionAr: '',
    priceBefore: 0,
    priceAfter: 0,
    discount: 0,
    imageUrl: '',
    status:'',

  };


  // this is used in add service main dashboard when you click it it enables this displaying the form and setting the previous to false disabling it
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    this.isEditMode = false; 

  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (validFileTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.serviceFrom.imageUrl = e.target.result; 
                    const imgElement = document.getElementById('imagePreview') as HTMLImageElement;
          imgElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.toastr.warning('Please select a valid image file (PNG, JPG, JPEG).', 'Try again!', {
          timeOut: 3000, 
        });   
      }
    }
  }
  
  
  ControlService(productId: any): void {
    this.providerService.serviceToggle(productId).subscribe(
      (response) => {
        this.getServiceAll()
        this.toastr.success('Service status has been changed successfully.', 'Congratulations!', {
          timeOut: 3000, 
        });        },
      (error) => {
        this.toastr.success('Service status has not been changed.', 'Try Again!', {
          timeOut: 3000, 
        });        }
    );
  }

  



  submitProduct(): void 
  {

    // In manage proivder when you click on edit provider it gets the provider id and sets it automatically in the provider service
    this.providerId = this.providerService.getProviderId();
  

    if (!this.providerId) {
      this.toastr.warning('Please add provider profile first.', 'Try again!', {
        timeOut: 3000, 
      });        return;
    }
      const newProduct = {
      ...this.serviceFrom,       
      id: this.generateId(),
  
      profileId: this.providerId 
    };

    console.log(newProduct.profileId);

    const Service= {Service:newProduct}
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }    
    loader.style.display = 'block';
  
    this.providerService.AddService(Service).subscribe(
      (response) => {
        loader.style.display = 'none';

        this.toastr.success('Service added successfully.', 'Congratulations!', {
          timeOut: 3000, 
        });  
        this.resetForm();
        this.getServiceAll();

      },
      (error) => {
        this.toastr.error('The Service has not been uploaded successfully.', 'Try Again!', {
          timeOut: 3000, 
        });  
      }
    );
  }

    isFormValid(): boolean {
      const { serviceNameEng, serviceDescriptionEn, serviceDescriptionAr, priceBefore, priceAfter, discount } = this.serviceFrom;
      return !!serviceNameEng && !!serviceDescriptionEn && !!serviceDescriptionAr && priceBefore > 0 && priceAfter > 0 && discount >= 0;
    }
  
    
  
    callbackFunction() {
      this.isFormVisible = !this.isFormVisible;
    }

    // The generateId() method is used to generate a unique ID for a new service when adding it. Here's what it does:
    // Date.now(): Returns the current timestamp in milliseconds.
    // Math.floor(Math.random() * 1000): Generates a random number between 0 and 999.
    // Combining Both: The timestamp ensures uniqueness based on the time, while the random number adds extra randomness to reduce collision chances.
    generateId(): number
    {
      return Date.now() + Math.floor(Math.random() * 1000);
    }

  resetForm(): void {
    this.serviceFrom = {
      serviceNameEng: '' ,
      serviceNameAra:'',
      serviceDescriptionEn:  '',
      serviceDescriptionAr: '',
      status:'',
      priceBefore: 0,
      priceAfter: 0,
      discount: 0,
      imageUrl: '',
      // providerId: '', // Add this line to include providerId

    };
    this.isFormVisible = false;
    this.isEditMode = false;
    this.editingProductId = null;
  }

  // Show popup
  onAddMoreClick(): void {
    this.showPopup = true;
  }

  // Handle popup confirmation
  onConfirm(confirm: boolean): void {
    if (confirm) this.submitProduct();
    this.showPopup = false;
  }




getServiceAll(): void {
  // Get the providerId from the providerService
  this.providerId = this.providerService.getProviderId();

  // Log the providerId for debugging purposes
  if (this.providerId) {
  } else {
    this.toastr.warning('Please add provider profile first.', 'Try Again!', {
      timeOut: 3000, 
    });  
    return; // Exit early if providerId is not found
  }
  const loader = document.getElementById('loader');

  if (!loader) {
    return;
  }    
  loader.style.display = 'block';
  // Use the providerId to fetch services
  this.providerService.GetService(this.providerId).subscribe(

    (data: any[]) => {
      loader.style.display = 'none';

      this.tableData = data.map((item) => ({
        id: item.id || null,
        serviceNameEng: item.title || '', 
        serviceNameAra: item.title_ar || '', 
        serviceDescriptionEn: item.short_description || '',
        serviceDescriptionAr: item.short_description_ar || '',
        priceBefore: item.old_price || 0,
        priceAfter: item.new_price || 0,
        discount: item.percentage || 0, 
        imageUrl: item.image || '',
        profileId: item.profileId || 0,
        providerId: this.providerId ,
        status:item.status||''
      }));

    },
    (error) => {
      this.toastr.warning(' service recod not found please add service first.', 'Add Service!', {
        timeOut: 3000, 
      });
    }
  );
}

  



get paginatedData() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const paginated = this.tableData.slice(startIndex, startIndex + this.itemsPerPage);
  return paginated;
}


  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  get totalPages() {
    return this.tableData.length ? Math.ceil(this.tableData.length / this.itemsPerPage) : 1;
  }
  




  onDeleteProduct(productId: string | null | undefined): void {
    

    const confirmation = confirm('Are you sure you want to delete this product?');
    
    if (confirmation) {
      if (!productId) {
        this.toastr.error(' service recod not found please add service first.', 'Try Agaim!', {
          timeOut: 3000, 
        });
        return;
      }
  
      this.providerService.DeleteService( productId).subscribe(
        (response) => {
          this.tableData = this.tableData.filter(product => product.id !== productId);
          this.toastr.success('Service deleted successfully.', 'Congratulations!', {
            timeOut: 3000, 
          });  
          
          this.getServiceAll()
        },
        (error) => {
          this.toastr.error('Service is not deleted.', 'try again!', {
            timeOut: 3000, 
          }); 
        }
      );
    }
  }
  

  deleteAllService(): void {
    const confirmation = confirm('Are you sure you want to delete all products?');
    if (confirmation) {
    
      this.providerId = this.providerService.getProviderId();

        if (this.providerId === null) {

          this.toastr.warning('Provider Profile not found. Please submit a profile first.', 'Try Again!', {
            timeOut: 3000, 
          });
      return;
    }
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }    
    loader.style.display = 'block';

    this.providerService.deleteAllServicesByProvider(this.providerId).subscribe(
      (response) => {
        loader.style.display = 'none';

        this.toastr.success('All service records have been deleted successfully.', 'Congratulations!', {
          timeOut: 3000, 
        }); 
        this.getServiceAll()
      },
      (error) => {
        this.toastr.error('All service records have not been deleted successfully.', 'Try Again!', {
          timeOut: 3000, 
        }); 

  
      }
    );
  }

}

  getServiceItemUpdate(productId: any): void {
    this.providerService.GetServiceItemUpdate(productId).subscribe(
      (response: any) => {
        this.isFormVisible = true;
        this.isEditMode = true;
  
        if (response) {
          this.serviceFrom = {
            serviceNameEng: response.title || '',
            serviceNameAra: response.title_ar || '',
            serviceDescriptionEn: response.short_description || '',
            serviceDescriptionAr: response.short_description_ar || '',
            priceBefore: response.old_price || 0,
            priceAfter: response.new_price || 0,
            discount: response.percentage || 0,
            imageUrl: response.image || '',
            id:response.id || 0,
          } as any; 
  
          (this.serviceFrom as any).profileid = response.provider_id || 0;
  
        } else {
          this.toastr.error('No data found for product.', 'Try Again!', {
            timeOut: 3000, 
          }); 
        }
      },
      (error: any) => {
        this.toastr.error('Please checked your internet connection.', 'Try Again!', {
          timeOut: 3000, 
        });      }
    );
  }
  
  updateService(): void {
    const productId = this.serviceFrom.id;
  
    if (!productId) {
      this.toastr.error('Service is not updated.', 'Try again', {
        timeOut: 3000, 
      });         return;
    }
  
    const updatedProduct = {
        Service: {
            serviceNameEng: this.serviceFrom.serviceNameEng,
            serviceNameAra: this.serviceFrom.serviceNameAra,
            serviceDescriptionEn: this.serviceFrom.serviceDescriptionEn,
            serviceDescriptionAr: this.serviceFrom.serviceDescriptionAr,
            priceBefore: this.serviceFrom.priceBefore,
            priceAfter: this.serviceFrom.priceAfter,
            discount: this.serviceFrom.discount,
            profileId: this.providerId ,
        },
        imageUrl: this.serviceFrom.imageUrl
    };
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }    
    loader.style.display = 'block';
    this.providerService.PostUpdateSevice(productId, updatedProduct).subscribe(
        (response) => {
          loader.style.display = 'none';

            this.toastr.success('Product successfully updated.', 'Try Again!', {
              timeOut: 3000, 
            });
            this.resetForm();
            this.getServiceAll();
        },
        (error) => {
          this.toastr.error('Service is not updated check your internet connection.', 'Try again', {
            timeOut: 3000, 
          }); 
        }
    );
}
  


  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.tableData = this.tableData.filter((product) =>
        product.serviceNameEng.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        product.serviceDescriptionEn.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.serviceDescriptionAr.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
    }
  }

 
   downloadTableData(): void {
      const csvData = this.convertToCSV(this.tableData);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'product_data.csv');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
      
    @ViewChild('fileInput', { static: false }) fileInput!: ElementRef; 

 private convertToCSV(data: service[]): string {
  const header = ['Service Name', 'Service Ar', 'Description (EN)', 'Description (AR)', 'Price Before', 'Price After', 'Discount', 'Image URL'];
  const rows = data.map(product => [
    product.serviceNameEng,
    product.serviceNameAra,
    product.serviceDescriptionEn,
    product.serviceDescriptionAr,
    product.priceBefore,
    product.priceAfter,
    product.discount,
    product.imageUrl
  ]);
  return [header.join(','), ...rows.map(row => row.join(','))].join('\n');
}

triggerFileInput(): void {
  this.fileInput.nativeElement.click();
}

onFileImport(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.parseCSVData(e.target.result);
    };
    reader.readAsText(file);
  }
}

private parseCSVData(csvData: string): void {
  this.providerId = this.providerService.getProviderId();
  
  if (!this.providerId) {
    this.toastr.warning('Please add provider profile first.', 'Try again', {
      timeOut: 3000, 
    });     return;
  }
  const rows = csvData.split('\n');
  const parsedData: service[] = []; 

  rows.forEach((row, index) => {
    if (index === 0) return; 
    const columns = row.split(',');
    if (columns.length >= 9) {
      const service: service = {
        serviceNameEng: columns[0]?.trim(),
        serviceNameAra: columns[1]?.trim(),
        serviceDescriptionEn: columns[2]?.trim(),
        serviceDescriptionAr: columns[3]?.trim(),
        priceBefore: parseFloat(columns[4]?.trim()) || 0,
        priceAfter: parseFloat(columns[5]?.trim()) || 0,
        discount: parseFloat(columns[6]?.trim()) || 0,
        imageUrl: columns[7]?.trim(),
        status:columns[8]?.trim()||''
      };

      parsedData.push(service); 
    }
  });

  if (parsedData.length > 0) {
    let serviceCount = 0;

    const sendService = (service: service) => {
      const serviceObject = { 
        Service: {
          serviceNameEng: service.serviceNameEng,
          serviceNameAra: service.serviceNameAra,
          serviceDescriptionEn: service.serviceDescriptionEn,
          serviceDescriptionAr: service.serviceDescriptionAr,
          priceBefore: service.priceBefore,
          priceAfter: service.priceAfter,
          discount: service.discount,
          imageUrl: service.imageUrl,
          profileId: this.providerId
        }
      };
      const loader = document.getElementById('loader');

      if (!loader) {
        return;
      }    
      loader.style.display = 'block';

      this.providerService.AddServiceCsv(serviceObject).subscribe(
        (response) => {
          this.getServiceAll()

          serviceCount++;
          if (serviceCount < parsedData.length) {
            sendService(parsedData[serviceCount]);
          } else {

            loader.style.display = 'none';
            this.toastr.success('All service have been uploaded successfully.', 'Good News!', {
              timeOut: 3000, 
            });           }
        },
        (error) => {
          this.toastr.error('Service is not uploaded check your internet connection.', 'Try again', {
            timeOut: 3000, 
          });         }
      );
    };

    sendService(parsedData[serviceCount]);
  } else {
    this.toastr.error('No valid data found in the CSV file.', 'Try again', {
      timeOut: 3000, 
    }); 
  }
}

}