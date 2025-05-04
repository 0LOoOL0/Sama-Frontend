import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProviderSectionService } from '../service/provider-section.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  applicationCount = 0;
  deactiveCount = 0;
  activeCount = 0;
  approvedCount = 0;


  constructor(private providerService: ProviderSectionService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.fetchProviderData();
  }

  countStatuses(): void {
    // Ensure providerData is not empty before proceeding
    if (!this.providerData || this.providerData.length === 0) {
      console.log('No data available to count statuses.');
      return; // Exit if there's no data
    }
  
    // Normalize status field and trim spaces
    const normalizedData = this.providerData.map(provider => ({
      ...provider,
      status: provider.status?.toLowerCase().trim() || ''
    }));
  
    // Update status counts
    this.applicationCount = normalizedData.filter(p => p.status === 'application').length;
    this.deactiveCount = normalizedData.filter(p => p.status === 'deactive').length;
    this.activeCount = normalizedData.filter(p => p.status === 'active').length;
    this.approvedCount = normalizedData.filter(p => p.status === 'approved').length;
    
    // Optional: Log the counts to verify
    console.log('Counts:', {
      application: this.applicationCount,
      deactive: this.deactiveCount,
      active: this.activeCount,
      approved: this.approvedCount
    });
  }
  

  filterByType(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedType = selectElement.value.trim();

    if (selectedType && selectedType !== 'All') {
      const matches = this.providerData.filter(provider =>
        provider.gallery?.type_en?.toLowerCase() === selectedType.toLowerCase()
      );

      this.filteredProviders = matches.length > 0 ? matches : [];
    } else {
      this.filteredProviders = [...this.providerData];
    }
  }
  filterByStatus(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedStatus = selectElement.value.trim().toLowerCase();
  
    // Normalize provider data for safer comparison
    const normalizedData = this.providerData.map(provider => ({
      ...provider,
      status: provider.status?.toLowerCase().trim() || ''
    }));
  
    // Filtering logic
    if (selectedStatus && selectedStatus !== 'all') {
      const matches = normalizedData.filter(provider =>
        provider.status === selectedStatus
      );
      this.filteredProviders = matches;
    } else {
      this.filteredProviders = [...this.providerData];
    }
  
  }
  
  // filterByStatus(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const selectedStatus = selectElement.value.trim();

  //   if (selectedStatus && selectedStatus !== 'All') {
  //     const matches = this.providerData.filter(provider =>
  //       provider.status?.toLowerCase() === selectedStatus.toLowerCase()
  //     );

  //     this.filteredProviders = matches.length > 0 ? matches : [];
  //   } else {
  //     this.filteredProviders = [...this.providerData];
  //   }
  // }


  // This is a method to filter based on the city inputted
  filterByCity(event: Event) {
    // Referencing the triggered html element
    const inputElement = event.target as HTMLInputElement;

    // Extracts the text gathered and clears any white spaces by using the .trim()
    const city = inputElement.value.trim();

    // Condition to check if the admin has entered a city to filter
    if (city) {

      // .filter() - Loops through each object in providerData (which is an array of providers).
      // .toLowerCase() - Converts the city property of each provider to lowercase to ensure case-insensitive filtering.
      // .includes() - Checks if the provider.city contains the user's input (also converted to lowercase).
      const matches = this.providerData.filter(provider =>
        provider.city.toLowerCase().includes(city.toLowerCase())
      );

      // If there are matches, show only those, else show all providers
      if (matches) {
        this.filteredProviders = matches;
      } else {
        this.filteredProviders = [...this.providerData]; // Show all if no match
      }
    } else {
      // If no city is entered, show all providers
      this.filteredProviders = [...this.providerData];
    }
  }

  filterByDateRange() {
    const fromDateInput = document.getElementById('from-date') as HTMLInputElement;
    const toDateInput = document.getElementById('to-date') as HTMLInputElement;

    this.fromDate = fromDateInput.value;
    this.toDate = toDateInput.value;

    if (this.fromDate && this.toDate) {
      const selectedFromDate = new Date(this.fromDate);
      const selectedToDate = new Date(this.toDate);

      // Extend selectedToDate to the end of the day
      selectedToDate.setHours(23, 59, 59, 999);

      this.filteredProviders = this.providerData.filter(provider => {
        const providerCreated = new Date(provider.created_at);

        // Show only if created_at is within the full day range
        return providerCreated >= selectedFromDate && providerCreated <= selectedToDate;
      });
    } else {
      this.filteredProviders = [...this.providerData];
    }
  }

  // My filter
  // filterByDateRange() {
  //   const fromDateInput = document.getElementById('from-date') as HTMLInputElement;
  //   const toDateInput = document.getElementById('to-date') as HTMLInputElement;

  //   this.fromDate = fromDateInput.value;
  //   this.toDate = toDateInput.value;

  //   if (this.fromDate && this.toDate) {
  //     const selectedFromDate = new Date(this.fromDate);
  //     const selectedToDate = new Date(this.toDate);

  //     this.filteredProviders = this.providerData.filter(provider => {
  //       const providerStart = new Date(provider.created_at);
  //       // const providerEnd = new Date(provider.end_date);

  //       return (
  //         (providerStart >= selectedFromDate && providerStart <= selectedToDate) //||
  //         // (providerEnd >= selectedFromDate && providerEnd <= selectedToDate) ||
  //         // (providerStart <= selectedFromDate && providerEnd >= selectedToDate)
  //       );
  //     });
  //   } else {
  //     this.filteredProviders = [...this.providerData];
  //   }
  // }



  // Old developers date filter
  // filterByDateRange(event: Event) {
  //   const fromDateInput = document.getElementById('from-date') as HTMLInputElement;
  //   const toDateInput = document.getElementById('to-date') as HTMLInputElement;

  //   this.fromDate = fromDateInput.value.trim();
  //   this.toDate = toDateInput.value.trim();

  //   if (this.fromDate && this.toDate) {
  //     // Filter the providers based on whether their date range overlaps with the selected range
  //     this.filteredProviders = this.providerData.filter(provider => {
  //       const providerStartDate = new Date(provider.start_date);
  //       const providerEndDate = new Date(provider.end_date);
  //       const selectedFromDate = new Date(this.fromDate);
  //       const selectedToDate = new Date(this.toDate);

  //       // Show provider if its date range overlaps with the selected range
  //       return (
  //         (providerStartDate >= selectedFromDate && providerStartDate <= selectedToDate) ||
  //         (providerEndDate >= selectedFromDate && providerEndDate <= selectedToDate) ||
  //         (providerStartDate <= selectedFromDate && providerEndDate >= selectedToDate)
  //       );
  //     });
  //   } else {
  //     // If no date range is selected, show all providers
  //     this.filteredProviders = [...this.providerData];
  //   }
  // }

  // This function will send a API request to the backend to fetch and populate the Providers table in the All Providers Page

  fetchProviderData(): void {
    // Get the HTML element with the id 'loader' (typically a loading spinner or indicator)
    const loader = document.getElementById('loader');

    // If the loader element is not found, return early and do nothing
    if (!loader) {
      return;
    }

    // Set the loader's display property to 'block' to make it visible (show loading indicator)
    loader.style.display = 'block';

    // Call a method from providerService to fetch provider data (API call)
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
          this.typeCounts = data.type_counts || [];
          this.countStatuses(); 
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

  //
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
        loader.style.display = 'none';

        // Log the detailed error object to the console
        console.error('Error from backend:', error);

        // Check if the backend returned a detailed error message
        if (error.error && error.error.message) {
          console.error('Error Message:', error.error.message);
          console.error('Error Details:', error.error.error);
          console.error('Stack Trace:', error.error.stack_trace);
        } else {
          console.error('Unknown error:', error);
        }

        this.toastr.error('Provider status has not been changed.', 'Please try again later!', {
          timeOut: 3000,
        });
      }
    );
  }

  // Method to delete a provider by its ID.
  deleteProvider(providerId: any): void {
    // Display an alert showing the provider ID to confirm the provider being deleted.
    // This is for debugging purposes, so the developer can see which provider is selected for deletion.
    alert('Provider ID to delete: ' + providerId);

    // Prompt the user with a confirmation dialog to ensure they want to delete the provider.
    // If the user clicks 'OK', it proceeds with the deletion, otherwise it exits.
    if (confirm('Are you sure you want to delete this provider?')) {

      // Attempt to get the loader element (used for showing a loading spinner or animation).
      const loader = document.getElementById('loader');

      // If the loader element is not found in the DOM, show an alert message and return from the method.
      // This prevents the execution of further code since the loader is essential for indicating loading state.
      if (!loader) {
        alert('loader not found');
        return;
      }

      // Display the loader (by setting its 'display' CSS property to 'block') to indicate the deletion process is happening.
      loader.style.display = 'block';

      // Call the 'deleteProvider' method from the providerService to initiate the deletion process.
      // 'providerId' is passed as an argument to specify which provider to delete.
      this.providerService.deleteProvider(providerId).subscribe({

        // This block is executed if the deletion request succeeds (i.e., the provider is successfully deleted).
        next: () => {
          // Ensure the loader stays visible during the success process.
          loader.style.display = 'block';

          // Remove the deleted provider from the providerData array by filtering out the provider with the matching ID.
          // The 'filter' method creates a new array, excluding the provider with the ID being deleted.
          this.providerData = this.providerData.filter(provider => provider.id !== providerId);

          // Update the filteredProviders array to reflect the latest provider data after deletion.
          // This ensures that the view displaying filtered results stays up-to-date.
          this.filteredProviders = [...this.providerData]; // Spread operator ensures a fresh copy of the array.

          // Show a success toast notification indicating that the provider and its records have been deleted successfully.
          // The 'timeOut' option sets how long the toast will be displayed (3000 milliseconds).
          this.toastr.success("Provider records have been deleted successfully.", "Congratulations", {
            timeOut: 3000,
          });

          // Call the fetchProviderData method to refresh the list of providers from the server.
          // This ensures that the displayed data is always up-to-date.
          this.fetchProviderData();
        },
        // This block is executed if an error occurs during the deletion process (e.g., network issues, server errors).
        error: (error) => {
          // Log the error details to the console for debugging purposes.
          console.error('Error deleting provider:', error);

          // Show an error toast notification indicating that the provider records could not be deleted.
          // This provides feedback to the user that something went wrong.
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

  // Here is how it works. When you click on edit it gets the provider with all its information.
  // The provider component has many child like gallery and services so the proivder id will be set for it all once you click on the edit
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

  // Method to export data to CSV
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