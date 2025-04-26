import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService, Service, Review, PetOwner } from '../services/provider.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  Id: number | undefined;
  petOwnerId: number | undefined;
  service: Service | undefined; 
  rating: number = 0;
  reviewForm: FormGroup;
  type: string | undefined;
  reviews: Review[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private providerService: ProviderService,
    private authService: AuthService,
    private fb: FormBuilder
  ) { this.reviewForm = this.fb.group({
    comment: ['', Validators.required],
    rating: [0, Validators.required]
  });}

  async ngOnInit() {
    this.type = this.activatedRoute.snapshot.paramMap.get('type')!;
    this.Id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    if (this.Id && this.type === "service") {
      this.loadServiceReviews(this.Id);
    }
    if (this.Id && this.type === "product") {
      this.loadProductReviews(this.Id);
    }


    this.reviewForm = this.fb.group({
      comment: ['', Validators.required],
      rate: [0, Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      pet_owner_id: [null, Validators.required]
    });

    try {
      const profileData = await this.authService.getProfile();
      this.petOwnerId = profileData.id;
      this.reviewForm.patchValue({
        pet_owner_id: this.petOwnerId
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }

  reviewsDraft = [
    {
      name: 'Charolette Hanlin',
      rating: 5,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...',
      timeAgo: '4 months ago',
      avatar: 'assets/avatar1.png'
    },
    {
      name: 'Charolette Hanlin',
      rating: 5,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...',
      timeAgo: '4 months ago',
      avatar: 'assets/avatar1.png'
    },
   ];

   async loadServiceReviews(serviceId: number) {
    try {
      const response = await this.providerService.getServiceReviewsByServiceId(serviceId);
      console.log('Reviews fetched successfully:', response.data);
      this.reviews = response.data.sort((a: Review, b: Review) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
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
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }
  
  async loadProductReviews(productId: number) {
    try {
      const response = await this.providerService.getProductReviewsByProductId(productId);
      console.log('Reviews fetched successfully:', response.data);
      this.reviews = response.data.sort((a: Review, b: Review) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
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
    } catch (error) {
      console.error('Error fetching reviews:', error);
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


  setRating(star: number) {
  if (this.rating === star) {
    this.rating -= 1;
  } else {
    this.rating = star;
  }
  this.reviewForm.patchValue({ rate: this.rating });
  console.log('New rating value:', this.rating); 
  this.reviewForm.patchValue({ rate: this.rating });

  }

  submitReview() {
    console.log('Form Valid:', this.reviewForm.valid);
    console.log('Form Values:', this.reviewForm.value);
    console.log('Form Errors:', this.reviewForm.errors);  
    if (this.reviewForm.valid) {
      const reviewData: Review = {
        ...this.reviewForm.value,
        service_id: this.type === 'service' ? this.Id ?? null : null,
        product_id: this.type === 'product' ? this.Id ?? null : null
      };
  
      console.log('Submitting review with data:', reviewData); // Log data to check
  
      this.providerService.addReview(reviewData)
        .then(response => {
          console.log('Review submitted successfully:', response.data);
          this.reviewForm.reset();
          this.rating = 0;
          this.reviewForm.patchValue({
            pet_owner_id: this.petOwnerId,
            date: new Date().toISOString().split('T')[0],
          });
          if (this.Id && this.type === "service") {
            this.loadServiceReviews(this.Id);
          } else if (this.Id && this.type === "product") {
            this.loadProductReviews(this.Id);
          }
        })
        .catch(error => {
          console.error('Error submitting review:', error);
        });
    } else {
      console.warn('Form is invalid:', this.reviewForm.errors);
    }
    }
  }