import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PetInfoService } from '../services/pet-info.service';

interface PetDocument {
  documentTitle: string;
  uploadedFile: File | null;
}

@Component({
  selector: 'app-add-pet-doc',
  templateUrl: './add-pet-doc.page.html',
  styleUrls: ['./add-pet-doc.page.scss'],
})
export class AddPetDocPage implements OnInit {
  isModalOpen = false;
  editModalOpen = false;
  editIndex: number | null = null;

  List: PetDocument[] = [];
  input: PetDocument = {
    documentTitle: '',
    uploadedFile: null,
  };

  errorMessage: string | null = null;
  user: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private petService: PetInfoService,
  ) {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      this.user = await this.auth.fetchProfileData();
      console.log('user====>', this.user);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  ngOnInit() {}

  addDoc() {
    if (this.input.documentTitle && this.input.uploadedFile) {
      this.List.push({ ...this.input });
      this.clearInfo();
      this.isModalOpen = false;
      this.errorMessage = null;
    } else {
      this.errorMessage = 'Both document title and file are required.';
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setEditOpen(isOpen: boolean, index: number | null = null) {
    this.editModalOpen = isOpen;
    this.editIndex = index;
    if (index !== null) {
      this.input = { ...this.List[index] };
    } else {
      this.clearInfo();
    }
  }

  saveEdit() {
    if (this.editIndex !== null) {
      if (this.input.documentTitle) {
        this.List[this.editIndex] = { ...this.input };
        this.clearInfo();
        this.editModalOpen = false;
        this.errorMessage = null;
      } else {
        this.errorMessage = 'Document title is required.';
      }
    }
  }

  clearInfo() {
    this.input = {
      documentTitle: '',
      uploadedFile: null,
    };
    this.errorMessage = null;
  }

  downloadDoc(file: File | null) {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      this.errorMessage = 'File not available for download.';
    }
  }

  deleteDoc(index: number) {
    this.List.splice(index, 1);
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.input.uploadedFile = input.files[0];
    } else {
      this.input.uploadedFile = null;
    }
  }

  hasUploadedDocs(): boolean {
    return this.List.length > 0;
  }

  getButtonLabel(): string {
    return this.hasUploadedDocs() ? 'Next' : 'Skip';
  }

  getButtonColor(): string {
    return this.hasUploadedDocs() ? 'FilledButtons' : 'OutlinedButtons';
  }

  async navigateNext() {
    try {
      const formData = new FormData();
  
      // Ensure that documents are appended correctly
      if (this.List.length > 0) {
        this.List.forEach((document, index) => {
          if (document.uploadedFile) {
            formData.append(`documents[${index}][documentTitle]`, document.documentTitle);
            formData.append(`documents[${index}][uploadedFile]`, document.uploadedFile);
            console.log(`Document ${index} Title: ${document.documentTitle}`);
            console.log(`Document ${index} File:`, document.uploadedFile);
          }
        });
      }
  
      const storedPetProfile = localStorage.getItem('pet Info');
      const storedPetImageFileName = localStorage.getItem('petImageFile');
      const storedPetImageBase64 = localStorage.getItem('petImageFileBase64');
      
      if (storedPetProfile) {
        const petProfileObject = JSON.parse(storedPetProfile);
  
        if (storedPetImageBase64 && storedPetImageFileName) {
          const imageDataUrl = `data:image/jpeg;base64,${storedPetImageBase64}`;
          const imageBlob = await (await fetch(imageDataUrl)).blob();
          const imageFile = new File([imageBlob], storedPetImageFileName, {
            type: imageBlob.type,
          });
          formData.append('image', imageFile);
        }
  
        formData.append('name', petProfileObject['petName']);
        formData.append('age', petProfileObject['age'].toString());
        formData.append('weight', petProfileObject['weight'].toString());
        formData.append('height', petProfileObject['height'].toString());
        formData.append('pet_type', petProfileObject['petType']);
        formData.append('breed', petProfileObject['breed']);
        formData.append('color', petProfileObject['color']);
        formData.append('is_vaccinated', petProfileObject['vaccinated']);
        formData.append('is_microchipped', petProfileObject['microchipped']);
        formData.append('is_neutered', petProfileObject['neutered']);
        formData.append('is_lost', petProfileObject['is_lost'] ? '1' : '0');
        formData.append('allow_adoption', petProfileObject['allow_adoption'] ? '1' : '0');
        formData.append('pet_owner_id', this.user.id.toString());
        
        const response = await this.petService.addPet(formData);
        console.log('Full response:', response); // Log the full response
        if (response && response.data) {
          console.log('response=========>', response.data);
          this.router.navigate(['./mypet']);
        } else {
          throw new Error('Unexpected response format');
        }
      } else {
        console.log('there is no pet info in the storage');
      }
    } catch (error: any) {
      console.error('Error:', error);
    }
  }
}
