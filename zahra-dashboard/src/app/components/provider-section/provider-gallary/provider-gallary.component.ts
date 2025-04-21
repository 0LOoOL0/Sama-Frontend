import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProviderSectionService } from '../service/provider-section.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-provider-gallery',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './provider-gallary.component.html',
  styleUrls: ['./provider-gallary.component.css']
})
export class ProviderGallaryComponent implements OnInit {
  galleryForm: FormGroup;
  contractFile: File | null = null;
  contractFileName:string|null=null;
  
  documentFile: File | null = null;
  bannerFile: File | null = null;
  imagePreview: string | null = null;
  imagePreviews: string[] = []; 

  contractFileUrl: string | null = null; 
  documentFileUrl: string | null = null; 
  bannerFileUrl: string | null = null; 

  contractFileError: string = '';
  documentFileError: string = '';
  documentFileName:string='';
  bannerFileError: string = '';
  bannerFileName:string='';
  providerId: any; 
  editingProductId: string | null = null;
  imageFiles: File[] = [];

  
imageBase64Files: string[] = []; 
contractFileBase64: string | null = null;
documentFileBase64: string | null = null;
bannerFileBase64: string | null = null;






  constructor(private fb: FormBuilder , private galleryService : ProviderSectionService, private toastr:ToastrService) {
  
  
      this.galleryForm = this.fb.group({
        typeEN: [''],
        typeAR: [''],
        descriptionEN: [''],
        descriptionAR: [''],
        productId:[''],
        provider_id:[''],
      });
    
  }

  ngOnInit(): void {
   this.getGallery();
  }

  hasGalleryData: boolean = false; 

  getGallery(): void {
      this.providerId = this.galleryService.getProviderId();
  
      if (!this.providerId) {
        this.toastr.warning('Provider profile not found. Please submit a profile first.', 'Try Again!', {
          timeOut: 3000, 
        });  
          return;

      }
      const loader = document.getElementById('loader');

      if (!loader) {
        return;
      }    
      loader.style.display = 'block';
  
      this.galleryService.getGallery(this.providerId).subscribe(
          (response: any) => {
            loader.style.display = 'none';

  
              if (response && response.length > 0) {
                  this.hasGalleryData = true; 
                  const galleryData = response[0];
                  this.galleryForm.patchValue({
                      typeEN: galleryData.type_en || '',
                      typeAR: galleryData.type_ar || '',
                      descriptionEN: galleryData.description_en || '',
                      descriptionAR: galleryData.description_ar || '',
                      productId: galleryData.id || '',
                      provider_id: this.providerId,
                  });
  
                  this.contractFileName = this.extractFileName(galleryData.contract) || 'No file chosen';
                  this.documentFileName = this.extractFileName(galleryData.document) || 'No file chosen';
                  this.bannerFileName = this.extractFileName(galleryData.banner) || 'No file chosen';
  
                  this.contractFileUrl = galleryData.contract;
                  this.documentFileUrl = galleryData.document;
                  this.bannerFileUrl = galleryData.banner;
  
                  this.contractFile = this.isBase64(galleryData.contract)
                      ? this.dataURLtoFile(galleryData.contract, 'contract.png')
                      : null;
                  this.documentFile = this.isBase64(galleryData.document)
                      ? this.dataURLtoFile(galleryData.document, 'document.pdf')
                      : null;
                  this.bannerFile = this.isBase64(galleryData.banner)
                      ? this.dataURLtoFile(galleryData.banner, 'banner.png')
                      : null;
  
                  try {
                      this.imagePreviews = JSON.parse(galleryData.image_url);
                  } catch (error) {
                    this.toastr.warning('Image is not upload', 'Try again later!', {
                      timeOut: 3000, 
                    });                        this.imagePreviews = [];
                  }
  
            
              } else {
                  this.hasGalleryData = false; 
                  this.toastr.warning('Gallery data was not found.', 'Add New Gallary!', {
                    timeOut: 3000, 
                  });               }
          },
          (error) => {
            this.toastr.error('Please check your internet connection..', 'Connection lost!', {
              timeOut: 3000, 
            });           }
      );
  }
  

// Utility function to extract filename from URL
extractFileName(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1].split('?')[0]; // Get the last part of the URL and remove query parameters
}


// Handle download action
downloadFile(fileUrl: string | null): void {
  if (fileUrl) {
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = fileUrl; // Set the file URL
    a.target = '_blank'; // Open in a new tab

    document.body.appendChild(a);
    a.click(); // Trigger the click to open in a new tab
    document.body.removeChild(a); // Clean up the DOM
  } else {
    this.toastr.error('File was not found', 'Try Again', {
      timeOut: 3000, 
    });     }
}


