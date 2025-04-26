import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProviderService, Service, Review, PetOwner, Provider } from '../services/provider.service';

@Component({
  selector: 'app-providerservice',
  templateUrl: './providerservice.page.html',
  styleUrls: ['./providerservice.page.scss'],
})
export class ProviderservicePage implements OnInit {
  serviceId: number | undefined;
  service: Service | undefined; 
  reviews: Review[] = [];
  averageRating: number = 0.0;
  reviewCount: number = 0;
  type: string = "service";
  providerType: string = '';  // Add a field to hold the provider type
  showBookAppointmentButton: boolean = false; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private providerService: ProviderService,
    private navCtrl: NavController,
    private navCtrl2: NavController
  ) { }

  ngOnInit() {
    this.serviceId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if (this.serviceId) {
      this.loadService(this.serviceId);
      this.loadReviews(this.serviceId);
    }
  }

  serviceDraft = {
    name: 'Bathing',
    originalPrice: 'BD25.00',
    discountedPrice: 'BD20.00',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt pharetra eu eleifend. Fusce ultricies ligula eu sem varius pharetra. Proin lobortis sed.',
    rating: 4.2,
    reviewsCount: 230,
    pictures: [
      'assets/pic1.jpg',
      'assets/pic2.jpg',
      'assets/pic3.jpg',
      'assets/pic4.jpg'
    ],
    reviews: [
      {
        name: 'Charolette Hanlin',
        rating: 5,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...',
        timeAgo: '4 months ago',
        avatar: 'assets/avatar1.png'
      },
    ]
  };

  async loadReviews(serviceId: number) {
    try {
      const response = await this.providerService.getServiceReviewsByServiceId(serviceId);
      console.log('Reviews fetched successfully:', response.data);
      this.reviews = response.data;

      // Fetch PetOwner details for each review
      for (const review of this.reviews) {
        if (review.pet_owner_id) { 
          try {
            const petOwner = await this.loadPetOwner(review.pet_owner_id);
            review.petOwner = petOwner;
          } catch (error) {
            console.error('Error fetching pet owner for review:', error);
          }
        }
      }

      // Calculate average rating
      let totalRating: number = 0.0;
      const reviewCount: number = this.reviews.length;
      
      this.reviews.forEach(review => {
        console.log('Review ID:', review.id);
        console.log('Rating:', review.rate);
        console.log('Comment:', review.comment);
        console.log('Time Ago:', review.date);
        console.log('-------------------------');

        totalRating += review.rate;   
      });
      this.averageRating = reviewCount > 0 ? parseFloat((totalRating / reviewCount).toFixed(2)) : 0.0;
      this.reviewCount = reviewCount;
      console.log('Average Rating:', this.averageRating);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }
  
  async loadService(id: number) {
    try {
      const response = await this.providerService.getServiceById(id);
      if (Array.isArray(response.data)) {
        this.service = response.data[0];
      } else {
        this.service = response.data;
      }
      if (this.service?.provider_id) {
        this.loadProvider(this.service.provider_id);
      }
      console.log('Fetched service with image:', this.service?.image);
    } catch (error) {
      console.error('Error fetching service details:', error);
    }
  }
  
  async loadProvider(providerId: number) {
    try {
      const response = await this.providerService.getProviderById(providerId);
      const provider: Provider = Array.isArray(response.data) ? response.data[0] : response.data;
      this.providerType = provider.type;  // Save the provider type
      
      // Check if the provider is a doctor
      this.showBookAppointmentButton = this.providerType === 'doctor';
      console.log('Provider Type:', this.providerType);
    } catch (error) {
      console.error('Error fetching provider details:', error);
    }
  }
  
  loadPetOwner(id: number): Promise<PetOwner> {
    return this.providerService.getPetOwnerById(id)
      .then(response => {
        if (Array.isArray(response.data)) {
          return response.data[0];
        } else {
          return response.data;
        }
      })
      .catch(error => {
        console.error('Error fetching pet owner details:', error);
        throw error;
      });
  }

  navigateToReviews() {
    this.navCtrl.navigateForward(`/review/${this.type}/${this.serviceId}`);
}
navigateToAppointment() {
  if (this.serviceId && this.service?.provider_id) {
    const url = `/bookappointment/${this.serviceId}/${this.service.provider_id}`;
    console.log('Navigating to:', url);  // This should log the correct URL
    this.navCtrl2.navigateForward(url);
  } else {
    console.error('Service ID or Provider ID is missing');
  }
}
}
