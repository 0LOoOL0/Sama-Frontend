import { ChangeDetectorRef, Component } from '@angular/core';
import { Provider, ProvidersService } from '../../../services/providers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';
import { ProviderAuthService } from '../../../services/provider-auth.service';
import { CommonModule } from '@angular/common';
import { SignupStepsComponent } from '../../../shared/signup-steps/signup-steps.component';

@Component({
  selector: 'app-choose-pet',
  standalone: true,
  imports: [CommonModule, SignupStepsComponent],
  templateUrl: './choose-pet.component.html',
  styleUrl: './choose-pet.component.scss'
})
export class ChoosePetComponent {
  products!: Array<Product> | undefined;
  provider_id: number;
  pg: number= 3;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private providerService: ProvidersService,
    private authService: ProviderAuthService,
    private cdr: ChangeDetectorRef,){
      this.provider_id = 1;
      
    }

    navigateToProductUpload() {
      this.router.navigate(['/provider-main/product-upload']);
    }

    async ngOnInit() {
      try {
        const isAuthenticated = await this.authService.verifyAuthentication();
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
          return;
        }
        const providerProf = await this.authService.getProfile();
        // this.provider_id= providerProf.;

        this.loadProducts(this.provider_id);
          
      } catch (error) {
        console.error('Error initializing product details:', error);
        this.router.navigate(['/login']);
      }
    }
    async loadProducts(id: number) {
      try {
        const response = await this.productService.getProductsByProvider(id).toPromise();
        console.log('Products Data:', response);
        this.products = response;
        console.log('Products :', this.products);
      } catch (error) {
        console.error('Error in loadProducts:', error);
      }
    }
}