// Handle delete action
deleteFile(type: string): void {
  if (type === 'contract') {
      this.contractFile = null;
      this.contractFileName = 'No file chosen'; // Reset the filename display
  } else if (type === 'document') {
      this.documentFile = null;
      this.documentFileName = 'No file chosen'; // Reset the filename display
  } else if (type === 'banner') {
      this.bannerFile = null;
      this.bannerFileName = 'No file chosen'; // Reset the filename display
  }
}


  
  
  // Helper function to check if the URL is a Base64-encoded data URL
  isBase64(url: string): boolean {
    return url.startsWith('data:') && url.includes('base64,');
  }
  
  

   // Method to update the gallery
   async updateGallery(): Promise<void> {
    // Check if the form is valid
    if (this.galleryForm.valid) {
        // Get the provider ID from the service
        this.providerId = this.galleryService.getProviderId();

        // Check if providerId exists
        if (!this.providerId) {
          this.toastr.warning('Please add provider profile first', 'Try Again', {
            timeOut: 3000, 
          });               return; // Exit if providerId is not available
        }

        // Extract the updated data from the form and prepare it
        const updatedProduct: any = {
            typeEN: this.galleryForm.value.typeEN,
            typeAR: this.galleryForm.value.typeAR,
            descriptionEN: this.galleryForm.value.descriptionEN,
            descriptionAR: this.galleryForm.value.descriptionAR,
            provider_id: this.providerId, // Attach the provider ID
        };

        // Get the editing product ID (gallery ID) from the form
        const galleryId = this.galleryForm.value.productId; // Assuming productId is in the form

        if (!galleryId) {
          this.toastr.error('Gallery not found. Please add the gallery first.', 'Try Again', {
            timeOut: 3000, 
          });                return; // Exit if galleryId is not available
        }

        // Convert files to Base64 (asynchronously)
        try {
            if (this.contractFile) {
                updatedProduct.contract = await this.convertToBase64(this.contractFile);
            }

            if (this.documentFile) {
                updatedProduct.document = await this.convertToBase64(this.documentFile);
            }

            if (this.bannerFile) {
                updatedProduct.banner = await this.convertToBase64(this.bannerFile);
            }

            // Handle array of image files
            if (this.imageFiles && this.imageFiles.length > 0) {
                updatedProduct.images = await Promise.all(
                    this.imageFiles.map(file => this.convertToBase64(file))
                );
            }

            const data = { Gallery: updatedProduct };

            const loader = document.getElementById('loader');

            if (!loader) {
              return;
            }    
            loader.style.display = 'block';   
                     this.galleryService.updateGallery(galleryId, data).subscribe(
                (response) => {
                  loader.style.display = 'none';   

                  this.toastr.success('Gallery Updated successfully.', 'Congratulations', {
                    timeOut: 3000, 
                  });   
                },
                (error)=> {
                    this.toastr.error('Failed to update gallery', 'Try Again', {
                      timeOut: 3000, 
                    });                   
                }
            );
        } catch (error) {
          this.toastr.warning('Failed to upload files', 'Try Again', {
            timeOut: 3000, 
          }); 
        }
    } else {
      this.toastr.warning('Please fill all required fields', 'Try Again', {
        timeOut: 3000, 
      });     }
}



