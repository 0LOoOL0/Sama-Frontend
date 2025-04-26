import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PetinfoService } from '../../../services/petinfo.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  docForm!: FormGroup;
  selectedDocumentFile: File | null = null; // Correct property name
  petId!: number;

  constructor(
    private fb: FormBuilder,
    private petInfoService: PetinfoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize the form with a documentTitle control
    this.docForm = this.fb.group({
      documentTitle: ['', Validators.required]
    });
    
    // Retrieve petId from route parameters or localStorage (depending on your flow)
    const storedPetId = localStorage.getItem('currentPetId');
    if (storedPetId) {
      this.petId = parseInt(storedPetId, 10);
    } else {
      console.error('No pet ID found for document upload.');
    }
  }

  // Trigger file input click
  triggerFileInput(): void {
    document.getElementById('fileInput')?.click();
  }

  // Capture the file selected by the user
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedDocumentFile = input.files[0];
    }
  }

  // Upload a document using the form data and selected file
  uploadDocument(): void {
    // Check if the form is valid and a file is selected
    if (this.docForm.invalid || !this.selectedDocumentFile) {
      console.error('Document title is missing or file not selected.');
      return;
    }
    
    const formData = new FormData();
    formData.append('documentTitle', this.docForm.value.documentTitle);
    formData.append('uploadedFile', this.selectedDocumentFile);
    
    this.petInfoService.addDocument(this.petId, formData)
      .then(response => {
        console.log('Document added successfully:', response.data);
        // After a successful upload, navigate to the next page
        this.router.navigate(['user-main-component/subscribe']);
      })
      .catch(error => {
        console.error('Error adding document:', error);
      });
  }
  
  // Called when user clicks "Add More"
  addMore(): void {
    if (this.docForm.invalid || !this.selectedDocumentFile) {
      console.error('Document title is missing or file not selected.');
      return;
    }
    
    const formData = new FormData();
    formData.append('documentTitle', this.docForm.value.documentTitle);
    formData.append('uploadedFile', this.selectedDocumentFile);
    
    this.petInfoService.addDocument(this.petId, formData)
      .then(response => {
        console.log('Document added successfully:', response.data);
        // Reset the form for the next document
        this.docForm.reset();
        this.selectedDocumentFile = null;
      })
      .catch(error => {
        console.error('Error adding document:', error);
      });
  }
  
  skip(): void {
    this.router.navigate(['user-main-component/new-user-profile/new-my-pets/new-pet-info']);
  }

  navigateBeMember(): void {
    // Optionally, you may want to upload any pending document first before navigating
    this.router.navigate(['user-main-component/subscribe']);
  }
}
