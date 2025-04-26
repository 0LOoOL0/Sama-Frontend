import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetinfoService } from '../../../../../services/petinfo.service';
import { PetSelectionService } from '../../../../../services/PetSelectionService';
import { Pet } from '../../../../../services/petinfo.service';

@Component({
  selector: 'app-new-pet-documents',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-pet-documents.component.html',
  styleUrl: './new-pet-documents.component.css'
})
export class NewPetDocumentsComponent implements OnInit {
  docForm!: FormGroup;
  selectedFile: File | null = null;
  selectedPet: Pet | null = null;
  isPopupVisible: boolean = false;

  documents: { documentTitle: string; documentPath: string }[] = [];


  constructor(
    private fb: FormBuilder,
    private petInfoService: PetinfoService,
    private petSelectionService: PetSelectionService
  ) {}

  ngOnInit(): void {
    this.docForm = this.fb.group({
      documentTitle: ['', Validators.required]
    });

    this.petSelectionService.selectedPet$.subscribe(pet => {
      this.selectedPet = pet;
      if (pet?.id) {
        this.loadPetDocuments(pet.id);
      }
    });
  }

  loadPetDocuments(petId: number) {
    this.petInfoService.getPet(petId).subscribe({
      next: (response) => {
        if (response.documents && Array.isArray(response.documents)) {
          this.documents = response.documents;
        } else {
          this.documents = [];
        }
      },
      error: (err) => {
        console.error('Failed to load documents:', err);
      }
    });
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  uploadDocument() {
    if (this.docForm.invalid || !this.selectedFile || !this.selectedPet?.id) {
      console.error('Form invalid or missing file/pet ID');
      return;
    }

    const formData = new FormData();
    formData.append('documentTitle', this.docForm.value.documentTitle);
    formData.append('uploadedFile', this.selectedFile);

    this.petInfoService.addDocument(this.selectedPet.id, formData)
      .then(response => {
        console.log('Document uploaded successfully:', response);
        this.docForm.reset();
        this.selectedFile = null;
        this.isPopupVisible = false;
      })
      .catch(error => {
        console.error('Error uploading document:', error);
      });
  }

  addDocument() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  downloadFile(url: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = '';
    a.target = '_blank';
    a.click();
  }
  
}
