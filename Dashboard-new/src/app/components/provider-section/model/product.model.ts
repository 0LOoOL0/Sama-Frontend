export interface Product {
    id?: string | null; // Allow id to be null or undefined
    typeOfPet: string; // Type of pet (e.g., dog, cat)
    sCategory: string; // Subcategory
    productNameEn: string; // Product name in English
    productDescriptionEn: string; // Product description in English
    productDescriptionAr: string; // Product description in Arabic
    amount: Float32Array; // Quantity/amount
    priceBefore: Float32Array; // Price before discount
    priceAfter: Float32Array; // Price after discount
    discount: Float32Array; // Discount percentage
    imageUrl: string|File; // Add this property for the uploaded image
    productId:string;
    status:string

  }
  

  