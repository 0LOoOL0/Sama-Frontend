import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProviderSectionService } from '../service/provider-section.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface TypeCount {
  type: string;
  count: number;
}
interface AuthorizedPerson {
  name: string;
  contact_no: string;
  email: string;
  position: string;
}
interface Address {
  office: string;
  road: string;
  block: string;
  city: string;
}
interface Provider {
  name: string;
  contact_no: string;
  status: string;  // or whatever the type is
  email: string;
  provider_name_en: string;
  provider_name_ar: string;
  cr_number: string;
  instagram: string;
  website: string;
  start_date: string;
  end_date: string;
  address: Address;
  availability_days: string[];
  availability_hours: {
    start: string;
    end: string;
  };
  authorized_persons: AuthorizedPerson[];
}

@Component({
  selector: 'app-all-provider-list',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './all-provider-list.component.html',
  styleUrl: './all-provider-list.component.css'
})
export class AllProviderListComponent implements OnInit {
  providerData: any[] = [];
  typename2: any[] = [];
  selectedProvider: any = {};
  providerId: any;
  gallayData: any[] = []
  filteredProviders: any[] = [];
  fromDate: string = '';
  toDate: string = '';
  typeCounts: any[] = [];
  providerType: any[] = [];
  providersCount: number = 0; 
  pendingCount: number = 0;
  showDeactive = false;
  showActive = false;
  providers: Provider[] = [];
  filprov = [...this.providers];

  constructor(private providerService: ProviderSectionService, private router: Router, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.fetchProviderData();
  }

  showDeactiveProvidersCount(): void {
    this.showDeactive = !this.showDeactive;
    if (this.showDeactive) {
      this.filteredProviders = this.providerData.filter(provider => provider.status.toLowerCase() === 'deactive');
    } else {
      this.filteredProviders = [...this.providerData];  // Reset to show all providers
    }
  }
  showActiveProvidersCount(): void {
    this.showActive = !this.showActive;
    if (this.showActive) {
      this.filteredProviders = this.providerData.filter(provider => provider.status.toLowerCase() === 'active');
    } else {
      this.filteredProviders = [...this.providerData];  // Reset to show all providers
    }
  }

  filterByCity(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const city = inputElement.value.trim().toLowerCase();

    console.log("Filtering by city:", city); // Debugging log
    console.log("Available providers:", this.providerData); // Debugging log

    if (!this.providerData || !Array.isArray(this.providerData)) {
      console.error("providerData is undefined or not an array");
      return;
    }

    if (city) {
      this.filteredProviders = this.providerData.filter(provider =>
        provider.city?.toLowerCase().includes(city)
      );
    } else {
      this.filteredProviders = [...this.providerData]; // Show all providers when input is empty
    }

    console.log("Filtered providers:", this.filteredProviders); // Debugging log
  }

  filterByName(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const name = inputElement.value.trim().toLowerCase();  // Capture the input value and make it case-insensitive

    console.log("Filtering by name:", name);  // Debugging log
    console.log("Available providers:", this.providerData);  // Debugging log

    if (!this.providerData || !Array.isArray(this.providerData)) {
      console.error("providerData is undefined or not an array");
      return;
    }

    // Apply the filter based on matching any of the name fields (case-insensitive)
    if (name) {
      this.filteredProviders = this.providerData.filter(provider =>
        provider.name.toLowerCase().includes(name) ||  // Check provider's main name
        provider.provider_name_en.toLowerCase().includes(name) ||  // Optional: check English name
        provider.provider_name_ar.toLowerCase().includes(name)  // Optional: check Arabic name
      );
    } else {
      // If the input is empty, reset to show all providers
      this.filteredProviders = [...this.providerData];
    }

    console.log("Filtered providers:", this.filteredProviders);  // Debugging log
  }

  filterByDateRange(event: Event) {
    const fromDateInput = document.getElementById('from-date') as HTMLInputElement;
    const toDateInput = document.getElementById('to-date') as HTMLInputElement;

    this.fromDate = fromDateInput.value.trim();
    this.toDate = toDateInput.value.trim();

    if (this.fromDate && this.toDate) {
      // Filter the providers based on whether their date range overlaps with the selected range
      this.filteredProviders = this.providerData.filter(provider => {
        const providerStartDate = new Date(provider.start_date);
        const providerEndDate = new Date(provider.end_date);
        const selectedFromDate = new Date(this.fromDate);
        const selectedToDate = new Date(this.toDate);

        // Show provider if its date range overlaps with the selected range
        return (
          (providerStartDate >= selectedFromDate && providerStartDate <= selectedToDate) ||
          (providerEndDate >= selectedFromDate && providerEndDate <= selectedToDate) ||
          (providerStartDate <= selectedFromDate && providerEndDate >= selectedToDate)
        );
      });
    } else {
      // If no date range is selected, show all providers
      this.filteredProviders = [...this.providerData];
    }
  }

