import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AdminAuthService } from '../../../services/adminAuth.service';
import { ProvidersService } from '../../../services/providers.service';
import { DeletionConfirmationComponent } from '../deletion-confirmation/deletion-confirmation.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

export interface Iprovider {
  id: number;
  startDate: string;
  name: string;
  type: string;
  city: string;
  contact: string;
  email: string;
  status: string;
}

@Component({
  selector: 'app-all-providers',
  standalone: true,
  imports: [CommonModule,FormsModule, DeletionConfirmationComponent, ],
  templateUrl: './all-providers.component.html',
  styleUrl: './all-providers.component.scss',
  providers: [DatePipe],
})
export class AllProvidersComponent {
  @ViewChild('providerTypeSelect') providerTypeSelect!: ElementRef;
  @ViewChild('FromDate') FromDate!: ElementRef;
  @ViewChild('ToDate') ToDate!: ElementRef;

  startDate: string = '';
  endDate: string = '';
  isPopupVisible = false;
  allProviders: Iprovider[] = [];
  shownProviders: Iprovider[] = [];
  selectedProviderId: number = -1;
  petClinics: number = 0;
  groomers: number = 0;
  petShops: number = 0;
  accommodations: number = 0;
  doctors: number = 0;
  trainers: number = 0;
  constructor(
    private cdr: ChangeDetectorRef,
    private adminAuthService: AdminAuthService,
    private providersService: ProvidersService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    // Getting all providers and saving them in the providers array
    this.providersService.getAllProviders().then(response => {
      const providersList = response.data;
      
      providersList.forEach((provider: any) => {
        switch (provider.type) {
          case 'pet clinic':
            this.petClinics++;
            break;
          case 'groomer':
            this.groomers++;
            break;
          case 'pet shop':
            this.petShops++;
            break;
          case 'accommodation':
            this.accommodations++;
            break;
          case 'doctor':
            this.doctors++;
            break;
          case 'trainer':
            this.trainers++;
            break;
        }
        // console.log(provider);
        this.allProviders.push({
          id: provider.id,
          startDate: new Date(provider.created_at)
            .toLocaleDateString('en-GB')
            .replace(/\//g, '/'),
          name: provider.name,
          type: provider.type,
          city: provider.address.split(',')[0],
          contact: provider.contact_no,
          email: provider.email,
          status: provider.status,
        });
      });
      this.shownProviders = [...this.allProviders];
      this.cdr.detectChanges();
    });
  }

  handleCancelPopUp(): void {
    this.isPopupVisible = false;
    console.log('Cancel');
  }

  async handleDeletePopUp(): Promise<void> {
    console.log('Delete');
    console.log(this.selectedProviderId);
    const result = await this.providersService.deleteProvider(
      this.selectedProviderId,
    );
    console.log(result.data);
    if (result.status === 200) {
      this.allProviders = this.allProviders.filter(
        (provider: any) => provider.id !== this.selectedProviderId,
      );
      this.shownProviders = [...this.allProviders];
      this.cdr.detectChanges();
    }
    this.isPopupVisible = false;
  }

  showDeletePopUp(providerId: number): void {
    this.isPopupVisible = true;
    this.selectedProviderId = providerId;
    console.log('showDeletePopUp');
  }
  onProviderTypeChange(event: any): void {
    console.log('onProviderTypeChange');
    const filteredProviders = this.allProviders.filter((provider: any) => {
      console.log(event.target.value);
      if (event.target.value === 'all') {
        return true; // Include all providers
      } else {
        const providerType = provider.type.toLowerCase().replace(' ', '-');
        const selectedType = event.target.value.toLowerCase().replace(' ', '-');
        // console.log(providerType, selectedType);
        return providerType === selectedType;
      }
    });
    this.shownProviders = [...filteredProviders]; 
    this.cdr.detectChanges();
  }

  // Function to select provider type from buttons
  selectProviderType(type: string): void {
    this.providerTypeSelect.nativeElement.value = type;
    this.onProviderTypeChange({ target: { value: type } });
  }

  onSearchChange(event: any): void {
    console.log('onSearchChange');
    const searchValue = event.target.value.toLowerCase().trim();
    const filteredProviders = this.allProviders.filter((provider: any) => {
      const providerName = provider.name.toLowerCase();
      const providerType = provider.type.toLowerCase();
      const providerCity = provider.city.toLowerCase();
      const providerContact = provider.contact.toLowerCase();
      const providerEmail = provider.email.toLowerCase();
      return (
        providerName.includes(searchValue) ||
        providerType.includes(searchValue) ||
        providerCity.includes(searchValue) ||
        providerContact.includes(searchValue) ||
        providerEmail.includes(searchValue)
      );
    });
    this.shownProviders = [...filteredProviders]; 
    this.cdr.detectChanges();
  }

  OnCityChange(event: any): void {
    console.log('OnCityChange');
    const searchValue = event.target.value.toLowerCase().trim();
    const filteredProviders = this.allProviders.filter((provider: any) => {
      const providerCity = provider.city.toLowerCase();
      return providerCity.includes(searchValue);
    });
    this.shownProviders = [...filteredProviders]; 
    this.cdr.detectChanges();
  }

  OnStatusChange(event: any):void {
    console.log('OnStatusChange');
    const providerStatus = event.target.value.toLowerCase();
    if (providerStatus.includes('all')) {
      this.shownProviders = [...this.allProviders];
      this.cdr.detectChanges();
      return;
    }
    const filteredProviders = this.allProviders.filter((provider: any) => {
      return provider.status.toLowerCase() === (providerStatus);
    });
    this.shownProviders = [...filteredProviders]; 
    this.cdr.detectChanges();
  }


  OnDateChange() {
    console.log('OnDateChange');
    if (this.FromDate.nativeElement.value === '' && this.ToDate.nativeElement.value === '') {
      this.shownProviders = [...this.allProviders];
      this.cdr.detectChanges();
      return;
    } 
    const startDate = this.formatDate(this.FromDate.nativeElement.value);
    const endDate = this.formatDate(this.ToDate.nativeElement.value);
    console.log(startDate, endDate);
    const filteredProviders = this.allProviders.filter(provider => {
      const providerDate = new Date(provider.startDate);
      const isAfterStartDate = !startDate || providerDate >= new Date(startDate);
      const isBeforeEndDate = !endDate || providerDate <= new Date(endDate);
      return isAfterStartDate && isBeforeEndDate;
    });

    this.shownProviders = [...filteredProviders];
    this.cdr.detectChanges();
  }

  formatDate(date: Date): any {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}
