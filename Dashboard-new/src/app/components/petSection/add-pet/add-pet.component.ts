import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PetSectionService } from '../service/PetSectionServices';
import { TransferComponent } from '../popups/transfer/transfer.component';

declare var Swal: any;

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TransferComponent],
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {
  petForm: FormGroup;
  ownerName: string = '';
  ownerPhone: string = '';
  ownerArea: string = '';
  packageList: any[] = [];
  
  // Store the selected package details
  selectedPackage: any = null;

  // Property for selected pet data (for editing)
  selectedPet: any = null;

  isTransferVisible = false;


  // ----- New properties for image upload -----
  petImageFile: File | null = null;
  petImageFileName: string = 'No file chosen';
  petImageBase64: string | null = null;
  @ViewChild('petFileInput') petFileInput!: ElementRef;
  // ---------------------------------------------

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private petSectionService: PetSectionService,
    private cd: ChangeDetectorRef
    
  ) {
    this.petForm = this.fb.group({
      petName: ['', Validators.required],
      breed: ['', Validators.required],
      weight: ['', Validators.required],
      vaccinated: [false],
      microchipped: [false],
      neutered: [false],
      collarNo: [''],
      gender: ['', Validators.required],
      height: ['', Validators.required],
      bio: [''],
      petType: ['', Validators.required],
      age: ['', Validators.required],
      colour: ['', Validators.required],
      pet_owner_id: [''],

      // Membership part
      firstIssue: [this.formatDate(new Date())],
      issueDate: [''],
      expiryDate: [''],
      packageType: [''],  // package selection goes here
      status: [''],
      period: [''],
      payType: [''],
      totalPrice: [''],
      delivery: ['']
    });
  }


  toggleTransferForm() {
    this.isTransferVisible = !this.isTransferVisible;
}

closeTransferForm() {
    this.isTransferVisible = false;
}


// *** New Methods for handling pet image upload ***

onPetImageSelect(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      this.toastr.error('Invalid file type. Only PNG, JPG, or JPEG are allowed.', 'Error', { timeOut: 3000 });
      this.petImageFile = null;
      this.petImageFileName = 'No file chosen';
      return;
    }
    this.petImageFile = file;
    this.petImageFileName = file.name;
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        this.petImageBase64 = e.target.result as string;
        console.log('Pet image Base64:', this.petImageBase64);
      }
    };
    reader.readAsDataURL(file);
  }
}

