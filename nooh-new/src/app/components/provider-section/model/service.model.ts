export interface service {
    id?: string | null; // Allow id to be null or undefined
    serviceNameEng: string; // Type of pet (e.g., dog, cat)
    serviceNameAra:string;
    serviceDescriptionEn: string; // Product description in English
    serviceDescriptionAr: string; // Product description in Arabic
    priceBefore: number; // Price before discount
    priceAfter: number; // Price after discount
    discount: number; // Discount percentage
    imageUrl?: string; // Add this property for the uploaded image
    // providerId: any; // Add this line to include providerId
    status:string;


  }
  

  