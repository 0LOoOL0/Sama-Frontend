import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { providerCategory } from '../model/category.model';
import { ToastrService } from 'ngx-toastr';
import { ProviderSectionService } from '../service/provider-section.service';

@Component({
  selector: 'app-provider-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './provider-category.component.html',
  styleUrl: './provider-category.component.css'
})
export class ProviderCategoryComponent {

  tableData: providerCategory[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  isFormVisible = false;
  isEditMode = false;
  editingProductId: string | null = null;
  providerId: any; // Store the providerId

  category:any={};
  showPopup = false;
  // searchTerm: string = '';
  constructor(private providerService: ProviderSectionService, private toastr:ToastrService) {

  }



  ngOnInit(): void {
    this.fetchCategories();
  }
  

  
  fetchCategories(): void {
  
 
    this.providerId = this.providerService.getProviderId();

    if (!this.providerId) {

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
  
    this.providerService.getCategories(this.providerId).subscribe({
      next: (response) => {
        loader.style.display = 'none';

        if (response && response.length > 0) {
          this.tableData = response; 
        } else {
          this.toastr.warning('No categories found for the given provider..', 'Add new categories!', {
            timeOut: 3000, 
          });  
          this.tableData = []; 
          return

        }
      },
      error: (error) => {
        this.toastr.error('The categories is not fetching, internet connection lost:', 'Try Again', {
          timeOut: 3000, 
        });  
      },
    });
  }
  
 formData: providerCategory = {
  name: '',
  total_stock: 0,
  selected_subcategory:'',
  selected_category	: '',
  description: '',
  totalsold:0,
  imageUrl:'',
  image_url	:'',
  provider_id: [], 
  status:'',
};


  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  onSubmit(): void {
    this.isFormVisible = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (validFileTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const imgElement = document.getElementById('imagePreview') as HTMLImageElement;
          imgElement.src = e.target.result;
          // Update imageUrl in formData
          this.formData.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file (PNG, JPG, JPEG).');
      }
    }
  }
  
  isFormValid(): boolean {
    const {
      name,
      total_stock,
      selected_category	,
      description,
      imageUrl,
     
    } = this.formData;

    return (
      !!name &&
      total_stock > 0 &&
      !!selected_category	  &&
      !!description &&
      !!imageUrl 
   
    );
  }

  callbackFunction() {
    this.isFormVisible = !this.isFormVisible;
  }
  
  submitProduct(): void {
    this.providerId = this.providerService.getProviderId();
  
    if (!this.providerId) {
      this.toastr.warning('No categories found for the given provider..', 'Add new categories!', {
        timeOut: 3000, 
      });  
      return
    }
   
      const newProduct = {
      ...this.formData,
      id: this.generateId(),
      provider_id: this.providerId,
    };
  
    const categoryRequest = {
      category: newProduct,
      provider_data: { profileId: this.providerId }, 
    };
  
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }    
    loader.style.display = 'block';
  
    this.providerService.uploadCategory(categoryRequest).subscribe({
      
      next: (response) => {
        loader.style.display = 'none';

        this.toastr.success('Category added successfully!','Congratulations',{
          timeOut: 3000, 
        });  
        this.resetForm();
        this.fetchCategories();

      },
      error: (error) => {
        if (error.status === 422) {
          this.toastr.error('Please put the valid data:', 'Try Again', {
            timeOut: 3000, 
          });          
        } else {
          this.toastr.error('The categories is not uploaded, internet connection lost:', 'Try Again', {
            timeOut: 3000, 
          });  
        }
      },
    });
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  


  

  resetForm(): void {
    this.formData = {
      selected_subcategory:'',
     name:'',
     total_stock:0,
     selected_category	:'',
     description:'',
      imageUrl: '',
      image_url	:'',
      provider_id:'',
      status:'',
      
    };
    this.isFormVisible = false;
    this.isEditMode = false;
    this.editingProductId = null;

  }

  onAddMoreClick(): void {
    this.showPopup = true;
  }

  onConfirm(confirm: boolean): void {
    if (confirm) this.submitProduct();
    this.showPopup = false;
  }

 

  ControlCategory(id: any): void {
    console.log(id)
    this.providerService.categoryToggle(id).subscribe(
      (response) => {
        this.toastr.success('The category status has been changed successfuly', 'Congratulations!', {
          timeOut: 3000, 
        });          this.fetchCategories()

      },
      (error) => {
        this.toastr.success('The category status has not been changed', 'Try Again', {
          timeOut: 3000, 
        });        }
    );
  }

  

get paginatedData() {
  if (!this.tableData || this.tableData.length === 0) {
    return []; 
  }

  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.tableData.slice(startIndex, endIndex);
}

goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

get totalPages() {
  if (!this.tableData || this.tableData.length === 0) {
    return 0; 
  }
  return Math.ceil(this.tableData.length / this.itemsPerPage);
}





  onDeleteProduct(productId: string | null | undefined): void {
    console.log('Product ID:', productId);  
    const confirmation = confirm('Are you sure you want to delete this product?');
    
    if (confirmation) {
      if (!productId) {
        this.toastr.error('The category is not deleted', 'Try again!', {
          timeOut: 3000, 
        });     
        return;     
    }        
      
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }    
    loader.style.display = 'block';
      this.providerService.deleteCategory(productId).subscribe(
        (response) => {
          loader.style.display = 'none';

          this.fetchCategories();

          if (response && response.message === 'Product Category deleted successfully') {
            this.tableData = this.tableData.filter(product => product.id !== productId);
            

            this.toastr.success('The category is deleted', 'Congratulations!', {
              timeOut: 3000, 
            });  
                        
          } else {

            this.toastr.error('The category is not deleted', 'Try again!', {
              timeOut: 3000, 
            });            }
        },
        (error) => {
        
          this.toastr.error('The category is deleted check internet connection', 'Try again!', {
            timeOut: 3000, 
          });  
        }
      );
    }
  }
  
