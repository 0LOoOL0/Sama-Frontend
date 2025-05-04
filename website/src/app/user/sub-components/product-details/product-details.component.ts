import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule, Location } from '@angular/common';
import { AllProviderService } from '../../../services/all-provider.service';
import { FormsModule } from '@angular/forms';


export interface Product {
  id: number;
  image: string;
  new_price: number;
  old_price: number;
  percentage: number;
  pet_type: string | null;
  provider_id: number;
  service_image_url: string | null;
  short_description: string;
  short_description_ar: string;
  status: string;
  title: string;
  title_ar: string;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule,FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  
  
  product: any;

    productss: Product[] =[];
  

  constructor(private route:ActivatedRoute, private productService: ProductService, private location: Location,private getAllService: AllProviderService){}
  ngOnInit(): void {
    this.getProductDetails();
    this.GetServiceByDetails()
   
  
  }

  getProductDetails(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(!id){
      this.location.back();
    }
    this.productService.getProductById(id).toPromise().then((data: any) => {
      this.product = data;
      console.log('product Details',this.product);
        // Map response to Product interface
        this.productss = this.product.map((product: any) => ({
          id: product.id,
          image: product.image_url || 'assets/default-image.png',
          new_price: product.new_price,
          old_price: product.old_price,
          percentage: product.discount || 0, // Default value if percentage is null
          pet_type: product.pet_type,
          provider_id: product.provider_id,
          service_image_url: product.image_url, // Assuming service_image_url uses the same value as image_url
          short_description: product.product_description_en,
          short_description_ar: product.product_description_ar,
          status: product.status,
          title: product.product_name_en,
          title_ar: product.product_name_ar || '', // Default empty if null
        }));
    }).catch((error: any) => {
      console.error('Error fetching product details', error);
    });
  }


  GetServiceByDetails(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(!id){
      this.location.back();
    }
    this.getAllService.GetServicebyId(id).toPromise().then((data: any) => {
      this.product = data;
      console.log('service Details',this.product);
    }).catch((error: any) => {
      console.error('Error fetching product details', error);
    });
  }

  
}
