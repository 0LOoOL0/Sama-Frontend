import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProviderSectionService } from '../service/provider-section.service';
import { Product } from '../model/product.model';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-provider-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './provider-product.component.html',
  styleUrls: ['./provider-product.component.css'],
})
export class ProviderProductComponent  { 
  
  ProductDetails: Product[] = [];
  tableDatas: any[] = []; 
  currentPage: number = 1; 
  itemsPerPage: number = 5;
  isFormVisible = false; 
  editingProductId: string | null = null;
  showPopup = false;
  categories: any[] = [];  
  TypePetCategories: any[] = []; 
  provider: any; 
  providerId: any; 
  isEditMode: boolean = false; 


  constructor(private providerService: ProviderSectionService, private toastr:ToastrService ) {

  }


  ngOnInit(): void {
    this.getProductByProvider()
    }

    productForm: Product = {
      typeOfPet: '',
      sCategory: '',
      productNameEn: '',
      productDescriptionEn: '',
      productDescriptionAr: '',
      amount: 10.5 as unknown as Float32Array, // Float value
      priceBefore: 100.0 as unknown as Float32Array, // Float value
      priceAfter: 90.5 as unknown as Float32Array, // Float value
      discount: 10.43 as unknown as Float32Array,// Integer value
      imageUrl: '',
      productId: '',
      status: ''
    };
    

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  isFormValid(): boolean {
    const {
      typeOfPet,
      sCategory,
      productNameEn,
      productDescriptionEn,
      productDescriptionAr,
      amount,
      priceBefore,
      priceAfter,
      discount,
    } = this.productForm;

    return (
      !!typeOfPet &&
      !!sCategory &&
      !!productNameEn &&
      !!productDescriptionEn &&
      !!productDescriptionAr &&
      typeof amount === 'number' && amount > 0 &&
      typeof priceBefore === 'number' && priceBefore > 0 &&
      typeof priceAfter === 'number' && priceAfter > 0 &&
      typeof discount === 'number' && discount >= 0
    );
  }

