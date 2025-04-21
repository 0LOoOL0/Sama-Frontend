import { Component, HostListener } from '@angular/core';
import { Doctor } from '../model/doctor.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProviderSectionService } from '../service/provider-section.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-provider-add-doctor',
  imports: [CommonModule,FormsModule],
  templateUrl: './provider-add-doctor.component.html',
  styleUrl: './provider-add-doctor.component.css'
})
export class ProviderAddDoctorComponent {



  isFormVisible = false;
  DoctorDeatils: Doctor[] = [];
  getDoctorDetails: any[] = [];
  isEditMode: boolean = false; // Controls visibility of buttons
  providerId: any; // Store the providerId




   constructor(private providerService: ProviderSectionService , private toastr: ToastrService) {
  
    }
  // Form object
  doctorForm: Doctor = {
    id: '', // Add unique ID
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
    status: '',
  };

  ngOnInit() {
    this.checkScreenSize();
    this.getDoctor();
    // this.getDoctorById()
  }
  generateUniqueId(): string {
    return 'doctor-' + Date.now(); // Generates a unique ID based on timestamp
  }
  

  controlDoctor(id: any): void {
    console.log("doctor id",id)
    this.providerService.doctorToggle(id).subscribe(
      (response) => {
        this.toastr.success('Doctor Status Change');
        this.getDoctor()
      },
      (error) => {
      }
    );
  }

  availabilityDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedDays = new Set<string>();

  // Toggle the availability days
  toggleAvailabilityDay(day: string): void {
    if (this.selectedDays.has(day)) {
      this.selectedDays.delete(day);
    } else {
      this.selectedDays.add(day);
    }
    this.doctorForm.availbiltyDay = Array.from(this.selectedDays).join(', ');
    console.log('Selected Days:', this.doctorForm.availbiltyDay);
  }
   
 
  tableData: any;

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
  generateId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  }
  
 // Save and Close Form
 onsubmit(): void {
  this.providerId = this.providerService.getProviderId();
  
  // Check if providerId exists
  if (!this.providerId) {
    this.toastr.warning("Kindly add the provider profile first.", 'Try Again', {
      timeOut: 5000,
    });
    return
  }

  console.log('Fetching doctors for Provider ID:', this.providerId);

  // Create a new product object
  const newProduct = {
    ...this.doctorForm,        // Include all form values
    id: this.generateId(), // Unique ID

    profileId: this.providerId // Attach profileId here
  };
      const Docotor = {DoctorData:newProduct}

      const loader = document.getElementById('loader');

      if (!loader) {
        return;
      }    
      loader.style.display = 'block'; 
       this.providerService.AddDoctor(Docotor).subscribe(
    (response) => {
      loader.style.display = 'none'; 

      this.toastr.success('Doctor added successfully.','Congratulations!');
      this.getDoctor()
      this.resetForm();
      this.isFormVisible= false
    },
    (error) => {
      loader.style.display = 'none'; 

      this.toastr.warning('Please provide the correct information for the doctor.', 'Try Again', {
        timeOut: 3000, 
      });
    })
}
callbackFunction() {
  this.isFormVisible = !this.isFormVisible;
}
deleteAllDoctor(): void {
  this.providerId = this.providerService.getProviderId();

  if (!this.providerId) {
    this.toastr.warning("We cannot delete this record.", 'Please try again later.', {
      timeOut: 5000,
    });
    return;
  }

  // Confirmation before deletion
  const confirmDelete = window.confirm("Are you sure you want to delete all doctors?");
  if (!confirmDelete) {
    return;
  }

  const loader = document.getElementById('loader');
  if (!loader) {
    return;
  }

  loader.style.display = 'block';
  this.providerService.deleteAllDoctor(this.providerId).subscribe((response) => {
    loader.style.display = 'none';
    this.toastr.success('All doctor records deleted successfully.');
  });
}

onDeleteDoctor(doctor: any): void {
  // Confirmation before deletion
  const confirmDelete = window.confirm(`Are you sure you want to delete the doctor: ${doctor.name || 'this record'}?`);
  if (!confirmDelete) {
    return;
  }

  const loader = document.getElementById('loader');
  if (!loader) {
    return;
  }

  loader.style.display = 'block';
  this.providerService.deleteDoctor(doctor).subscribe((response) => {
    loader.style.display = 'none';
    this.toastr.success('Doctor record deleted successfully.');
  });
}


  


