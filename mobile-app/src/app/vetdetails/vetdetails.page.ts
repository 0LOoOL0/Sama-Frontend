import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
// import { ProviderService, Provider } from '../services/provider.service';
import {
  ProviderService,
  Provider,
  Service,
  Veterinarian,
} from '../services/provider.service';
import { Product, ProductService } from '../services/product.service';
@Component({
  selector: 'app-vetdetails',
  templateUrl: './vetdetails.page.html',
  styleUrls: ['./vetdetails.page.scss'],
})
export class VetdetailsPage implements OnInit {
  providerId: number | undefined;
  provider: Provider | undefined;
  type: string | undefined;  services: Service[] = [];
  availability: string[] = [];
  segment: string = 'services';
  products: Product[] = [];
  veterinarians: Veterinarian[] = [];
  servicesImage = 'assets/R.jpeg';
  job: string | undefined;

  days = [
    { name: 'M', key: 'mon', available: false },
    { name: 'T', key: 'tue', available: false },
    { name: 'W', key: 'wed', available: false },
    { name: 'T', key: 'thu', available: false },
    { name: 'F', key: 'fri', available: false },
    { name: 'S', key: 'sat', available: false },
    { name: 'S', key: 'sun', available: false },
  ];

  slideOpts = {
    slidesPerView: 1.5,
    spaceBetween: 10,
    freeMode: true,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private providerService: ProviderService,
    private productService: ProductService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.providerId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.type = this.activatedRoute.snapshot.paramMap.get('type')!;
    if (this.providerId) {
      this.loadProviderDetails(this.providerId);
      // this.loadDoctors(this.providerId);
      this.loadServices(this.providerId);
      this.loadProducts(this.providerId);
      this.loadVeterinarians(this.providerId);
    }
    if (this.type === "groomers") {
      this.job = "Groomers";
    }
    if (this.type === "vet clinics") {
      this.job = "Clinic Doctors";
    }
  }

  loadProviderDetails(id: number) {
    this.providerService.getProviderById(id).then(
      response => {
        if (Array.isArray(response.data)) {
          this.provider = response.data[0];
        } else {
          this.provider = response.data;
        }
        if (this.provider?.availability) {
          this.availability = JSON.parse(this.provider.availability);
          this.updateAvailability();
        }
      },
      error => {
        console.error('Error fetching provider details:', error);
      },
    );
  }

  updateAvailability() {
    this.days.forEach(day => {
      day.available = this.availability.includes(day.key);
    });
  }

  loadServices(providerId: number) {
    this.providerService
      .getServicesByProviderId(providerId)
      .then(response => {
        console.log('Services fetched successfully:', response.data);
        this.services = response.data;
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }

  loadProducts(providerId: number) {
    this.productService.getProductsByProvider(providerId).subscribe(
      products => {
        console.log('Products fetched successfully:', products);
        this.products = products;
      },
      error => {
        console.error('Error fetching products:', error);
      },
    );
  }

  loadVeterinarians(providerId: number) {
    this.providerService
      .getVeterinariansByProviderId(providerId)
      .then(response => {
        this.veterinarians = response.data;
        console.log('Veterinarians fetched successfully:', this.veterinarians);
      })
      .catch(error => {
        console.error('Error fetching veterinarians:', error);
      });
  }

  openEmail(email: string | undefined) {
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  }

  callNumber(contactNo: string | undefined) {
    if (contactNo) {
      window.location.href = `tel:${contactNo}`;
    }
  }

  goBack() {
    window.history.back();
  }

  navigateToProviderService(serviceID: number) {
    this.navCtrl.navigateForward(`/providerservice/${serviceID}`);
  }

  navigateToDrProfile(vetId: number) {
    this.navCtrl.navigateForward(`/drprofile/${vetId}`);
  }

  navigateToProductDetails(productId: number) {
    this.navCtrl.navigateForward(`/product-details/${productId}`);
  }
}
