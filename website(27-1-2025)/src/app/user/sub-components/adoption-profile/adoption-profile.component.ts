import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetinfoService } from '../../../services/petinfo.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adoption-profile', // Selector used to identify this component in HTML
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './adoption-profile.component.html', // Path to the component's HTML template
  styleUrls: ['./adoption-profile.component.css'] // Path to the component's CSS file
})
export class AdoptionProfileComponent implements OnInit {
  petProfile: any; // Object to hold the pet's profile data
  owner: any;
  direction: any;
  constructor(
    private route: ActivatedRoute,
    private petInfoService: PetinfoService,
    private auth: UserAuthService
  ) {}

  // Lifecycle hook that gets called after the component has been initialized
  async ngOnInit(): Promise<void> {
    // Get pet ID from the route and fetch pet profile data
    const petId = Number(this.route.snapshot.paramMap.get('id'));
    this.direction = this.route.snapshot.queryParamMap.get('direction') || '';
    if (petId) {
      await this.petInfoService.getPet(petId).subscribe((data: any) => {
        this.petProfile = data;
        this.loadProfile();
      });
      
    }
  }

  async loadProfile(): Promise<void> {
    try {
      const id = this.petProfile.pet_owner_id;
      const response = await this.auth.getPetOwnerData(id);
      this.owner = (response as any).data.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  calculateAge(birthdate: string | null): string {
    if (!birthdate) {
      return 'Unknown';
    }

    const today = new Date();
    const birthdateDate = new Date(birthdate);

    const ageInMonths = (today.getFullYear() - birthdateDate.getFullYear()) * 12 +
      today.getMonth() - birthdateDate.getMonth();

    if (ageInMonths < 12) {
      return ageInMonths + ' months';
    } else {
      let ageInYears = today.getFullYear() - birthdateDate.getFullYear();
      const monthDiff = today.getMonth() - birthdateDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateDate.getDate())) {
        ageInYears--;
      }

      return ageInYears + ' years';
    }
  }

}


