import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Doctor } from '../model/doctor.model';
import { FormsModule } from '@angular/forms';
import * as Papa from 'papaparse'; // Install papaparse (npm install papaparse)

import { ProviderSectionService } from '../service/provider-section.service';

@Component({
  selector: 'app-provider-doctor',
  imports: [CommonModule,FormsModule],
  templateUrl: './provider-doctor.component.html',
  styleUrls: ['./provider-doctor.component.css'], // Fixed the key to "styleUrls"
})
export class ProviderDoctorComponent implements OnInit{
  isFormVisible = false;
  DoctorDeatils: Doctor[] = [];
  getDoctorDetails:any []=[];
  tableData: any[] = []; 
  // Pagination properties
currentPage: number = 1; // Tracks the current page
itemsPerPage: number = 5; // Number of items per page
paginatedDoctors: any[] = []; // Holds the doctors for the current page
Math = Math;


totalActive = 0;
totalNonActive = 0;

 
  constructor(private providerService: ProviderSectionService) {
  
  
  }

  
  ngOnInit() {
    const savedDoctors = localStorage.getItem('doctorDetails');
    if (savedDoctors) {
      this.getDoctorDetails = JSON.parse(savedDoctors); // Load data
      if (!Array.isArray(this.getDoctorDetails)) {
        this.getDoctorDetails = []; // If it's not an array, initialize it as an empty array
      }
    } else {
      this.getDoctorDetails = []; // Initialize with an empty array if no data exists
    }
  
    this.calculateTotals(); // Initialize totals
    this.updatePagination(); // Initialize paginated data
  }
  
    // Function to toggle the status and recalculate totals
    updateStatus(doctor: any, event: Event): void {
      // Update the doctor status based on the checkbox value
      doctor.status = (event.target as HTMLInputElement).checked;
  
      // Save the updated data back to localStorage
      localStorage.setItem('doctorDetails', JSON.stringify(this.getDoctorDetails));
  
      // Recalculate totals after status change
      this.calculateTotals();
  }
  
    
  
    calculateTotals(): void {
      this.totalActive = this.getDoctorDetails.filter((doctor) => doctor.status === true).length;
      this.totalNonActive = this.getDoctorDetails.filter((doctor) => doctor.status === false).length;
  
      // Store the totals in localStorage
      localStorage.setItem('totalActive', JSON.stringify(this.totalActive));
      localStorage.setItem('totalNonActive', JSON.stringify(this.totalNonActive));
  }
  

  // Form object
  doctorForm: Doctor = {
    nameEng: '',
    nameAra: '',
    educationEng: '',
    educationAra: '',
    noOfYearEng: 0,
    noOfYearAra: 0,
    contantEng: '',
    contentAra: '',
    availbiltyDay: '',
    filterDate: '',
    filterTime: '',
    introEng: '',
    introAra: '',
    imageUrl: '',
    status:''

  };


   // List of days for availability
   availabilityDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

   // Track selected availability days using a Set
   selectedDays = new Set<string>();
 
   /**
    * @description Handle availability checkbox toggling
    * @param {string} day - The day being toggled
    */
   toggleAvailabilityDay(day: string): void {
     if (this.selectedDays.has(day)) {
       this.selectedDays.delete(day); // Remove the day if already selected
     } else {
       this.selectedDays.add(day); // Add the day if not selected
     }
 
     // Update the form's availability field as a comma-separated string
     this.doctorForm.availbiltyDay = Array.from(this.selectedDays).join(', ');
     console.log('Selected Days:', this.doctorForm.availbiltyDay);
   }
 

  isEditMode: any;

