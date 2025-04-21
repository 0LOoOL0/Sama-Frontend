import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetOwnerService } from '../service/petSection.service';
import { CommonModule } from '@angular/common';
import { PetOwner } from '../model/owner.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

declare var Swal: any;
interface Package {
    id: number;
    title: string;
    // Add other properties if needed
}

interface Membership {
    pet_id: number;
    package_id: number;
    packageName: string;
    // Add other properties if needed
}

interface Pet {
    id: number;
    name: string;
    created_at: string;
    pet_owner_id: number;
    membership: Membership; // Each pet has one membership
}

@Component({
    selector: 'app-owner-profile',
    imports: [CommonModule, FormsModule],
    templateUrl: './owner-profile.component.html',
    styleUrls: ['./owner-profile.component.css'],
})
export class OwnerProfileComponent implements OnInit {
    loading: boolean = true;
    error: string | null = null;
    document: Document | null = null;
    petOwner: PetOwner | null = null;
    petCount: number = 0;
    selectedTab: number = 1;
    pets: any[] = [];
    membershipPets: any[] = [];
    tabs!: NodeListOf<HTMLButtonElement>;
    contents!: NodeListOf<HTMLElement>;

    constructor(
        private petOwnerService: PetOwnerService,
        private route: ActivatedRoute,
        private router: Router,

    ) { }

    ngOnInit(): void {

        const ownerId = this.route.snapshot.paramMap.get('id');
        if (ownerId) {
            this.loadOwnerData(ownerId);
            this.loadPets(ownerId);
            this.loadMembershipPets(+ownerId);

        } else {
            this.error = 'Owner ID not found.';
            this.loading = false;
            console.error(this.error);
        }
    }
    // Fetch pets with membership
    loadMembershipPets(ownerId: number): void {
        this.petOwnerService.getPetsWithMembershipByOwner(ownerId).subscribe(
            (data: any[]) => {
                this.membershipPets = data;
                console.log('Pets with membership:', this.membershipPets);

                this.membershipPets.forEach(pet => {
                    if (pet.membership && pet.membership.package) {
                        pet.membership.packageName = pet.membership.package.title || 'No package title';
                    }
                });
            },
            (error: any) => {
                console.error('Error fetching membership pets:', error);
            }
        );
    }
    // Fetch owner data
    loadOwnerData(ownerId: string): void {
        // console.log('Fetching data for Owner ID:', ownerId);
        this.petOwnerService.getOwnerDataById(ownerId).subscribe({
            next: (data) => {
                // console.log('Fetched Owner Data:', data);
                this.petOwner = data;
                this.loading = false;
            },
            error: () => {
                this.error = 'Owner not found.';
                this.loading = false;
                console.error(this.error);
            },
        });
    }
    // Fetch owner's pets
    loadPets(ownerId: string): void {
        const petOwnerId = +ownerId;
        // console.log('Fetching pets for Owner ID:', petOwnerId);

        if (!petOwnerId) {
            this.error = 'Invalid Owner ID.';
            console.error(this.error);
            return;
        }

        this.loading = true;
        this.petOwnerService.getPetsByOwnerId(petOwnerId).subscribe({
            next: (data) => {
                // console.log('Fetched Pets:', data);
                if (data.pets && data.pets.length > 0) {
                    this.pets = data.pets;
                    // console.log('Pets found:', this.pets);

                    // Counting the number of pets for the current owner
                    this.petCount = this.pets.length;
                    // console.log('Number of pets for this owner:', this.petCount);
                } else {
                    this.error = 'No pets found for this owner.';
                    // console.log('No pets found for Owner ID:', petOwnerId);
                }
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Error fetching pets.';
                this.loading = false;
                console.error('Error fetching pets:', err);
            },
        });
    }
    // tetsing id
    testOwner(): void {
        const ownerId = this.petOwnerService.getOwnerId();
        // console.log("Test2 - Owner ID:", ownerId);
    }
    // printing card || invoice
    printContent(type: string) {
        let printContent: HTMLElement | null;

        if (type === 'invoice') {
            printContent = document.getElementById('invoiceContent');
        } else if (type === 'card') {
            printContent = document.getElementById('cardContent');
        } else {
            console.error('Unknown content type');
            return;
        }

        if (!printContent) return;

        const originalBody = document.body.innerHTML;
        document.body.innerHTML = printContent.innerHTML;

        window.print();

        setTimeout(() => {
            document.body.innerHTML = originalBody;
            location.reload();
        }, 100);
    }
    // collar popup
    showPopup() {
        Swal.fire({
            title: 'Add Collar Code',
            width: '30%',
            html: `
            <form class="space-y-5 p-2" #form="ngForm">
              <div>
                <label for="collarCode" class="block text-sm font-medium text-gray-700 mb-1">
                  Collar Code
                </label>
                <input type="text" id="collarCode" name="collarCode" required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter Collar Code" />
              </div>
              <div class="flex justify-center gap-4 mt-4">
                <button type="submit"
                  class="w-60 blue-bg text-white py-2 rounded-3xl shadow hover:bg-blue-900 transition">
                  Submit
                </button>
              </div>
            </form>
          `,
            showConfirmButton: false,
            preConfirm: () => {
                const collarCode = (document.getElementById('collarCode') as HTMLInputElement).value;
                if (!collarCode) {
                    Swal.showValidationMessage('Please enter a collar code');
                }
                return { collarCode };
            }
        }).then((result: { isConfirmed: any; value: { collarCode: any; }; }) => {
            if (result.isConfirmed) {
                const { collarCode } = result.value;
                // console.log(`Collar Code: ${collarCode}`);
            }
        });
    }
    // navigate to order details
    orderDetails() {
        this.router.navigate(['/order-info']);
    }
    // navigate tabs
    selectTab(tabIndex: number): void {
        this.selectedTab = tabIndex;
    }
}

// loadMembershipPets(ownerId: number): void {
//     this.petOwnerService.getPetsWithMembershipByOwner(ownerId).subscribe(
//     (data: any) => {
//         this.membershipPets = data;
//         console.log('Pets with membership:', this.membershipPets);
//     },
//     (error: any) => {
//         console.error('Error fetching membership pets:', error);
//     }
//     );
// }
// loadMembershipPets(ownerId: number): void {
//     this.petOwnerService.getPetsWithMembershipByOwner(ownerId).subscribe(
//         (data: any) => {
//             this.membershipPets = data;
//             // console.log('Pets with membership:', this.membershipPets);
//         },
//         (error: any) => {
//             console.error('Error fetching membership pets:', error);
//         }
//     );
// }