  callbackFunction() {
    this.isFormVisible = !this.isFormVisible;
  }
  
  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  imagePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (validFileTypes.includes(file.type)) {
        this.productForm.imageUrl = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.toastr.warning('Please select a valid image file (PNG, JPG, JPEG).', 'Try Again!', {
          timeOut: 3000, 
        });  
      }
    }
  }

  submitProduct(): void {
  
  
    this.providerId = this.providerService.getProviderId();
    if (this.providerId === null) {
      this.toastr.warning('Provider profile not found. Please submit a profile first.', 'Try Again!', {
        timeOut: 3000,
      });
      return;
    }
  
    if (this.isFormValid()) {
      const newProduct = {
        ...this.productForm,
        id: this.generateId(),
      };
  
      const formData = new FormData();
      formData.append('imageUrl', this.productForm.imageUrl);
      formData.append('newProduct', JSON.stringify(newProduct));
  
      const loader = document.getElementById('loader');
  
      if (!loader) {
        return;
      }      loader.style.display = 'block';
  
      this.providerService.AddProduct(formData, this.providerId).subscribe(
        (response) => {
          // Hide loader
          loader.style.display = 'none';
            this.toastr.success('Product successfully added.', 'Congratulations!', {
            timeOut: 3000, 
          });           this.resetForm();
          this.getProductByProvider();
        },
        (error) => {
          // Hide loader
  
          if (error.status === 422) {
            let errorMessage = 'Validation Errors:\n';
            for (const field in error.error.errors) {
              if (error.error.errors.hasOwnProperty(field)) {
                errorMessage += `${field}: ${error.error.errors[field].join(', ')}\n`;
              }
            }
            loader.style.display = 'none';

            this.toastr.error(errorMessage, 'Try Again!', { timeOut: 3000 });
          } else {
            loader.style.display = 'none';

            this.toastr.error('An error occurred while adding the product. Please check your connection.', 'Try Again!', {
              timeOut: 3000,
            });
          }
        }
      );
    } else {

      this.toastr.warning('Please fill in all required fields.', 'Try Again!', {
        timeOut: 3000,
      });
    }
  }
  
  
  
  ControlProduct(status: any): void {
    const loader = document.getElementById('loader');

  
    if (!loader) {
      return;
    }    
    loader.style.display = 'block';

    this.providerService.productToggle(status).subscribe(
      (response) => {
        loader.style.display = 'none';

        this.toastr.success('Product status has been changed successfully.', 'Congratulations!', {
          timeOut: 3000, 
        }); 
        this.getProductByProvider();
      },
      (error) => {
        this.toastr.error('Product status has not been changed.', 'Try Again!', {
          timeOut: 3000, 
        });
      }
    );
  }
  

  UpdateProduct(): void {
    this.providerId = this.providerService.getProviderId();

    if (!this.providerId) {
        this.toastr.success('Provider ID not found. Please submit a profile first.', 'Try Again!', {
          timeOut: 3000, 
        }); 
        return;
    }


    if (!this.productForm.productId) {
      
        this.toastr.error("The product has not been updated.", 'Try Again!', {
          timeOut: 3000, 
        }); 
        return;
    }

    const loader = document.getElementById('loader');

    if (this.productForm.imageUrl instanceof File) {
        const imageFile = this.productForm.imageUrl; 
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result as string;
            const updatedProduct = {
                ...this.productForm,
                image: base64Image 
            };

            const data = { data: updatedProduct };
            

            this.providerService.updateProductByProviders(this.providerId, this.productForm.productId, data)
                .subscribe(
                    (response) => {
                      if (!loader) {
                        return;
                      }    
                      loader.style.display = 'block';
                        this.toastr.success("Product updated successfully.", 'Congratulations!', {
                          timeOut: 3000, 
                        }); 
                    },
                    (error) => {
                      if (loader) {
                        loader.style.display = 'none';
                      }

                      this.toastr.error("Failed to update the product.", 'Try Again!', {
                        timeOut: 3000, 
                      });
                    }
                );
        };

        reader.onerror = (error) => {
          if (loader) {
            loader.style.display = 'none';
          }

          this.toastr.error("Failed to upload the product image.", 'Try Again!', {
            timeOut: 3000, 
          });      
          };

        reader.readAsDataURL(imageFile); 
    } else {
        const updatedProduct = { ...this.productForm };
        const data = { data: updatedProduct };

        if (!loader) {
          return;
        }    
        loader.style.display = 'block';

        this.providerService.updateProductByProviders(this.providerId, this.productForm.productId, data)
            .subscribe(
                (response) => {
                  loader.style.display = 'none';

                    this.toastr.success("Product updated successfully.", 'Congratulations!', {
                      timeOut: 3000, 
                    });   
                },
                (error) => {
                      this.toastr.error("Failed to upload the product.", 'Try Again!', {
            timeOut: 3000, 
          });  
                }
            );
    }
}


GetEditProductByProvider(productId: string | null | undefined): void {
  this.isFormVisible = true;
  this.fetchCategories();

  this.providerId = this.providerService.getProviderId();

  // Check if providerId exists
  if (!this.providerId) {
      this.toastr.warning("Profile ID not found. Please submit a profile first.", 'Try Again!', {
        timeOut: 3000, 
      });  
      return; 
  }

  const loader = document.getElementById('loader');

        if (!loader) {
          return;
        }    
        loader.style.display = 'block';
  this.providerService.EditProductByProviders(this.providerId, productId).subscribe(
      (response: any) => {
          loader.style.display = 'none';


          if (response && response.data) {
              const product = response.data; 

              this.productForm = {
                  typeOfPet: product.pet_type || '', 
                  sCategory: product.category_id || '', 
                  productNameEn: product.product_name_en || '',
                  productDescriptionEn: product.product_description_en || '',
                  productDescriptionAr: product.product_description_ar || '',
                  amount: product.quantity || 0,
                  priceBefore: product.old_price || 0,
                  priceAfter: product.new_price || 0,
                  discount: product.discount || 0,
                  imageUrl: product.image_url || '',
                  productId: product.id,
                  status:product.status||'',
              };


              this.isEditMode = true;
          } else {
            this.toastr.warning("No product data found.", 'Try Again!', {
              timeOut: 3000, 
            });              
              this.isEditMode = false; 
          }
      },
      (error) => {
        this.toastr.warning("No product data found. Checek your internet connection", 'Try Again!', {
          timeOut: 3000, 
        });             
          this.isEditMode = false; 
      }
  );
}
  