triggerPetFileInput(): void {
  this.petFileInput.nativeElement.click();
}
// **********************************************

  ngOnInit(): void {
    // Check if pet data was passed in state (for edit mode)
    const petData = history.state.petData;
    if (petData && petData.id) {
      // Fetch the complete pet data from the API so membership is included
      this.petSectionService.getPet(petData.id).subscribe(
        (response: any) => {
          this.selectedPet = response;

          // Sometimes the pet data might be wrapped in a "data" property.
    const pet = response.data ? response.data : response;
    console.log('Extracted pet object:', pet);
    console.log('Fetched pet image URL:', pet.image);
          
          console.log('Fetched pet image URL:', response.image); // Confirm URL in console
          // Use the response (which should include membership) to patch the form
          // Set pet image so it appears in the view
    this.petImageBase64 = response.image as string;
    console.log('petImageBase64 now:', this.petImageBase64);
          this.petForm.patchValue({
            petName: response.name,
            breed: response.breed,
            weight: response.weight,
            vaccinated: response.is_vaccinated,
            microchipped: response.is_microchipped,
            neutered: response.is_neutered,
            collarNo: response.collarNo,
            gender: response.gender,
            height: response.height,
            bio: response.description,
            petType: response.pet_type,
            age: response.age,
            colour: response.color,
            pet_owner_id: response.pet_owner_id,
            // Membership fields: if membership exists, parse and format its dates.
            firstIssue: response.membership && response.membership.firstIssue 
                          ? this.formatDate(this.parseDateString(response.membership.firstIssue))
                          : '',
            issueDate: response.membership && response.membership.start_date 
                          ? this.formatDate(this.parseDateString(response.membership.start_date))
                          : '',
            expiryDate: response.membership && response.membership.end_date 
                          ? this.formatDate(this.parseDateString(response.membership.end_date))
                          : '',
            packageType: response.membership ? response.membership.package_id : '',
            status: response.membership ? response.membership.status : '',
            period: response.membership ? response.membership.period : '',
            payType: response.membership ? response.membership.pay_type : '',
            totalPrice: response.membership ? response.membership.price : '',
            delivery: response.membership ? response.membership.delivery : ''
          });
        },
        (error) => {
          console.error('Error fetching pet details:', error);
        }
      );
    }
    
    // Load owner details (existing logic)
    let ownerId: number | null = this.petSectionService.getOwnerId();
    if (typeof ownerId === 'number' && !isNaN(ownerId)) {
      this.petForm.patchValue({ pet_owner_id: ownerId });
      this.petSectionService.getOwnerDetails(ownerId).subscribe(
        (response) => {
          const ownerData = response?.data ?? {};
          this.ownerName = ownerData.ownerName || "Unknown Owner";
          this.ownerPhone = ownerData.contactNumber || "N/A"; 
          this.ownerArea = ownerData.location || "N/A"; 
        },
        (error) => {
          console.error('Error fetching owner details:', error);
        }
      );
    } else {
      console.error("No valid owner ID found when loading AddPetComponent.");
    }
    
    // Load packages from the API (unchanged)
    this.petSectionService.getUserPackages().subscribe(
      (packages) => {
        this.packageList = packages;
        console.log("Packages Loaded:", this.packageList);
        this.cd.detectChanges();
      },
      (error) => {
        console.error("Error fetching package data:", error);
      }
    );
    
    // Subscribe to packageType changes
    this.petForm.get('packageType')?.valueChanges.subscribe(value => {
      if (value) {
        this.selectedPackage = this.packageList.find(pkg => pkg.id == value);
        if (this.selectedPackage && this.selectedPackage.start_date && this.selectedPackage.end_date) {
          const duration = this.calculateDuration(this.selectedPackage.start_date, this.selectedPackage.end_date);
          const today = new Date();
          this.petForm.patchValue({
            issueDate: this.formatDate(today),
            expiryDate: this.formatDate(this.calculateExpiryDate(today, duration)),
            totalPrice: this.selectedPackage.price
          }, { emitEvent: false });
        }
      }
    });
  }
  
  

  // When user manually changes the issue date
  onIssueDateChange(event: any): void {
    if (!this.selectedPackage) {
      return;
    }
    const newIssueDate = new Date(event.target.value);
    const duration = this.calculateDuration(this.selectedPackage.start_date, this.selectedPackage.end_date);
    const newExpiryDate = this.calculateExpiryDate(newIssueDate, duration);
    this.petForm.patchValue({
      expiryDate: this.formatDate(newExpiryDate)
    }, { emitEvent: false });
  }

  // When user manually changes the expiry date
  onExpiryDateChange(event: any): void {
    if (!this.selectedPackage) {
      return;
    }
    const newExpiryDate = new Date(event.target.value);
    const duration = this.calculateDuration(this.selectedPackage.start_date, this.selectedPackage.end_date);
    const newIssueDate = this.calculateIssueDate(newExpiryDate, duration);
    this.petForm.patchValue({
      issueDate: this.formatDate(newIssueDate)
    }, { emitEvent: false });
  }

  // Calculate duration in days based on package start and end dates
  private calculateDuration(packageStart: string, packageEnd: string): number {
    const start = new Date(packageStart);
    const end = new Date(packageEnd);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // Given an issue date and duration, calculate expiry date
  private calculateExpiryDate(issueDate: Date, duration: number): Date {
    const expiry = new Date(issueDate);
    expiry.setDate(expiry.getDate() + duration);
    return expiry;
  }

  // Given an expiry date and duration, calculate issue date
  private calculateIssueDate(expiryDate: Date, duration: number): Date {
    const issue = new Date(expiryDate);
    issue.setDate(issue.getDate() - duration);
    return issue;
  }

  // Format a date object as yyyy-MM-dd for date inputs
  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }

  // Add this helper method inside your component class
private parseDateString(dateStr: string): Date {
  if (!dateStr) {
    return new Date();
  }
  // If the date contains a space (e.g. "2025-03-05 00:00:00"), split and take the first part.
  if (dateStr.indexOf(' ') !== -1) {
    const [datePart] = dateStr.split(' ');
    return new Date(datePart);
  }
  return new Date(dateStr);
}


