import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetinfoService } from '../../../services/petinfo.service';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-mating-profile',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './mating-profile.component.html',
  styleUrls: ['./mating-profile.component.css']
})
export class MatingProfileComponent implements OnInit {
  petProfile: any;

  constructor(private route: ActivatedRoute, private petService: PetinfoService) {}

  ngOnInit(): void {
    const petId = this.route.snapshot.paramMap.get('id');
    if (petId) {
      this.getPetProfile(Number(petId));
    }
  }

  getPetProfile(petId: number): void {
    this.petService.getPet(petId).subscribe(
      (data) => {
        this.petProfile = data;
      },
      (error) => {
        console.error('Error fetching pet profile', error);
      }
    );
  }

  sharePetProfile(platform: string): void {
    console.log(`Sharing pet profile on ${platform}`);
    // Code to share profile on different platforms.
  }
}