isBase64(str: string): boolean {
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
}

  resetForm(): void {
    this.productForm = {
      typeOfPet: '',
      sCategory: '',
      productNameEn: '',
      productDescriptionEn: '',
      productDescriptionAr: '',
      amount: new Float32Array([0]),
      priceBefore: new Float32Array([0]),
      priceAfter: new Float32Array([0]),
      discount: new Float32Array([0]),
      imageUrl: '',
      productId:'',
      status:'',
      
    };
    this.isFormVisible = false;
    this.editingProductId = null;
  }

  onAddMoreClick(): void {
    this.showPopup = true;
  }

  onConfirm(confirm: boolean): void {
    if (confirm) this.submitProduct();
    this.showPopup = false;
  }



  fetchCategories(): void {
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }    
    loader.style.display = 'block';
    this.providerService.getCategories(this.providerId).subscribe({
      next: (response) => {
        loader.style.display = 'none';

        this.categories = response;  
      },
      error: (error) => {
        this.toastr.error("We Can find categories please add categories first.", 'Try Again!', {
          timeOut: 3000, 
        });    
        return
      }
    });
  }




  getProductByProvider(): void {
    this.providerId = this.providerService.getProviderId();
  
    if (!this.providerId) {
      this.toastr.warning("Provider ID not found. Please submit a profile first.", 'Try Again!', {
        timeOut: 3000, 
      }); 

      return; 
    }
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }    
    loader.style.display = 'block';
  
    this.providerService.getProductByProviders(this.providerId).subscribe(
      (response: any) => {
        loader.style.display = 'none';

        if (response ) {
          this.tableDatas = response;
        } else {
          this.tableDatas = []; 
        }
      },
      (error) => {
        loader.style.display = 'none';

        this.toastr.warning("Product not found add new product.", 'Try Again!', {
          timeOut: 3000, 
        }); 
      }
    );
  }
  
  get paginatedData() {
    if (!Array.isArray(this.tableDatas)) return []; 
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.tableDatas.slice(startIndex, startIndex + this.itemsPerPage);
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
    return Array.isArray(this.tableDatas)
      ? Math.ceil(this.tableDatas.length / this.itemsPerPage)
      : 0;
  }
  




  onDeleteProduct(productId: string | null | undefined): void {
        const confirmation = confirm('Are you sure you want to delete this product?');
    
    if (confirmation) {
      if (!productId) {
        this.toastr.error("The product is not deleted.", 'Try Again!', {
          timeOut: 3000, 
        }); 
        return;
      }

      this.providerId = this.providerService.getProviderId();
    
    if (this.providerId === null) {
      this.toastr.warning("Provider ID not found. Please submit a profile first.", 'Try Again!', {
        timeOut: 3000, 
      });
      return; 
    }
        this.providerService.DeleteProductByProviders(this.providerId, productId).subscribe(
        (response) => {
          this.tableDatas = this.tableDatas.filter(product => product.id !== productId);
          this.toastr.success("Product deleted successfully", 'Congratulations!', {
            timeOut: 3000, 
          }); 
        },
        (error) => {
          this.toastr.success("Product has not been deleted", 'Try Again!', {
            timeOut: 3000, 
          }); 
          
        }
      );
    }
  }
  

  deleteAllProducts(): void {
    const confirmation = confirm('Are you sure you want to delete all products?');

    
    if (confirmation) {

      this.providerId = this.providerService.getProviderId();
    
    if (this.providerId === null) {
    
        this.toastr.warning("Provider ID not found. Please submit a profile first.", 'Try Again!', {
          timeOut: 3000, 
        });      return; 
    }
    this.providerService.DeleteAllProductByProvider(this.providerId).subscribe(
      (response) => {
        this.toastr.success("All Product deleted successfully", 'Congratulations!', {
          timeOut: 3000, 
        });
        this.getProductByProvider()
      },
      (error) => {
        this.toastr.error("All Product has not been deleted", 'Try Again!', {
          timeOut: 3000, 
        }); 
      }
    );
  }
}



  





  searchTerm: string = ''; 
  onSearch(): void {
    if (this.searchTerm.trim()) {
      // Filter products based on name and description
      this.tableDatas = this.tableDatas.filter((product) =>
        product.productNameEn.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        product.productDescriptionEn.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.productDescriptionAr.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.getProductByProvider();
    }
  }

 
  



    // Function to download data as CSV
    downloadTableData(): void {
      const csvData = this.convertToCSV(this.tableDatas);
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
  
    // Helper function to convert data to CSV format
    private convertToCSV(data: Product[]): string {
      const header = [
        'Type of Pet',
        'Sub Category',
        'Product Name (EN)',
        'Description (EN)',
        'Description (AR)',
        'Amount',
        'Price Before',
        'Price After',
        'Discount',
        'Image URL',
      ];
      const rows = data.map((product) => [
        product.typeOfPet,
        product.sCategory,
        product.productNameEn,
        product.productDescriptionEn,
        product.productDescriptionAr,
        product.amount,
        product.priceBefore,
        product.priceAfter,
        product.discount,
        product.imageUrl,
      ]);
  
      const csvContent = [
        header.join(','), // Add header row
        ...rows.map((row) => row.join(',')), // Add data rows
      ].join('\n');
  
      return csvContent;
    }




    //import data 
    
    @ViewChild('fileInput', { static: false }) fileInput!: ElementRef; // Reference to file input element

  // Function to trigger file input
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Handle file import
  onFileImport(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const csvData = e.target.result;
        this.parseCSVData(csvData);
      };
      reader.readAsText(file);
    }
  }

 // Parse CSV data and save to database
 private parseCSVData(csvData: string): void {
  const rows = csvData.split('\n'); // Split data into rows
  const parsedData: Product[] = [];

  rows.forEach((row, index) => {
    if (index === 0) return; // Skip header row

    const columns = row.split(','); // Split row into columns
    if (columns.length >= 12) {
      const product: Product = {
        typeOfPet: columns[0]?.trim(),
        sCategory: columns[1]?.trim(),
        productNameEn: columns[2]?.trim(),
        productDescriptionEn: columns[3]?.trim(),
        productDescriptionAr: columns[4]?.trim(),
        amount: new Float32Array([parseFloat(columns[5]?.trim()) || 0]),
        priceBefore: new Float32Array([parseFloat(columns[6]?.trim()) || 0]),
        priceAfter: new Float32Array([parseFloat(columns[7]?.trim()) || 0]),
        discount: new Float32Array([parseFloat(columns[8]?.trim()) || 0]),
        imageUrl: columns[9]?.trim(),
        productId: columns[10]?.trim() || '',// Allow null if productId is missing
        status:columns[11]?.trim()||''
      };
      parsedData.push(product);
    }
  });

  if (parsedData.length > 0) {
    let productCount = 0; // To keep track of the number of products sent

    const sendProduct = (product: Product) => {
      const newProduct = {
        typeOfPet: product.typeOfPet,
        sCategory: product.sCategory,
        productNameEn: product.productNameEn,
        productDescriptionEn: product.productDescriptionEn,
        productDescriptionAr: product.productDescriptionAr,
        amount: product.amount,
        priceBefore: product.priceBefore,
        priceAfter: product.priceAfter,
        discount: product.discount,
        imageUrl: product.imageUrl,
        productId: product.productId // Upload even if productId is null
      };
      const data = {newProduct:newProduct}

      

      this.providerService.AddProduct(data, this.providerId).subscribe(
        (response) => {
          this.getProductByProvider()
          productCount++;
          if (productCount < parsedData.length) {
            sendProduct(parsedData[productCount]); 
            this.getProductByProvider()
          } else {
            this.toastr.success("All products have been successfully  uploaded", 'Congratulations!', {
              timeOut: 3000, 
            });
          }
        },
        (error) => {
          this.toastr.error("All products have not been uploaded", 'Try Again!', {
            timeOut: 3000, 
          }); 
        }
      );
    };

    // Start sending the first product
    sendProduct(parsedData[productCount]);
  } else {
    this.toastr.warning("No valid data found in the CSV file.", 'Try Again!', {
      timeOut: 3000, 
    });  }
}


}
