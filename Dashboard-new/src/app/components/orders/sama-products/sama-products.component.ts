import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SamastoreService } from '../services/samastore.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
declare var Swal: any;

@Component({
  selector: 'sama-products',
  standalone: true, // if standalone
  imports: [CommonModule],
  templateUrl: './sama-products.component.html',
  styleUrls: ['./sama-products.component.css']
})

export class SamaProductsComponent {

  // This will hold the product categories fetched from the backend.
  productCategories: any[] = [];

  // This property will be used in the template to populate the product table.
  products: any[] = [];

  constructor(private samastoreService: SamastoreService) {}

  ngOnInit(): void {
    // Fetch product categories when the component initializes.
    this.samastoreService.getProductCategories().subscribe(
      (data: any[]) => {
        this.productCategories = data;
        console.log('Fetched product categories:', data);
      },
      (error) => {
        console.error('Error fetching product categories', error);
      }
    );

     // Fetch products for the table.
     this.samastoreService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        console.log('Fetched products:', data);
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  showPopupProduct() {
    // Build dynamic options for the category select.
    const categoryOptions = this.productCategories
      .map(cat => `<option value="${cat.id}">${cat.name}</option>`)
      .join('');

    Swal.fire({
      title: 'Add Product',
      width: '50%',
      html: `<div class="space-y-6 p-4">
  <!-- Type of Pet -->
  <div>
    <label for="pet-type" class="block text-sm font-medium text-gray-700 mb-2">Type of Pet</label>
    <select id="pet-type" name="typeOfPet" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
      <option value="" disabled>Type of Pet</option>
      <option value="Cat">Cat</option>
  <option value="Dog">Dog</option>
  <option value="Rabbit">Rabbit</option>
    </select>
  </div>

  <!-- Category (dynamically populated) -->
  <div>
    <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
    <select id="category" name="sCategory" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
      <option value="" disabled>Select category</option>
      ${categoryOptions}
    </select>
  </div>

  <!-- Product Name -->
  <div class="flex gap-4">
    <!-- Product Name (En) -->
    <div class="flex-1">
      <label for="product-name-en" class="block text-sm font-medium text-gray-700 mb-2">Product Name (En)</label>
      <input type="text" id="product-name-en" name="productNameEn" placeholder="Product name in English" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
    </div>

    <!-- Product Name (AR) -->
    <div class="flex-1">
      <label for="product-name-ar" class="block text-sm font-medium text-gray-700 mb-2">Product Name (AR)</label>
      <input type="text" id="product-name-ar" name="productNameAr" placeholder="Product name in Arabic" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
    </div>
  </div>

  <!-- Product Descriptions -->
  <div class="flex gap-4">
    <!-- Product Description (En) -->
    <div class="flex-1">
      <label for="product-description-en" class="block text-sm font-medium text-gray-700 mb-2">Product Description (En):</label>
      <textarea id="product-description-en" name="productDescriptionEn" rows="3" required placeholder="Product description in English" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
    </div>

    <!-- Product Description (AR) -->
    <div class="flex-1">
      <label for="product-description-ar" class="block text-sm font-medium text-gray-700 mb-2">Product Description (AR):</label>
      <textarea id="product-description-ar" name="productDescriptionAr" rows="3" placeholder="Product description in Arabic" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
    </div>
  </div>

  <!-- Price Before and After -->
  <div class="flex gap-4">
    <div class="flex-1">
      <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
      <input type="number" id="quantity" name="quantity" placeholder=" Quantity" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
    </div>
    <div class="flex-1">
      <label for="price-before" class="block text-sm font-medium text-gray-700 mb-2">Price Before</label>
      <input type="number" id="price-before" name="priceBefore" placeholder=" Price" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" />
    </div>
    <div class="flex-1">
      <label for="price-after" class="block text-sm font-medium text-gray-700 mb-2">Price After</label>
      <input type="number" id="price-after" name="priceAfter" placeholder=" Price" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
    </div>
    <div class="flex-1">
      <label for="discount" class="block text-sm font-medium text-gray-700 mb-2">Discount%</label>
      <input type="number" required id="discount" name="discount" placeholder=" Discount" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
    </div>
  </div>

  <!-- Buttons -->
  <div class="flex gap-4 mt-6">
    <button id="submitProduct" type="submit" class="w-full blue-bg text-white py-2 rounded-lg shadow hover:bg-blue-900 transition">Add Product</button>
  </div>
</div>
`,
      showConfirmButton: false,
      didOpen: () => {
        const submitBtn = Swal.getPopup()?.querySelector('#submitProduct');
        if (submitBtn) {
          submitBtn.addEventListener('click', () => {
            // Collect values from the popup fields.
            const typeOfPet = (Swal.getPopup()?.querySelector('#pet-type') as HTMLSelectElement)?.value;
            const category = (Swal.getPopup()?.querySelector('#category') as HTMLSelectElement)?.value;
            const productNameEn = (Swal.getPopup()?.querySelector('#product-name-en') as HTMLInputElement)?.value;
            const productNameAr = (Swal.getPopup()?.querySelector('#product-name-ar') as HTMLInputElement)?.value;
            const productDescriptionEn = (Swal.getPopup()?.querySelector('#product-description-en') as HTMLTextAreaElement)?.value;
            const productDescriptionAr = (Swal.getPopup()?.querySelector('#product-description-ar') as HTMLTextAreaElement)?.value;
            const quantity = (Swal.getPopup()?.querySelector('#quantity') as HTMLInputElement)?.value;
            const priceBefore = (Swal.getPopup()?.querySelector('#price-before') as HTMLInputElement)?.value;
            const priceAfter = (Swal.getPopup()?.querySelector('#price-after') as HTMLInputElement)?.value;
            const discount = (Swal.getPopup()?.querySelector('#discount') as HTMLInputElement)?.value;
            
            console.log('Admin Product Form Values:', { typeOfPet, category, productNameEn, productNameAr, productDescriptionEn, productDescriptionAr, quantity, priceBefore, priceAfter, discount });
            
            if (!typeOfPet || !category || !productNameEn || !productNameAr || !productDescriptionEn || !quantity || !priceBefore || !priceAfter || !discount) {
              Swal.showValidationMessage('Please fill in all required fields');
              console.error('Validation failed: one or more fields are empty.');
              return;
            }
            
            // Build payload – note that we store category_id from the selected category.
            const productData = {
              pet_type: typeOfPet,
              category_id: parseInt(category, 10),
              product_name_en: productNameEn,
              product_name_ar: productNameAr,
              product_description_en: productDescriptionEn,
              product_description_ar: productDescriptionAr,
              quantity: parseInt(quantity, 10),
              price_before: parseFloat(priceBefore),
              price_after: parseFloat(priceAfter),
              discount: parseFloat(discount)
            };

            const providerData = { profileId: this.samastoreService.providerId };
            console.log('Submitting Admin Product with payload:', { productData, providerData });
            
            // Call the admin product method in the service.
            this.samastoreService.storeProductAdminDashboard(productData, providerData)
              .subscribe(
                (response: any) => {
                  console.log('Admin Product added successfully:', response);
                  Swal.fire('Success', 'Product added successfully!', 'success');
                },
                (error: any) => {
                  console.error('Error adding admin product:', error);
                  Swal.fire('Error', 'Failed to add product.', 'error');
                }
              );
          });
        }
      }
    });
  }

  showPopupCategory() {
    console.log('Opening Add Admin Category popup...');
    Swal.fire({
      title: 'Add Category (Admin Dashboard)',
      width: '50%',
      html: `
      <div class="space-y-6 p-4">
          <div class="flex justify-center mb-6 relative">
            <img id="imagePreview" src="Image/cat.png" alt="Category Image" class="w-32 h-32 rounded-xl" />
            <a class="absolute top-24 rounded-full p-2" type="button" accept=".png, .jpg, .jpeg">
              <img src="edit-pic.png" alt="">
            </a>
          </div>
          <!-- Name (only this is needed) -->
          <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" id="name" name="name" placeholder="Add name here" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <!-- Total Stock -->
          <div>
              <label for="total-stock" class="block text-sm font-medium text-gray-700 mb-2">Total Stock</label>
              <input type="number" id="total-stock" name="totalStock" placeholder="0" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <!-- Pet Type -->
          <div>
              <label for="pet-type" class="block text-sm font-medium text-gray-700 mb-2">Enter Pet Type</label>
              <input type="text" id="pet-type" name="pet-type" placeholder="Add Pet type here" required
                     class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <!-- Description -->
          <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea id="description" name="description" rows="3" placeholder="Enter description here" required
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
          </div>
          <!-- (Extra "Enter Category" field is omitted) -->
          <!-- Buttons -->
          <div class="flex gap-4 mt-6">
              <button id="submitAdminCategory" type="button"
                      class="w-full blue-bg text-white py-2 rounded-lg shadow hover:bg-blue-900 transition">
                Add Category
              </button>
          </div>
      </div>
      `,
      showConfirmButton: false,
      didOpen: () => {
        const submitBtn = Swal.getPopup()?.querySelector('#submitAdminCategory');
        if (submitBtn) {
          submitBtn.addEventListener('click', () => {
            const name = (Swal.getPopup()?.querySelector('#name') as HTMLInputElement)?.value;
            const totalStock = (Swal.getPopup()?.querySelector('#total-stock') as HTMLInputElement)?.value;
            const petType = (Swal.getPopup()?.querySelector('#pet-type') as HTMLInputElement)?.value;
            const description = (Swal.getPopup()?.querySelector('#description') as HTMLTextAreaElement)?.value;
            
            console.log('Admin Category Form Values:', { name, totalStock, petType, description });
            
            if (!name || !totalStock || !petType || !description) {
              Swal.showValidationMessage('Please fill in all required fields');
              console.error('Validation failed: one or more fields are empty.');
              return;
            }
            
            const categoryData = {
              name: name,
              total_stock: parseInt(totalStock, 10),
              selected_subcategory: petType, // mapping pet type as subcategory
              description: description,
              imageUrl: '' // Adjust if you plan to handle image uploads
            };

            // Retrieve provider ID from the service via its getter
            const providerData = { profileId: this.samastoreService.providerId };
            console.log('Submitting Admin Category with payload:', { categoryData, providerData });
            
            // Call the new admin method.
            this.samastoreService.storeProductCategoryAdminDashboard(categoryData, providerData)
              .subscribe(
                (response: any) => {
                  console.log('Admin Category added successfully:', response);
                  Swal.fire('Success', 'Category added successfully!', 'success');
                },
                (error: any) => {
                  console.error('Error adding admin category:', error);
                  Swal.fire('Error', 'Failed to add category.', 'error');
                }
              );
          });
        }
      }
    });
  }

  // Method to open the edit popup. When clicking the edit icon in the table, this method is called.
  editProduct(product: any) {
    console.log('Editing product:', product);
  
    // Build dynamic options for the category select.
    const categoryOptions = this.productCategories
      .map(cat => {
        // Compare using Number() conversion to ensure type matching.
        return `<option value="${cat.id}" ${product.category_id && Number(product.category_id) === cat.id ? 'selected' : ''}>${cat.name}</option>`;
      })
      .join('');
  
    Swal.fire({
      title: 'Update Product (Admin Dashboard)',
      width: '50%',
      html: `<div class="space-y-6 p-4">
    <!-- Type of Pet -->
    <div>
      <label for="pet-type" class="block text-sm font-medium text-gray-700 mb-2">Type of Pet</label>
      <select id="pet-type" name="typeOfPet" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
        <option value="" disabled>Type of Pet</option>
        <option value="Cat" ${product.pet_type && product.pet_type.toLowerCase() === 'cat' ? 'selected' : ''}>Cat</option>
        <option value="Dog" ${product.pet_type && product.pet_type.toLowerCase() === 'dog' ? 'selected' : ''}>Dog</option>
        <option value="Rabbit" ${product.pet_type && product.pet_type.toLowerCase() === 'rabbit' ? 'selected' : ''}>Rabbit</option>
      </select>
    </div>
  
    <!-- Category (dynamically populated) -->
    <div>
      <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
      <select id="category" name="sCategory" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
        <option value="" disabled>Select category</option>
        ${categoryOptions}
      </select>
    </div>
  
    <!-- Product Name -->
    <div class="flex gap-4">
      <!-- Product Name (En) -->
      <div class="flex-1">
        <label for="product-name-en" class="block text-sm font-medium text-gray-700 mb-2">Product Name (En)</label>
        <input type="text" id="product-name-en" name="productNameEn" value="${product.product_name_en}" placeholder="Product name in English" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
      </div>
  
      <!-- Product Name (AR) -->
      <div class="flex-1">
        <label for="product-name-ar" class="block text-sm font-medium text-gray-700 mb-2">Product Name (AR)</label>
        <input type="text" id="product-name-ar" name="productNameAr" value="${product.product_name_ar}" placeholder="Product name in Arabic" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
      </div>
    </div>
  
    <!-- Product Descriptions -->
    <div class="flex gap-4">
      <!-- Product Description (En) -->
      <div class="flex-1">
        <label for="product-description-en" class="block text-sm font-medium text-gray-700 mb-2">Product Description (En):</label>
        <textarea id="product-description-en" name="productDescriptionEn" rows="3" required placeholder="Product description in English" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">${product.product_description_en}</textarea>
      </div>
  
      <!-- Product Description (AR) -->
      <div class="flex-1">
        <label for="product-description-ar" class="block text-sm font-medium text-gray-700 mb-2">Product Description (AR):</label>
        <textarea id="product-description-ar" name="productDescriptionAr" rows="3" placeholder="Product description in Arabic" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">${product.product_description_ar}</textarea>
      </div>
    </div>
  
    <!-- Price Before and After -->
    <div class="flex gap-4">
      <div class="flex-1">
        <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
        <input type="number" id="quantity" name="quantity" value="${product.quantity}" placeholder=" Quantity" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
      </div>
      <div class="flex-1">
        <label for="price-before" class="block text-sm font-medium text-gray-700 mb-2">Price Before</label>
        <input type="number" id="price-before" name="priceBefore" value="${product.price_before}" placeholder=" Price" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" />
      </div>
      <div class="flex-1">
        <label for="price-after" class="block text-sm font-medium text-gray-700 mb-2">Price After</label>
        <input type="number" id="price-after" name="priceAfter" value="${product.price}" placeholder=" Price" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div class="flex-1">
        <label for="discount" class="block text-sm font-medium text-gray-700 mb-2">Discount%</label>
        <input type="number" required id="discount" name="discount" value="${product.discount}" placeholder=" Discount" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
      </div>
    </div>
  
    <!-- Buttons -->
    <div class="flex gap-4 mt-6">
      <button id="updateProduct" type="submit" class="w-full blue-bg text-white py-2 rounded-lg shadow hover:bg-blue-900 transition">Update Product</button>
    </div>
  </div>
  `,
      showConfirmButton: false,
      
      didOpen: () => {

        const petSelect = Swal.getPopup()?.querySelector('#pet-type') as HTMLSelectElement;
        if (petSelect) {
          petSelect.addEventListener('change', () => {
            console.log('Pet type changed to:', petSelect.value);
          })};
        const updateBtn = Swal.getPopup()?.querySelector('#updateProduct');
        if (updateBtn) {
          updateBtn.addEventListener('click', () => {
            const typeOfPet = (Swal.getPopup()?.querySelector('#pet-type') as HTMLSelectElement)?.value;
            const category = (Swal.getPopup()?.querySelector('#category') as HTMLSelectElement)?.value;
            const productNameEn = (Swal.getPopup()?.querySelector('#product-name-en') as HTMLInputElement)?.value;
            const productNameAr = (Swal.getPopup()?.querySelector('#product-name-ar') as HTMLInputElement)?.value;
            const productDescriptionEn = (Swal.getPopup()?.querySelector('#product-description-en') as HTMLTextAreaElement)?.value;
            const productDescriptionAr = (Swal.getPopup()?.querySelector('#product-description-ar') as HTMLTextAreaElement)?.value;
            const quantity = (Swal.getPopup()?.querySelector('#quantity') as HTMLInputElement)?.value;
            const priceBefore = (Swal.getPopup()?.querySelector('#price-before') as HTMLInputElement)?.value;
            const priceAfter = (Swal.getPopup()?.querySelector('#price-after') as HTMLInputElement)?.value;
            const discount = (Swal.getPopup()?.querySelector('#discount') as HTMLInputElement)?.value;
            
            console.log('Updated Admin Product Form Values:', { typeOfPet, category, productNameEn, productNameAr, productDescriptionEn, productDescriptionAr, quantity, priceBefore, priceAfter, discount });
            
            if (!typeOfPet || !category || !productNameEn || !productNameAr || !productDescriptionEn || !quantity || !priceBefore || !priceAfter || !discount) {
              Swal.showValidationMessage('Please fill in all required fields');
              console.error('Validation failed: one or more fields are empty.');
              return;
            }
            
            const productData = {
              pet_type: typeOfPet,
              category_id: parseInt(category, 10),
              product_name_en: productNameEn,
              product_name_ar: productNameAr,
              product_description_en: productDescriptionEn,
              product_description_ar: productDescriptionAr,
              quantity: parseInt(quantity, 10),
              price_before: parseFloat(priceBefore),
              price_after: parseFloat(priceAfter),
              discount: parseFloat(discount)
            };
  
            const providerData = { profileId: this.samastoreService.providerId };
            console.log('Submitting updated product with payload:', { productData, providerData });
            
            this.samastoreService.updateProductAdminDashboard(productData, product.id, providerData)
              .subscribe(
                (response: any) => {
                  console.log('Admin Product updated successfully:', response);
                  Swal.fire('Success', 'Product updated successfully!', 'success');
                  // Optionally refresh the product list.
                  this.ngOnInit();
                },
                (error: any) => {
                  console.error('Error updating admin product:', error);
                  Swal.fire('Error', 'Failed to update product.', 'error');
                }
              );
          });
        }
      }
    });
  }
  

  deleteProduct(productId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the product!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        const providerData = { profileId: this.samastoreService.providerId };
        this.samastoreService.deleteProductAdminDashboard(productId, providerData)
          .subscribe(
            (response: any) => {
              console.log('Product deleted successfully:', response);
              Swal.fire('Deleted!', 'Product has been deleted.', 'success');
              this.ngOnInit(); // Refresh product list
            },
            (error: any) => {
              console.error('Error deleting product:', error);
              Swal.fire('Error', 'Failed to delete product.', 'error');
            }
          );
      }
    });
  }
  

}