// Helper method to convert file to Base64
convertToBase64(file: File): Promise<string> {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
        reader.onload = () => {
            resolve(reader.result as string); // Return the Base64 result
        };
        reader.onerror = (error) => {
            reject(error); // Handle any errors that occur during reading
        };
        reader.readAsDataURL(file); // Convert file to Base64
    });
}

  
  
  
  


  


     generateId(): number {
      return Date.now() + Math.floor(Math.random() * 1000);
    }
 
    onSubmit(): void {
      this.providerId = this.galleryService.getProviderId();
  
      // Check if providerId exists
      if (!this.providerId) {
        this.toastr.warning('Provider profile not found. Please submit a profile first.', 'Try Again!', {
          timeOut: 3000, 
        });  
                return; 
      }
  
      if (this.galleryForm.valid) {
        const formData = {
          ...this.galleryForm.value,
          provider_id: this.providerId,
          banner: this.bannerFileBase64, 
          contract: this.contractFileBase64, // Send Base64 string
          document: this.documentFileBase64, // Send Base64 string
          images: this.imageBase64Files // This should now contain Base64 strings
        };
  
        const loader = document.getElementById('loader');

        if (!loader) {
          return;
        }    
        loader.style.display = 'block';
        // Submit the data
        this.galleryService.uploadGallery(formData).subscribe(
          (response) => {
            loader.style.display = 'none';

            this.toastr.success('Gallery recod has been upload successfully', 'Good News|', {
              timeOut: 2000, 
            });     
            this.toastr.warning('Please dont submit a new gallery. If you want to change the record, you can edit it from the All Providers list.', 'Try Again', {
              timeOut: 5000, 
            });          this.resetForm();
          },
          (error) => {
            this.toastr.error('Please a submit correct information.', 'Try Again', {
              timeOut: 3000, 
            });    
          }
        );
      } else {
        this.toastr.warning('Please fill in all required fields.', 'Try Again', {
          timeOut: 3000, 
        });        }
    }

 
  
  
  // Reset the form after submission

  
  

  // Handle contract file selection
  onContractFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/png', 'image/jpeg', 'image/jpg']
      if (!allowedTypes.includes(file.type)) {
        this.contractFileError = 'Invalid file type. Only PDF, DOC, or DOCX are allowed.';
        this.contractFile = null;
        this.contractFileName = ''; // Reset the file name
        return;
      }
      
      this.contractFile = file;
      this.contractFileError = '';
      this.contractFileName = file.name; // Store the file name

      // Read the file as Base64
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          this.contractFileBase64 = e.target.result as string; // Store Base64 string
        }
      };
      reader.readAsDataURL(file); // Read the file as Data URL (Base64)
    }
}

  // Handle delete action
 

  // Handle document file selection
 // Handle document file selection
 onDocumentFileSelect(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      this.documentFileError = 'Invalid file type. Only PDF, DOC, or DOCX are allowed.';
      this.documentFile = null;
      this.documentFileName = ''; // Reset file name
      return;
    }

    this.documentFile = file;
    this.documentFileName = file.name; // Store the file name
    this.documentFileError = ''; // Clear any previous errors

    // Read the file as Base64
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        this.documentFileBase64 = e.target.result as string; // Store Base64 string
      }
    };
    reader.readAsDataURL(file); // Read the file as Data URL (Base64)
  }
}


onBannerFileSelect(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      this.bannerFileError = 'Invalid file type. Only PNG, JPG, or JPEG are allowed.';
      this.bannerFile = null;
      this.bannerFileName = ''; // Reset file name
      return;
    }

    this.bannerFile = file;
    this.bannerFileName = file.name; // Store the file name
    this.bannerFileError = ''; // Clear any previous errors

    // Read the file as Base64
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        this.bannerFileBase64 = e.target.result as string; // Store Base64 string
      }
    };
    reader.readAsDataURL(file); // Read the file as Data URL (Base64)
  }
}


  // Handle selecting images for preview and storing them
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files); // Convert FileList to Array
  
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          this.imageFiles.push(file); // Store the File object
  
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
              this.imageBase64Files.push(e.target.result as string); // Store Base64 string
              this.imagePreviews.push(e.target.result as string); // Add image preview to array
            }
          };
          reader.readAsDataURL(file); // Read the file as Data URL (Base64)
        }
      });
    }
  }


  // Generate a unique ID for form submission
  generateUniqueId(): string {
    return `id-${Date.now()}`;
  }


   // Convert Data URL to File
   dataURLtoFile(dataURL: string, filename: string): File | null {
    if (!dataURL) {
      return null;
    }
  
    // Validate if the string contains "base64"
    if (!dataURL.startsWith('data:') || !dataURL.includes('base64,')) {
      return null;
    }
  
    try {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)?.[1]; // Extract MIME type
      const bstr = atob(arr[1]); // Decode Base64 string
      const u8arr = new Uint8Array(bstr.length);
  
      for (let i = 0; i < bstr.length; i++) {
        u8arr[i] = bstr.charCodeAt(i);
      }
  
      return new File([u8arr], filename, { type: mime });
    } catch (error) {
      return null;
    }
  }
  


 
  deleteImage(index: number): void {
    // Remove the image from the imagePreviews array
    this.imagePreviews.splice(index, 1);
  }
  
  
  
  
  // Helper to convert Base64 to File

  
  

  private resetForm(): void {
    this.galleryForm.reset();
    this.contractFile = null;
    this.documentFile = null;
    this.bannerFile = null;
    this.imagePreviews = [];
  }

}