// In add-pet.component.ts
adoptPet(): void {
  if (this.selectedPet && this.selectedPet.id) {
    if (this.selectedPet.allow_adoption) {
      // Pet is already adopted; confirm removal.
      Swal.fire({
        title: 'Remove Adoption?',
        text: 'Are you sure you want to remove adoption from this pet?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it',
        cancelButtonText: 'Cancel'
      }).then((result: any) => {
        if (result.isConfirmed) {
          const payload = { allow_adoption: false };
          this.petSectionService.updateAdoptionStatus(this.selectedPet.id, payload).subscribe(
            (response: any) => {
              this.toastr.success('Adoption removed successfully!', 'Success');
              // Update local state to reflect the removal.
              this.selectedPet.allow_adoption = false;
            },
            (error: any) => {
              this.toastr.error('Failed to remove adoption status.', 'Error');
              console.error('Adoption removal error:', error);
            }
          );
        }
      });
    } else {
      // Pet is not adopted; confirm adoption.
      Swal.fire({
        title: 'Adopt Pet?',
        text: 'Are you sure you want to adopt this pet?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, adopt it',
        cancelButtonText: 'Cancel'
      }).then((result: any) => {
        if (result.isConfirmed) {
          const payload = { allow_adoption: true };
          this.petSectionService.updateAdoptionStatus(this.selectedPet.id, payload).subscribe(
            (response: any) => {
              this.toastr.success('Pet marked for adoption successfully!', 'Success');
              // Update local state.
              this.selectedPet.allow_adoption = true;
              // Navigate to the adoption page.
              this.router.navigate(['/view-pet-section', 'adoption']);
            },
            (error: any) => {
              this.toastr.error('Failed to mark pet for adoption.', 'Error');
              console.error('Adoption update error:', error);
            }
          );
        }
      });
    }
  } else {
    this.toastr.error('Adoption is only available for existing pets.', 'Error');
  }
}






matePet(): void {
  if (this.selectedPet && this.selectedPet.id) {
    const currentStatus = this.selectedPet.is_neutered;
    
    if (currentStatus === false || currentStatus === 'no') {
      // Pet is currently available for mating; confirm removal.
      Swal.fire({
        title: 'Remove Mating?',
        text: 'Are you sure you want to remove this pet from mating?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove mating',
        cancelButtonText: 'Cancel'
      }).then((result: any) => {
        if (result.isConfirmed) {
          const payload = { is_neutered: 'yes' };
          this.petSectionService.updateMatingStatus(this.selectedPet.id, payload).subscribe(
            (response: any) => {
              this.toastr.success('Mating status removed successfully!', 'Success');
              // Update local state.
              this.selectedPet.is_neutered = 'yes';
              // No navigation on removal.
            },
            (error: any) => {
              this.toastr.error('Failed to remove mating status.', 'Error');
              console.error('Mating removal error:', error);
            }
          );
        }
      });
    } else {
      // currentStatus is "yes" (pet is neutered, not available for mating)
      // Ask if the user wants to allow mating.
      Swal.fire({
        title: 'Allow Mating?',
        text: 'Are you sure you want to allow this pet to mate?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, allow mating',
        cancelButtonText: 'Cancel'
      }).then((result: any) => {
        if (result.isConfirmed) {
          const payload = { is_neutered: 1 };
          this.petSectionService.updateMatingStatus(this.selectedPet.id, payload).subscribe(
            (response: any) => {
              this.toastr.success('Mating enabled successfully!', 'Success');
              // Update local state.
              this.selectedPet.is_neutered = '1';
              // Navigate to the mating page
              this.router.navigate(['/view-pet-section', 'mating']);
            },
            (error: any) => {
              this.toastr.error('Failed to update mating status.', 'Error');
              console.error('Mating update error:', error);
            }
          );
        }
      });
    }
  } else {
    this.toastr.error('Mating is only available for existing pets.', 'Error');
  }
}





lostPet(): void {
  if (this.selectedPet && this.selectedPet.id) {
    if (this.selectedPet.is_lost) {
      // Pet is already lost; ask if the user wants to mark it as found.
      Swal.fire({
        title: 'Mark as Found?',
        text: 'Are you sure you want to mark this pet as found?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, mark as found',
        cancelButtonText: 'Cancel'
      }).then((result: any) => {
        if (result.isConfirmed) {
          const payload = { is_lost: false };
          this.petSectionService.updateLostStatus(this.selectedPet.id, payload).subscribe(
            (response: any) => {
              this.toastr.success('Pet marked as found successfully!', 'Success');
              // Update local state.
              this.selectedPet.is_lost = false;
              // No navigation on removal.
            },
            (error: any) => {
              this.toastr.error('Failed to update lost status.', 'Error');
              console.error('Lost status update error:', error);
            }
          );
        }
      });
    } else {
      // Pet is not lost; ask if the user wants to mark it as lost.
      Swal.fire({
        title: 'Mark as Lost?',
        text: 'Are you sure you want to mark this pet as lost?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, mark as lost',
        cancelButtonText: 'Cancel'
      }).then((result: any) => {
        if (result.isConfirmed) {
          const payload = { is_lost: true };
          this.petSectionService.updateLostStatus(this.selectedPet.id, payload).subscribe(
            (response: any) => {
              this.toastr.success('Pet marked as lost successfully!', 'Success');
              // Update local state.
              this.selectedPet.is_lost = true;
              // Navigate to the lost page.
              this.router.navigate(['/view-pet-section', 'lost']);
            },
            (error: any) => {
              this.toastr.error('Failed to update lost status.', 'Error');
              console.error('Lost status update error:', error);
            }
          );
        }
      });
    }
  } else {
    this.toastr.error('Lost status update is only available for existing pets.', 'Error');
  }
}