  // Toggle form visibility
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.isFormValid()) {
      this.DoctorDeatils.push(this.doctorForm); // Add current form data to array
      // localStorage.setItem('doctorFormData', JSON.stringify(this.DoctorDeatils)); // Save array to local storage
  
      console.log('Form submitted:', this.doctorForm);
      alert('Form submitted successfully!');
  
      this.resetForm();
    } else {
      alert('Please fill in all fields correctly before submitting.');
    }
  }
  

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (validFileTypes.includes(file.type)) {
        // Show preview of the image
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const imgElement = document.getElementById('imagePreview') as HTMLImageElement;
          imgElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
  
        // Upload the image to the server and store the URL
      }
    }
  }
  

  // Validate form fields
  isFormValid(): boolean {
    const {
      nameEng,
      nameAra,
      educationEng,
      educationAra,
      noOfYearEng,
      noOfYearAra,
      contantEng,
      contentAra,
      availbiltyDay,
      filterDate,
      filterTime,
      introEng,
      introAra,
    } = this.doctorForm;

    return (
      !!nameEng &&
      !!nameAra &&
      !!educationEng &&
      !!educationAra &&
      noOfYearEng > 0 &&
      noOfYearAra > 0 &&
      !!contantEng &&
      !!contentAra &&
      !!availbiltyDay &&

      !!filterDate &&
      !!filterTime &&
      !!introEng &&
      !!introAra
    );
  }


     // Generate a unique ID for each product
     generateId(): string {
      return Math.random().toString(36).substr(2, 9);
    }

  // Submit form data
  submitDoctor(): void {
    if (this.isFormValid()) {
        if (this.isEditMode) {
            // Update the existing doctor
            const index = this.getDoctorDetails.findIndex((doctor) => doctor.id === this.isEditMode);
            if (index !== -1) {
                this.getDoctorDetails[index] = { ...this.doctorForm }; // Update with form data
                alert('Doctor details updated successfully!');
            }
        } else {
            // Add a new doctor (if not in edit mode)
            const newDoctor = { ...this.doctorForm, id: this.generateId() }; // Generate a unique ID
            this.getDoctorDetails.push(newDoctor); // Add the new doctor to the array
            alert('Doctor details added successfully!');
        }

        // Save to localStorage
        localStorage.setItem('doctorDetails', JSON.stringify(this.getDoctorDetails));

        // Recalculate and store the active and non-active totals
        this.calculateTotals();

        // Reset the form and update pagination
        this.resetForm();
        this.updatePagination();
        this.isFormVisible = false; // Hide the form
        this.isEditMode = null; // Reset edit mode
    } else {
        alert('Please fill in all required fields.');
    }
}

  get totalProductCount(): number {
    return this.getDoctorDetails.length;
  }
  
  addMoreDoctor(){
    if (this.isFormValid()) {
      if (this.isEditMode) {
          // Update the existing doctor
          const index = this.getDoctorDetails.findIndex((doctor) => doctor.id === this.isEditMode);
          if (index !== -1) {
              this.getDoctorDetails[index] = { ...this.doctorForm }; // Update with form data
              alert('Doctor details updated successfully!');
          }
      } else {
          // Add a new doctor (if not in edit mode)
          const newDoctor = { ...this.doctorForm, id: this.generateId() }; // Generate a unique ID
          this.getDoctorDetails.push(newDoctor); // Add the new doctor to the array
          alert('Doctor details added successfully!');
      }

      // Save to localStorage
      localStorage.setItem('doctorDetails', JSON.stringify(this.getDoctorDetails));

      // Recalculate and store the active and non-active totals
      this.calculateTotals();

      // Reset the form and update pagination
      this.resetForm();
      this.updatePagination();
      
      this.isEditMode = null; // Reset edit mode
  } else {
      alert('Please fill in all required fields.');
  }

  }

  // Reset the form to its initial state
  resetForm(): void {
    this.doctorForm = {
      nameEng: '',
      nameAra: '',
      educationEng: '',
      educationAra: '',
      noOfYearEng: 0,
      noOfYearAra: 0,
      contantEng: '',
      contentAra: '',
      availbiltyDay: '',
      filterDate: '',
      filterTime: '',
      introEng: '',
      introAra: '',
      imageUrl: '',
      status:'',
    };
  
    this.selectedDays.clear(); // Clear selected days
  
    // Update local storage
    // localStorage.setItem('doctorFormData', JSON.stringify(this.DoctorDeatils));
  }
  
  toggleState(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log('Toggle state:', isChecked ? 'ON' : 'OFF');
  }
  
  
  searchTerm: string = ''; 

  // Existing product table data

  // Add a method to filter products based on the search term
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.DoctorDeatils = this.getDoctorDetails.filter((doctor) =>
        (doctor.nameEng?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
        (doctor.educationEng?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.DoctorDeatils = [...this.getDoctorDetails]; // Reset to all doctors when search term is empty
    }
  }
  
 
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDoctors = this.getDoctorDetails.slice(startIndex, endIndex);
  }
  


nextPage(): void {
  if (this.currentPage < Math.ceil(this.getDoctorDetails.length / this.itemsPerPage)) {
    this.currentPage++;
    this.updatePagination();
  }
}

prevPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePagination();
  }
}

setPage(page: number): void {
  this.currentPage = page;
  this.updatePagination();
}
get totalPages(): number {
  return Math.ceil(this.getDoctorDetails.length / this.itemsPerPage);
}


editDoctor(doctor: Doctor): void {
  this.doctorForm = { ...doctor }; // Load the selected doctor's data into the form
  this.isEditMode = doctor.id; // Store the ID to track the doctor being edited
  this.isFormVisible = true; // Show the form for editing
}



