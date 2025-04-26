import { Component } from '@angular/core';
import { NavbarComponent } from '../../../user/sub-components/navbar/navbar.component';
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
  styleUrls: ['./product-details.component.css','../../../shared/css/style.css']
})
export class ProductDetailsComponent {
  
}
