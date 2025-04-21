import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
declare var Swal: any;

@Component({
  selector: 'sama-products',
  templateUrl: './sama-products.component.html',
  styleUrls: ['./sama-products.component.css']
})

export class SamaProductsComponent {

  showPopupProduct() {
    Swal.fire({
      title: 'Add Product',
      width: '50%',
      html: `<div class="space-y-6 p-4">
  <!-- Type of Pet -->
  <div>
    <label for="pet-type" class="block text-sm font-medium text-gray-700 mb-2">Type of Pet</label>
    <select id="pet-type" name="typeOfPet" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
      <option value="" disabled>Type of Pet</option>
      <option>Cat</option>
      <option>Dog</option>
      <option>Rabbit</option>
    </select>
  </div>

  <!-- Category -->
  <div>
    <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
    <select id="category" name="sCategory" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
      <option value="" disabled>Select category</option>
      <option>Accessory</option>
      <option>Toy</option>
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
    <button type="submit" class="w-full blue-bg text-white py-2 rounded-lg shadow hover:bg-blue-900 transition">Add Product</button>
  </div>
</div>
`,
      showConfirmButton: false,
    });
  }

  showPopupCategory() {
    Swal.fire({
        title: 'Add Category',
        width: '50%',
        html: `
        <div class="space-y-6 p-4">
            <div class="flex justify-center mb-6 relative">
              <img id="imagePreview" src="Image/cat.png" alt="Two puppies"
                class="w-32 h-32 rounded-xl" />

              <a class="absolute  top-24   rounded-full p-2" type="button"
                accept=".png, .jpg, .jpeg">
                <img src="edit-pic.png" alt="">
              </a>
            </div>

            <!-- Name -->
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input type="text" id="name" name="name" placeholder="Add name here" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>

            <!-- Total Stock -->
            <div>
                <label for="total-stock" class="block text-sm font-medium text-gray-700 mb-2">Total Stock</label>
                <input type="number" id="total-stock" name="totalStock" placeholder="0" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>

            <!-- Pet Type -->
            <div>
                <label for="pet-type" class="block text-sm font-medium text-gray-700 mb-2">Enter Pet Type</label>
                <input type="text" id="pet-type" name="pet-type" placeholder="Add Pet type here" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>

            <!-- Category -->
            <div>
                <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Enter Category</label>
                <input type="text" id="category" name="category" placeholder="Add category name here" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>

            <!-- Description -->
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea id="description" name="description" rows="3" placeholder="Enter description here" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            </div>

            <!-- Buttons -->
            <div class="flex gap-4 mt-6">
                <button type="submit" class="w-full blue-bg text-white py-2 rounded-lg shadow hover:bg-blue-900 transition">Add Category</button>
            </div>
        </div>
        `,
        showConfirmButton: false,});
      }

}