deleteDoctor(id: string): void {
  // Confirm before deleting
  if (confirm('Are you sure you want to delete this doctor?')) {
    // Filter out the doctor with the specified ID
    this.getDoctorDetails = this.getDoctorDetails.filter((doctor) => doctor.id !== id);
    

    // Update the localStorage with the updated doctor list
    localStorage.setItem('doctorDetails', JSON.stringify(this.getDoctorDetails));

    // Update the paginated data
    this.updatePagination();

    alert('Doctor deleted successfully!');
  }
}


deleteAllDoctors(): void {
  // Confirm before deleting all
  if (confirm('Are you sure you want to delete all doctors?')) {
    this.getDoctorDetails = []; // Clear the list
    localStorage.removeItem('doctorDetails'); // Remove from localStorage

    // Update the paginated data
    this.updatePagination();

    alert('All doctors deleted successfully!');
  }
}






// download your table 

downloadCSV(): void {
  // Define headers
  const headers = [
    'ID',
    'Name (English)',
    'Name (Arabic)',
    'StartDate',
    'Education (English)',
    'Education (Arabic)',
    'Years of Experience (English)',
    'Years of Experience (Arabic)',
    'Contact (English)',
    'Contact (Arabic)',
    'Availability Days', // New column for availability
    'Status'
  ];

  // Map through the doctor details and prepare the rows
  const rows = this.getDoctorDetails.map((doctor) => [
    doctor.id,
    doctor.nameEng,
    doctor.nameAra,
    doctor.StartDate,
    doctor.educationEng,
    doctor.educationAra,
    doctor.noOfYearEng,
    doctor.noOfYearAra,
    doctor.contantEng,
    doctor.contentAra,
    // Ensure availbiltyDay is an array before calling join()
    Array.isArray(doctor.availbiltyDay) ? doctor.availbiltyDay.join(', ') : doctor.availbiltyDay,
    doctor.status ? 'Active' : 'Inactive'
  ]);

  // Combine headers and rows into a CSV content
  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv' });

  // Create a link element to trigger the download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'doctors.csv'; // Filename for the download

  // Programmatically click the link to trigger the download
  link.click();
}

// This method is triggered when a file is selected
// This method is triggered when a file is selected
onFileChange(event: any): void {
  const file = event.target.files[0]; // Get the file selected by the user
  if (file && file.type === 'text/csv') {
    this.importCSV(file);
  } else {
    alert('Please upload a valid CSV file.');
  }
}

// Parse the CSV and import data
importCSV(file: File): void {
  const reader = new FileReader();

  // When the file is loaded, parse the CSV data
  reader.onload = (e) => {
    const csvData = reader.result as string;
    
    // Use PapaParse to parse the CSV data into an array of objects
    Papa.parse(csvData, {
      complete: (result) => {
        // Process the parsed data
        const parsedData = result.data;
        this.processCSVData(parsedData);
      },
      header: true, // Optional: If your CSV has headers
      skipEmptyLines: true, // Optional: Skip empty lines
    });
  };

  // Read the file as a text string
  reader.readAsText(file);
}

// Process the parsed CSV data and store it in localStorage
processCSVData(data: any[]): void {
  // Append new data to the existing data in getDoctorDetails
  const newDoctorDetails = data.map((row: any) => ({
    id: row['ID'],
    nameEng: row['Name (English)'],
    nameAra: row['Name (Arabic)'],
    StartDate:row['Start Date'],
    educationEng: row['Education (English)'],
    educationAra: row['Education (Arabic)'],
    noOfYearEng: row['Years of Experience (English)'],
    noOfYearAra: row['Years of Experience (Arabic)'],
    contantEng: row['Contact (English)'],
    contentAra: row['Contact (Arabic)'],
    availbiltyDay: row['Availability Days'] ? row['Availability Days'].split(', ') : [],
    status: row['Status'] === 'Active',
  }));

  // Append the new data to the existing data (avoid overlap)
  this.getDoctorDetails = [...this.getDoctorDetails, ...newDoctorDetails];

  console.log('Imported Doctor Data:', this.getDoctorDetails);

  // Save the updated data to localStorage
  localStorage.setItem('doctorDetails', JSON.stringify(this.getDoctorDetails));
  alert('Doctor data imported and saved to localStorage!');
}

// Optional: Method to load data from localStorage (for verification)
loadFromLocalStorage(): void {
  const data = localStorage.getItem('doctorDetails');
  if (data) {
    this.getDoctorDetails = JSON.parse(data);
    console.log('Loaded Doctor Data from localStorage:', this.getDoctorDetails);
  } else {
    alert('No data found in localStorage!');
  }
}

}
