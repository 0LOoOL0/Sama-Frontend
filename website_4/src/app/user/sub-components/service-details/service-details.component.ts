import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AllProviderService } from '../../../services/all-provider.service';
import { ProductService } from '../../../services/product.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

export interface Service {
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
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent {
  product: any;
  productss: Service[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private getAllService: AllProviderService
  ) {}

  ngOnInit(): void {
    this.GetServiceByDetails();
  }

  GetServiceByDetails() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.location.back();
      return;
    }

    this.getAllService.GetServicebyId(id).toPromise()
      .then((data: any) => {
        console.log('Service Details:', data);

        // Handle single object or array response
        if (Array.isArray(data)) {
          this.productss = data.map((product: any) => this.mapToService(product));
        } else {
          this.productss = [this.mapToService(data)];
        }
      })
      .catch((error: any) => {
        console.error('Error fetching service details', error);
      });
  }

  private mapToService(product: any): Service {
    return {
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
    };
  }
}