  hasCategoryData: boolean = false; 
  onEditProduct(productId: any): void {
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }    
    loader.style.display = 'block';
 
    this.providerService.getEditCategories(productId).subscribe(
      (response: any) => {
        loader.style.display = 'none';

        this.hasCategoryData = true; 
        this.formData = {
          name: response.name || '',
          total_stock: response.total_stock || 0,
          selected_subcategory: response.selected_subcategory || '',
          selected_category: response.selected_category || '',
          description: response.description || '',
          totalsold: response.total_sold || 0,
          imageUrl: response.image_url || '',
          image_url: response.image_url || '',
          provider_id:response.provider_id||'',
          id: response.id || '', // Ensure the id is correctly populated
          status:response.status ||''

  
        };
  
        this.providerId = response.provider_id || null;
        this.editingProductId = response.id || null;
        this.isEditMode = true;
        this.isFormVisible = true;
  
      },
      (error) => {
        this.toastr.error('Failed to fetch product details. Please try again.', 'Try again!', {
          timeOut: 3000, 
        });       
      }
    );
  }
  

  deleteAllProducts(): void {
    const confirmation = confirm('Are you sure you want to delete all category?');

    
    if (confirmation) {

      this.providerId = this.providerService.getProviderId();
    
    if (this.providerId === null) {

      this.toastr.warning('Profile ID not found. Please submit a profile first.', 'Try again!', {
        timeOut: 3000, 
      });   
      
      return; 
    }
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }    
    loader.style.display = 'block';
    this.providerService.deleteAllCategory(this.providerId).subscribe(
      (response) => {
        loader.style.display = 'none';

        this.toastr.success('All categories deleted successfully!.', 'Congratulations!', {
          timeOut: 3000, 
        });
        this.fetchCategories()
      },
      (error) => {
        this.toastr.warning('An error occurred while deleting the product!.', 'Try Again', {
          timeOut: 3000, 
        });
     
      }
    );
    
 
  }
}
  



 
  submitEditProduct(): void {  
    if (!this.isFormValid()) {
      alert('');
      this.toastr.warning('Please fill in all required fields.', 'Try Again', {
        timeOut: 3000, 
      });
      return;
    }
  
    const updatedProduct:any = {
      name: this.formData.name || '',
      total_stock: this.formData.total_stock || 0,
      selected_subcategory: this.formData.selected_subcategory || '',
      selected_category: this.formData.selected_category || '',
      description: this.formData.description || '',
      totalsold: this.formData.totalsold || 0,
      provider_id: this.formData.provider_id || '',
      image: this.formData.imageUrl || '', 
    };
  
const updateCategory:any = {data:updatedProduct}
const loader = document.getElementById('loader');

if (!loader) {
  return;
}    
loader.style.display = 'block';
    this.providerService.updateCategories(this.editingProductId, updateCategory).subscribe({
      next: (response) => {
        loader.style.display = 'none';

        this.toastr.success('Category updated successfully!', 'Congratulations', {
          timeOut: 3000, 
        });       
        this.resetForm();
        this.fetchCategories(); 
      },
      error: (error) => {
        this.toastr.error('Failed to update category.', 'Please try again.', {
          timeOut: 3000, 
        });        
      },
    });
  }
  
  searchTerm: string = ''; 
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.tableData = this.tableData.filter((product) =>
        (product.name?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
        (product.description?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.fetchCategories();
      
    }
  }
  

     // Function to download data as CSV
    downloadTableData(): void {
      const csvData = this.convertToCSV(this.tableData);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'Category_data.csv');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  
  
      // Helper function to convert data to CSV format
      private convertToCSV(data: providerCategory[]): string {
        const header = [
          'Name',
          'Total Stock',
          'Selected Category',
          'Selected Sub Category',
          'Description',
          'Image URL',
        ];
        const rows = data.map((product) => [
          product.name,
          product.total_stock,
          product.selected_category	,
          product.description,
          product.totalsold,
          product.image_url,
        ]);
    
        const csvContent = [
          header.join(','), // Add header row
          ...rows.map((row) => row.join(',')), // Add data rows
        ].join('\n');
    
        return csvContent;
      }




    
    @ViewChild('fileInput', { static: false }) fileInput!: ElementRef; // Reference to file input element

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

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
  

  private parseCSVData(csvData: string): void {
 
  
    const rows = csvData.split('\n').map(row => row.trim());
    const parsedData: any[] = []; 
  
    rows.forEach((row, index) => {
      if (index === 0) return; 
      
      const columns = row.split(',');
      if (columns.length >= 6) { 
        const provider = {
          name: columns[0]?.trim(),
          total_stock: columns[1]?.trim(),
          selected_category: columns[2]?.trim(),
          selected_subcategory: columns[3]?.trim(),
          description: columns[4]?.trim(),
          imageUrl: columns[5]?.trim() || null,
        
         
        };
  
        parsedData.push(provider); 
      }
    });
  
  
    let providerCount = 0;
  
    const sendProvider = (provider: any) => {
 
    
      this.providerId = this.providerService.getProviderId();
      if (!this.providerId) {
        this.toastr.warning('Profile ID not found. Please submit a profile first', 'Please try again.', {
          timeOut: 3000, 
        });   
        return;
      }
      const providerObject = {
        category: provider,
        provider_data: { profileId: this.providerId }, 

      };
      const loader = document.getElementById('loader');

      if (!loader) {
        return;
      }    
      loader.style.display = 'block';
      this.providerService.uploadCategory(providerObject).subscribe(
        (response) => {
          loader.style.display = 'none';

          this.fetchCategories()
          providerCount++;
          if (providerCount < parsedData.length) {
            sendProvider(parsedData[providerCount]);
          } else {
            this.toastr.success('All catgories have been successfully uploaded', 'Congratulations!', {
              timeOut: 3000, 
            });            
          }
        },
        (error) => {
          this.toastr.error('All catgories have been feild to sent uploaded!', 'Please try again.', {
            timeOut: 3000, 
          });
        }
      );
    };
  
    sendProvider(parsedData[providerCount]);
  }
  


}