  fetchProviderData(): void {
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }
    loader.style.display = 'block';
    this.providerService.getProvider().subscribe({
      next: (data: any) => {
        loader.style.display = 'none';

        if (data) {
          this.providerData = data.providers || [];
          this.filteredProviders = [...this.providerData];

          if (this.providerData.length > 0) {
            const firstProvider = this.providerData[0];
            this.providerType = firstProvider.gallery?.type_en || null;
          }
          this.typeCounts = data.type_counts.map((item: TypeCount) => ({
            type: item.type,
            count: item.count || 0,
          }));

          this.providersCount = this.providerData.length;
          /*this.pendingProviders = this.providerData.filter((provider) => 
            provider.status?.toLowerCase() === 'pending').length;*/
        } else {
          this.toastr.error('Provider List has not been Found.', 'Add New Provider!', {
            timeOut: 3000,
          });
        }

      },
      error: (err) => {
        this.toastr.warning('Please Check your Internet connection.', 'Internet Connection Lost', {
          timeOut: 3000,
        });
      },
    });
  }

  ControlProvider(status: any): void {
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }
    loader.style.display = 'block';
    this.providerService.providerToggle(status).subscribe(
      (response) => {
        loader.style.display = 'none';

        this.toastr.success('Provider status has been changed.', 'Congratulations!', {
          timeOut: 3000,
        });
        this.fetchProviderData()
      },
      (error) => {
        this.toastr.error('Provider status has not been changed.', 'Please Try again later !', {
          timeOut: 3000,
        });
      }
    );
  }

  deleteProvider(providerId: any): void {
    if (confirm('Are you sure you want to delete this provider?')) {

      const loader = document.getElementById('loader');

      if (!loader) {
        return;
      }
      loader.style.display = 'block';
      this.providerService.deleteProvider(providerId).subscribe({
        next: () => {
          loader.style.display = 'block';

          this.providerData = this.providerData.filter(provider => provider.id !== providerId);
          this.filteredProviders = [...this.providerData]; // Update filteredProviders
          this.toastr.success("Provider records have been deleted successfully.", "Congratulations", {
            timeOut: 3000,
          }); this.fetchProviderData(); // Refresh the provider list
        },
        error: (error) => {
          this.toastr.error("Provider records have not been deleted successfully.", "Try Again", {
            timeOut: 3000,
          });
        },
      });
    }
  }

  fetchProviderDetails(providerId: string): void {
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }
    loader.style.display = 'block';

    this.providerService.getProviderDataById(providerId).subscribe({
      next: (data) => {
        loader.style.display = 'block';
        this.selectedProvider = data;
      },
      error: (err) => {
        this.toastr.warning("The provider record was not found.", "Please add a new provider!", {
          timeOut: 3000,
        });
      }
    });
  }

  navigateToProfile(provider: any): void {
    if (provider && provider.id) {
      this.providerService.setProviderId(provider.id);

      this.router.navigate(['/add-new-provider'], { state: { provider, providerId: provider.id } });
    } else {
      this.toastr.error("We cannot update this provider.", "Try Again", {
        timeOut: 3000,
      });
    }
  }

  exportToCSV(): void {
    const header = [
      'Provider Name (English)', 'Provider Name (Arabic)', 'Business Name', 'Start Date', 'End Date',
      'City', 'Phone Number', 'Email', 'CR Number', 'Instagram URL', 'Website',
      'Office Address', 'Road', 'Block',
      'Availability Days', 'Availability Hours (Start)', 'Availability Hours (End)',
      'Authorized Person Name', 'Authorized Person Contact', 'Authorized Person Email'
    ];

    const rows = this.filteredProviders.map(provider => {
      // Parse the data from the provider object
      const authorizedPersons: AuthorizedPerson[] = this.parseJson(provider.authorized_persons) || [];
      const availabilityDays = this.parseJson(provider.availability_days) || [];
      const availabilityHours = this.parseJson(provider.availability_hours) || {};

      const providerNameEn = provider.provider_name_en || '';
      const providerNameAr = provider.provider_name_ar || '';
      const businessName = provider.name || '';
      const startDate = provider.start_date || '';
      const endDate = provider.end_date || '';
      const city = provider.city || ''; // Ensure city is included
      const phoneNumber = provider.contact_no || '';
      const email = provider.email || '';
      const crNumber = provider.cr_number || '';
      const instagramUrl = provider.instagram || '';
      const website = provider.website || '';
      const office = provider.office || ''; // Ensure office is included
      const road = provider.road || ''; // Ensure road is included
      const block = provider.block || ''; // Ensure block is included

      const availabilityDaysFormatted = availabilityDays.join(' , ') || ''; // Combine availability days into one string
      const availabilityStart = availabilityHours.start || '';
      const availabilityEnd = availabilityHours.end || '';

      // Join authorized persons' details as a string if there are multiple
      const authorizedPersonName = authorizedPersons.map((person: AuthorizedPerson) => person.name).join(', ') || '';
      const authorizedPersonContact = authorizedPersons.map((person: AuthorizedPerson) => person.contact_no).join(', ') || '';
      const authorizedPersonEmail = authorizedPersons.map((person: AuthorizedPerson) => person.email).join(', ') || '';

      return [
        providerNameEn, providerNameAr, businessName, startDate, endDate,
        city, phoneNumber, email, crNumber, instagramUrl, website, office,
        road, block, availabilityDaysFormatted, availabilityStart, availabilityEnd,
        authorizedPersonName, authorizedPersonContact, authorizedPersonEmail
      ];
    });

    // Convert data to CSV format
    const csvData = this.convertToCSV([header, ...rows]);

    // Create a Blob from CSV data and trigger the download
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'provider_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Helper method to parse JSON strings into objects or arrays
  parseJson(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return [];
    }
  }

  convertToCSV(data: any[]): string {
    return data.map(row => row.join(',')).join('\n');
  }
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef; // Reference to file input element

  // Function to trigger file input
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Handle file import
  onFileImport(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const csvData = e.target.result;
        this.parseCSVData(csvData);
      };
      reader.readAsText(file);
    }
  }

  private parseCSVData(csvData: string): void {
    const rows = csvData.split('\n').map(row => row.trim());
    const parsedData: any[] = []; // Store parsed provider objects

    rows.forEach((row, index) => {
      if (index === 0) return; // Skip header row

      const columns = row.split(',');
      if (columns.length >= 18) { // Ensure the row has the correct number of columns
        const provider = {
          name: columns[0]?.trim(),
          phoneNumber: columns[1]?.trim(),
          companyEmail: columns[2]?.trim(),
          providerNameEn: columns[3]?.trim(),
          providerNameAr: columns[4]?.trim(),
          crNumber: columns[5]?.trim(),
          instagramUrl: columns[6]?.trim(),
          website: columns[7]?.trim(),
          startDate: columns[8]?.trim(),
          endDate: columns[9]?.trim(),
          address: {
            office: columns[10]?.trim(),
            road: columns[11]?.trim(),
            block: columns[12]?.trim(),
            city: columns[13]?.trim(),
          },
          availabilityDays: columns[14]?.trim().split(',') || null,
          availabilityHours: {
            start: columns[15]?.trim(),
            end: columns[16]?.trim(),
          },
          // Clean and parse the authorized_persons JSON string, allow null if parsing fails
          authorizedPerson: columns[17]?.trim() || null,
          profile_image: columns[18]?.trim() || null
        };

        parsedData.push(provider); // Add the provider object to the parsedData array
      }
    });


    // Send each provider object to the backend one by one
    let providerCount = 0; // To keep track of the number of providers sent

    const sendProvider = (provider: any) => {
      const providerObject = {
        providerData: JSON.stringify(provider) // Stringify the provider object to meet backend requirements
      };


      const loader = document.getElementById('loader');

      if (!loader) {
        return;
      }
      loader.style.display = 'block';
      this.providerService.AddProvider(providerObject).subscribe(
        (response) => {
          this.fetchProviderData();
          providerCount++;
          if (providerCount < parsedData.length) {
            sendProvider(parsedData[providerCount]); // Send the next provider
          } else {
            loader.style.display = 'none';

            this.toastr.success("All provider records uploaded successfully.", "Congratulations", {
              timeOut: 3000,
            });
          }
        },
        (error) => {
          this.toastr.error("We cannot uploading this record enter correct CSV formet.", "Try Again", {
            timeOut: 3000,
          });
        }
      );
    };

    // Start sending the first provider
    sendProvider(parsedData[providerCount]);
  }

}