sellPet(): void {
  if (this.selectedPet && this.selectedPet.id) {
    if (this.selectedPet.allow_selling) {
      // Pet is already sold; confirm removal.
      Swal.fire({
        title: 'Remove Sell Status?',
        text: 'Are you sure you want to mark this pet as not sold?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it',
        cancelButtonText: 'Cancel'
      }).then((result: any) => {
        if (result.isConfirmed) {
          const payload = { allow_selling: false };
          this.petSectionService.updateSellingStatus(this.selectedPet.id, payload).subscribe(
            (response: any) => {
              this.toastr.success('Sell status removed successfully!', 'Success');
              // Update local state.
              this.selectedPet.allow_selling = false;
              // No navigation on removal.
            },
            (error: any) => {
              this.toastr.error('Failed to remove sell status.', 'Error');
              console.error('Sell status removal error:', error);
            }
          );
        }
      });
    } else {
      // Pet is not sold; confirm sell.
      Swal.fire({
        title: 'Sell Pet?',
        text: 'Are you sure you want to mark this pet as sold?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, sell it',
        cancelButtonText: 'Cancel'
      }).then((result: any) => {
        if (result.isConfirmed) {
          const payload = { allow_selling: true };
          this.petSectionService.updateSellingStatus(this.selectedPet.id, payload).subscribe(
            (response: any) => {
              this.toastr.success('Pet marked as sold successfully!', 'Success');
              // Update local state.
              this.selectedPet.allow_selling = true;
              // Navigate to the Sell page.
              this.router.navigate(['/view-pet-section', 'sell']);
            },
            (error: any) => {
              this.toastr.error('Failed to mark pet as sold.', 'Error');
              console.error('Sell status update error:', error);
            }
          );
        }
      });
    }
  } else {
    this.toastr.error('Selling status update is only available for existing pets.', 'Error');
  }
}











  onSubmit(): void {
    if (this.petForm.valid) {
      const petData = {
        name: this.petForm.value.petName,
        breed: this.petForm.value.breed,
        weight: this.petForm.value.weight,
        is_vaccinated: this.petForm.value.vaccinated,
        is_microchipped: this.petForm.value.microchipped,
        is_neutered: this.petForm.value.neutered,
        collarNo: this.petForm.value.collarNo,
        gender: this.petForm.value.gender,
        height: this.petForm.value.height,
        description: this.petForm.value.bio,
        pet_type: this.petForm.value.petType,
        age: this.petForm.value.age,
        color: this.petForm.value.colour,
        pet_owner_id: this.petForm.value.pet_owner_id,
        firstIssue: this.petForm.value.firstIssue,
        issueDate: this.petForm.value.issueDate,
        expiryDate: this.petForm.value.expiryDate,
        packageType: this.petForm.value.packageType,
        status: this.petForm.value.status,
        period: this.petForm.value.period,
        payType: this.petForm.value.payType,
        totalPrice: this.petForm.value.totalPrice,
        delivery: this.petForm.value.delivery,
        image: this.petImageBase64 // Added image data
      };

      if (this.selectedPet && this.selectedPet.id) {
        // Update pet scenario
        this.petSectionService.updatePet(this.selectedPet.id, petData).subscribe(
          (petResponse: any) => {
            // Check if a package is chosen
            if (this.petForm.value.packageType) {
              // If membership already exists in selectedPet, update it; otherwise, add new
              if (this.selectedPet.membership && this.selectedPet.membership.id) {
                const membershipData = {
                  price: this.petForm.value.totalPrice,
                  start_date: this.petForm.value.issueDate,
                  end_date: this.petForm.value.expiryDate,
                  package_id: this.petForm.value.packageType,
                  pet_id: petResponse.id || this.selectedPet.id,
                  delivery: this.petForm.value.delivery,
                  status: this.petForm.value.status,
                  pay_type: this.petForm.value.payType
                };
                this.petSectionService.updateMembership(this.selectedPet.membership.id, membershipData).subscribe(
                  (membershipResponse) => {
                    this.toastr.success('Pet and membership updated successfully!', 'Success');
                    this.router.navigate(['/petownerlist']);
                    console.log('Update Response:', membershipResponse);
    if (membershipResponse.debug) {
      console.log('Debug logs:', membershipResponse.debug);
    }
                  },
                  (membershipError) => {
                    this.toastr.error('Failed to update membership.', 'Error');
                    console.error('Membership update error:', membershipError);
                  }
                );
              } else {
                // No membership exists, so add one
                const membershipData = {
                  price: this.petForm.value.totalPrice,
                  start_date: this.petForm.value.issueDate,
                  end_date: this.petForm.value.expiryDate,
                  package_id: this.petForm.value.packageType,
                  pet_id: petResponse.id || this.selectedPet.id,
                  delivery: this.petForm.value.delivery,
                  status: this.petForm.value.status,
                  pay_type: this.petForm.value.payType
                };
                this.petSectionService.addMembership(membershipData).subscribe(
                  (membershipResponse) => {
                    this.toastr.success('Pet and membership updated successfully!', 'Success');
                    this.router.navigate(['/petownerlist']);
                  },
                  (membershipError) => {
                    this.toastr.error('Failed to add membership.', 'Error');
                    console.error('Membership add error:', membershipError);
                  }
                );
              }
            } else {
              this.toastr.success('Pet updated successfully!', 'Success');
              this.router.navigate(['/petownerlist']);
              
            }
          },
          (error) => {
            this.toastr.error('Failed to update pet.', 'Error');
            console.error('Update pet error:', error);
            const errorMsg = error.error && error.error.error 
    ? error.error.error 
    : JSON.stringify(error.error || error);
this.toastr.error(`Failed to update pet: ${errorMsg}`, 'Error');
console.error('Update pet error:', error);

console.error('Update pet error:', error);
    if (error.error && error.error.debug) {
      console.error('Debug logs:', error.error.debug);
    }
    this.toastr.error('Failed to update pet.', 'Error');
          }
        );
      } else {
        // Create new pet scenario
        this.petSectionService.addPet(petData).subscribe(
          (petResponse: any) => {
            // If a package is chosen, add membership after pet creation
            if (this.petForm.value.packageType) {
              const membershipData = {
                price: this.petForm.value.totalPrice,
                start_date: this.petForm.value.issueDate,
                end_date: this.petForm.value.expiryDate,
                package_id: this.petForm.value.packageType,
                pet_id: petResponse.id,
                delivery: this.petForm.value.delivery,
                status: this.petForm.value.status,
                pay_type: this.petForm.value.payType
              };
              this.petSectionService.addMembership(membershipData).subscribe(
                (membershipResponse) => {
                  this.toastr.success('Pet and membership added successfully!', 'Success');
                  this.router.navigate(['/petownerlist']);
                },
                (membershipError) => {
                  this.toastr.error('Failed to add membership.', 'Error');
                  console.error('Membership add error:', membershipError);
                }
              );
            } else {
              this.toastr.success('Pet added successfully!', 'Success');
              this.router.navigate(['/petownerlist']);
            }
          },
          (error) => {
            this.toastr.error('Failed to add pet.', 'Error');
            console.error('Add pet error:', error);
          }
        );
      }
    } else {
      this.toastr.error('Please fill in all required fields.', 'Error');
    }
  }




  handleTransfer(email: string): void {
    // Search for owner by email.
    this.petSectionService.searchOwnerByEmail(email).subscribe(
      (owner: any) => {
        // Owner found. Ask for confirmation.
        Swal.fire({
          title: 'Confirm Transfer?',
          text: 'Owner found. Are you sure you want to transfer ownership of this pet?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, transfer it',
          cancelButtonText: 'Cancel'
        }).then((result: any) => {
          if (result.isConfirmed) {
            const newOwnerId = owner.id;
            // Update the pet's owner id.
            this.petSectionService.updatePetOwner(this.selectedPet.id, { pet_owner_id: newOwnerId }).subscribe(
              (response: any) => {
                this.toastr.success('Pet transferred successfully!', 'Success');
                // Optionally update local state if needed.
              },
              (error: any) => {
                this.toastr.error('Failed to transfer pet.', 'Error');
                console.error('Update pet owner error:', error);
                // Display error details from the backend if available
    const errorMsg = error.error && error.error.error 
    ? error.error.error 
    : JSON.stringify(error.error || error);
this.toastr.error(`Failed to update pet: ${errorMsg}`, 'Error');
console.error('Update pet error:', error);
              }
            );
          }
        });
      },
      (error: any) => {
        this.toastr.error('Owner not found with provided email.', 'Error');
        console.error('Search owner error:', error);
      }
    );
  }



  onBack(): void {
    this.router.navigate(['/petownerlist']);
  }
}