// Save and Reset Form (Keep it Open)
saveAndReset(): void {
  console.log('Form submitted:', this.doctorForm);
  const providerDetails = localStorage.getItem('provider_data');

  if (!providerDetails) {
    alert('Profile ID not found. Please submit a profile first.');
    return;
  }

  const parsedProviderDetails = JSON.parse(providerDetails);

  // Create a new product object
  const newProduct = {
    ...this.doctorForm,        // Include all form values
    id: this.generateId(), // Unique ID

    profileId: parsedProviderDetails.profileId // Attach profileId here
  };

  const loader = document.getElementById('loader');

  if (!loader) {
    return;
  }    
  loader.style.display = 'block';
    this.providerService.AddDoctor(newProduct).subscribe(
    (response) => {
      loader.style.display = 'none';

      this.toastr.success('Doctor Added successfully','Congratulations!');
      this.resetForm();
    },
    (error) => {
      loader.style.display = 'none';

      this.toastr.error('Please provide the correct information for the doctor.', 'Try Again', {
        timeOut: 3000, 
      });
    }
  );

  this.resetForm(); // Just reset the form
}

  


  
  
  
  

  // File selection logic
  onFileSelected(event: any): void {
    const file = event.target.files[0]; // Selected file
    if (file) {
      const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (validFileTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // Assign Base64 image URL to doctorForm.imageUrl
          this.doctorForm.imageUrl = e.target.result;
          console.log('Image URL:', this.doctorForm.imageUrl); // Debugging purpose
        };
        reader.readAsDataURL(file); // Convert file to Base64
      } else {
        alert('Please select a valid image file (PNG, JPG, JPEG).');
      }
    }
  }
  

  // Reset the form
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
      status: 'true',
    };
    this.selectedDays.clear();
  }

  // Fetch doctor details
  getDoctor(): void {
    this.providerId = this.providerService.getProviderId();
  
    if (!this.providerId) {
      this.toastr.warning("Kindly add the provider profile first.", 'Try Again', {
        timeOut: 5000,
      });
      return
    }
    const loader = document.getElementById('loader');

  if (!loader) {
    return;
  }    
  loader.style.display = 'block';
  
    this.providerService.GetDocotor(this.providerId).subscribe({
      next: (response: any) => {
        loader.style.display = 'none';

        if (response && Array.isArray(response)) {
          this.DoctorDeatils = response; // Directly assign if response is an array
        } else if (response && response.data && Array.isArray(response.data)) {
          this.DoctorDeatils = response.data; // Assign from 'data' field if it's inside an object
        } else {
          loader.style.display = 'none';

          this.toastr.error('Recod not found', 'Try Again', {
            timeOut: 3000, 
          });        }
  
      },
      error: (error) => {
        loader.style.display = 'none';

        this.toastr.error('We cannot found Doctors list for this provider', 'Add New Doctor', {
          timeOut: 3000,
        });
      },
    });
  }
  
  
  getImageUrl(imageUrl: string | File): string {
  
    // Check if imageUrl is a string
    if (typeof imageUrl === 'string') {
      return `https://firebasestorage.googleapis.com/v0/b/sama-pet.appspot.com/o/
      ${imageUrl}`;
    }
  
    if (imageUrl instanceof File) {
      // Create a temporary URL for the File object
      return URL.createObjectURL(imageUrl);
    }
  
    return '';
  }
  
  
  
  

  getDoctorById(id: string | null | undefined) {
    this.providerId = this.providerService.getProviderId();
  
    if (!this.providerId) {
      this.toastr.warning("Kindly add the provider profile first.", 'Try Again', {
        timeOut: 5000,
      });
      return
    }
  
    // Log the providerId for debugging
    const loader = document.getElementById('loader');

  if (!loader) {
    return;
  }    
  loader.style.display = 'block';
    
    // Call the service to get the doctor data
    this.providerService.GetDocotorById(id).subscribe({
      next: (response: any) => {
        loader.style.display = 'none';

  
        // Check if doctor exists in the response
        if (response && response.doctor) {
          const doctorDetails = response.doctor; // doctor is an object, not an array
  
          // Patch data into the form
          this.doctorForm = {
            id: doctorDetails.id,
            nameEng: doctorDetails.nameEng ?? '',
            nameAra: doctorDetails.nameAra ?? '',
            educationEng: doctorDetails.educationEng ?? '',
            educationAra: doctorDetails.educationAra ?? '',
            noOfYearEng: doctorDetails.noOfYearEng ?? 0,
            noOfYearAra: doctorDetails.noOfYearAra ?? 0,
            contantEng: doctorDetails.contantEng ?? '',
            contentAra: doctorDetails.contentAra ?? '',
            availbiltyDay: doctorDetails.availbiltyDay ?? '',
            filterDate: doctorDetails.filterDate ?? '',
            filterTime: doctorDetails.filterTime ?? '',
            introEng: doctorDetails.introEng ?? '',
            introAra: doctorDetails.introAra ?? '',
            imageUrl: doctorDetails.imageUrl ?? '',
            status: doctorDetails.status ?? true,
          };
  
          this.isFormVisible = true;
          this.isEditMode = true;
  
        } else {
          loader.style.display = 'block';
          this.toastr.error('Recod not Found', 'Try Again', {
            timeOut: 3000, 
          });  
        }
      },
      error: (error) => {
        loader.style.display = 'none';

        this.toastr.error('Recod not Found', 'Try Again', {
          timeOut: 3000, 
        });      }
    });
  }
  
  
  updateDoctor() {
    this.providerId = this.providerService.getProviderId();
  
    if (!this.providerId) {
      this.toastr.warning("Kindly add the provider profile first.", 'Try Again', {
        timeOut: 5000,
      });
      return
    }
  
    const doctorId = this.doctorForm.id;
  
    if (!doctorId) {
      alert('Doctor ID is missing.');
      return;
    }
  
    const updateDoctorData = {
      nameEng: this.doctorForm.nameEng || '',
      nameAra: this.doctorForm.nameAra || '',
      educationEng: this.doctorForm.educationEng || '',
      educationAra: this.doctorForm.educationAra || '',
      noOfYearEng: this.doctorForm.noOfYearEng || 0,
      noOfYearAra: this.doctorForm.noOfYearAra || 0,
      contantEng: this.doctorForm.contantEng || '',
      contentAra: this.doctorForm.contentAra || '',
      availbiltyDay: this.doctorForm.availbiltyDay || '',
      filterDate: this.doctorForm.filterDate || '',
      filterTime: this.doctorForm.filterTime || '',
      introEng: this.doctorForm.introEng || '',
      introAra: this.doctorForm.introAra || '',
      status: this.doctorForm.status ?? true,
      image: this.doctorForm.imageUrl || '',
    };
  

    
   const doctorData= { data: updateDoctorData }
   const loader = document.getElementById('loader');

   if (!loader) {
     return;
   }    
   loader.style.display = 'block';
  
    this.providerService.updateDoctorById(doctorId, this.providerId, doctorData).subscribe(
      (response: any) => {
        loader.style.display = 'none';


        this.toastr.success('Doctor updated successfully');
        this.getDoctor();
        this.resetForm();
        this.isEditMode = false;
        this.isFormVisible=false;
        
        
      },
      (error) => {
        loader.style.display = 'none';

        this.toastr.error('Doctor is not updated', 'Try Again', {
          timeOut: 3000,
        });
            }
    );
  }
  
  
  
  
  
  

  searchTerm: string = '';

  // Search logic
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.getDoctorDetails = this.getDoctorDetails.filter((doctor) =>
        (doctor.nameEng?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
        (doctor.educationEng?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.DoctorDeatils = this.getDoctorDetails;
    }
  }

  currentSlide = 0;
  cardsPerSlide = 5;

  isMobile = false;
  slideWidth = 20;

  @HostListener('window:resize', [])
  checkScreenSize(): void {
    const width = window.innerWidth;
    if (width < 640) {
      this.cardsPerSlide = 1;
    } else if (width < 1024) {
      this.cardsPerSlide = 2;
    } else if (width < 1280) {
      this.cardsPerSlide = 3;
    } else {
      this.cardsPerSlide = 5;
    }

    this.currentSlide = 0;
  }

  // Previous Slide
  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  // Next Slide
  nextSlide(): void {
    const maxSlides = Math.ceil(this.DoctorDeatils.length / this.cardsPerSlide) - 1;
    if (this.currentSlide < maxSlides) {
      this.currentSlide++;
    }
  }
}

