import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProviderAuthService } from '../../../services/provider-auth.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { NavbarComponent } from '../../../user/sub-components/navbar/navbar.component';

@Component({
  selector: 'app-coupon-discount-page',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './coupon-discount-page.component.html',
  styleUrl: './coupon-discount-page.component.css',
})
export class CouponDiscountPageComponent {
  provider:any;
  couponForm: FormGroup;
  logoImage: File | null = null;
  businessImage: File | null = null;
  logoPreview: string | ArrayBuffer | null = null;
  businessPreview: string | ArrayBuffer | null = null;
  dateTime = new Date()
  yrs:number = this.dateTime.getFullYear();
   // Limited options for days, months, and years
   days: number[] = Array.from(Array(31).keys());
   months: string[] = ['January', 'February', 'March', 'April'];
   years: number[] = [this.yrs, this.yrs+1, this.yrs+2];
   memberShip:number = 1;

  expiryDay: number = 0;
  expiryMonth: number = 0;
  expiryYear: number = 0;

  constructor(private location: Location, private router: Router, private authService: ProviderAuthService,
    private http: HttpClient, private fb: FormBuilder
  ) {
    this.couponForm = this.fb.group({
      title: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      // expiration_date: [''],
      // image: [''],
      // membership: [''],
      price: [{value: 0, disabled:true}, Validators.required],
      // provider_id: [''],      
      quantity: [1, Validators.required],
      expiryDay: ['',Validators.required],
      expiryMonth: ['',Validators.required],
      expiryYear: ['',Validators.required],
    });
  }

  async ngOnInit() {

    try {
      const resp = await this.authService.getProfile();
      this.provider = resp; 
      console.log('prov', this.provider);     
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }

  goBack() {
    // Implement your back navigation logic here
    this.location.back();
  }
  goToCheckout(){
    this.router.navigate(['/provider-main/check-out']);
  }

   // Method to decrease quantity
   decreaseQuantity() {
    if (this.couponForm.controls['quantity'].value > 1) {
      var temp = this.couponForm.controls['quantity'].value - 1;
      this.couponForm.controls['quantity'].setValue(temp);
    }
  }

  // Method to increase quantity
  increaseQuantity() {
    var temp = parseInt(this.couponForm.controls['quantity'].value) + 1;
    this.couponForm.controls['quantity'].setValue(temp);
  }

  onLogoImageSelected(event: any) {
    this.logoImage = event.target.files[0] as File;
    this.previewImage(this.logoImage, 'logo');
  }

  onBusinessImageSelected(event: any) {
    this.businessImage = event.target.files[0] as File;
    this.previewImage(this.businessImage, 'business');
  }
  previewImage(file: File, type: 'logo' | 'business') {
    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'logo') {
        this.logoPreview = reader.result;
      } else {
        this.businessPreview = reader.result;
      }
    };
    reader.readAsDataURL(file);
  }

  changePrice(type: string) {
    if(type !== 'custom'){
      this.couponForm.controls['price'].setValue(0);
      this.couponForm.controls['price'].disable();
      this.memberShip = 1;
    }else{
      this.couponForm.controls['price'].enable();
      this.memberShip = 0;
    }
  }

  onSubmit() {
    if (this.couponForm.valid && this.logoImage && this.businessImage) {
      let imageObject = {
        logo: this.logoImage,
        businessImage: this.businessImage
    };
    
    // Convert the imageObject to a JSON string
    let imageJsonString = JSON.stringify(imageObject);

      // Create a Date object using the expiry values
    let expiryDate = new Date(this.expiryYear, this.expiryMonth - 1, this.expiryDay);


      const formData = new FormData();
      formData.append('image', imageJsonString.toString());
      formData.append('expiration_date', expiryDate.toDateString());
      formData.append('membership', this.memberShip.toString());
      formData.append('provider_id', this.provider.id);
      Object.keys(this.couponForm.controls).forEach(key => {
        formData.append(key, this.couponForm.get(key)?.value);
      });
      console.log(this.couponForm.get('title')?.value);
      console.log('Title value:', formData.get('title'));
      formData.append('title', this.couponForm.get('title')?.value);
       // Get the token from localStorage
       const token = localStorage.getItem('provider_token');

       // Create headers with the token
       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      console.log('form:', this.couponForm.value);
      this.http.post(`${environment.apiUrl}/api/coupons`, formData,  { headers: headers }).subscribe(
        (response) => {
          console.log('Promotion created successfully', response);
          this.router.navigate(['/provider-main/ad-approval']);
        },
        (error) => {
          console.error('Error creating promotion', error);
        }
      );
    } else {
      console.error('Form is invalid or images are missing');
      // Mark all form controls as touched to trigger validation messages
      Object.keys(this.couponForm.controls).forEach(key => {
        this.couponForm.get(key)?.markAsTouched();
      });
    }
  }


  // onSubmit() {
  //   this.getProfile();
  //   const response = this.authService.getProfile().toPromise();
  //   this.provider = response ;
  //   console.log('prov: ',this.provider);
  //   // Implement your form submission logic here
  //   console.log('Form submitted', {
  //     businessName: this.businessName,
  //     adDescription: this.adDescription,
  //     businessImg: this.businessImg,
  //     logoImg: this.logoImg,
  //   });
  // }

  async getProfile(){
    try {
      const isAuthenticated = await this.authService.verifyAuthentication();
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
        return;
      }
        
    } catch (error) {
      console.error('Error initializing product details:', error);
      this.router.navigate(['/login']);
    }
  }
}
