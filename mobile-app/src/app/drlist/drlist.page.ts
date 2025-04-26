import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProviderService } from '../services/provider.service';
import { AuthService } from '../services/auth.service';
import { FavService } from '../services/fav.service';
import { DoctorService } from '../services/doctor.service';
import { showToast } from '../../utilities/toast-utils';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-drlist',
  templateUrl: './drlist.page.html',
  styleUrls: ['./drlist.page.scss'],
})
export class DrlistPage implements OnInit {
  viewType: string = 'grid';
  showFilterModal: boolean = false;
  filterLayout: string = 'grid';
  selectedSpeciality: string | null = null;
  specialities: string[] = [
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Pediatrician',
  ];
  reviewRatings: number[] = [1, 2, 3, 4, 5];
  selectedReviewRating: number | null = null;
  searchTerm: string = '';
  doctors: any[] = [];
  loading: boolean = true;
  filteredDoctors: any[] = [];
  error: string | null = null;
  type: string = 'doctors';
  providerName: string | null = null;
  isSearchVisible: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private navCtrl: NavController,
    private providerService: ProviderService,
    private authService: AuthService,
    private favService: FavService,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.loadDoctors();
  }

  async loadDoctors() {
    this.loading = true;
    this.error = null;

    try {
      this.doctors = await this.doctorService.getAllDoctors();
      console.log('Doctors:', this.doctors);

      const providers = await this.providerService.getAllProviders2();
      console.log('Providers:', providers);

      const providerNamesMap: { [key: number]: string } = {};
      providers.forEach(provider => {
        providerNamesMap[provider.id] = provider.name;
      });
      console.log('Provider Names Map:', providerNamesMap);

      this.doctors = this.doctors.map(doctor => ({
        ...doctor,
        name: providerNamesMap[doctor.provider_id] || 'Unknown Provider',
      }));
      console.log('Doctors with Provider Names:', this.doctors);

      const profile = await this.authService.fetchProfileData();
      const petOwnerId = profile.id;

      this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
        const favoriteIds = favs.map(fav => fav.provider_id);

        this.doctors.forEach(doctor => {
          doctor.isFavorite = favoriteIds.includes(doctor.provider_id);
        });

        console.log('Doctors with Favorites:', this.doctors);
        this.filterDoctors();
      });
    } catch (error) {
      this.error = 'Failed to load doctor data.';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  openFilter() {
    this.showFilterModal = true;
  }

  openSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  dismissFilter() {
    this.showFilterModal = false;
  }

  applyFilter() {
    this.viewType = this.filterLayout;
    this.dismissFilter();
    this.filterDoctors();
  }

  resetFilter() {
    this.filterLayout = 'grid';
    this.selectedSpeciality = null;
    this.selectedReviewRating = null;
    this.searchTerm = '';
    this.loadDoctors();
    this.filterDoctors();
  }

  selectReviewRating(rating: number) {
    this.selectedReviewRating = rating;
    this.filterDoctors();
  }

  filterDoctors() {
    if (this.searchTerm.trim() === '') {
      this.filteredDoctors = this.doctors;
    } else {
      this.filteredDoctors = this.doctors.filter(doctor => {
        const matchesSpeciality = this.selectedSpeciality
          ? doctor.medical_degree_and_specializtion === this.selectedSpeciality
          : true;

        const matchesSearchTerm =
          (doctor.name || '')
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          (doctor.medical_degree_and_specializtion || '')
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());

        const matchesReviewRating =
          this.selectedReviewRating !== null
            ? doctor.averageRating !== undefined &&
              Math.round(doctor.averageRating) === this.selectedReviewRating
            : true;

        return matchesSpeciality && matchesSearchTerm && matchesReviewRating;
      });
    }

    console.log('Filtered Doctors:', this.filteredDoctors);
  }

  onSearchInput(event: any) {
    this.searchTerm = event.target.value;
    console.log('Search Term:', this.searchTerm);
    this.filterDoctors();
  }

  goToVetDetails(clinicId: number) {
    this.navCtrl.navigateForward(`/vetdetails/${this.type}/${clinicId}`);
  }

  addToFavorites(doctor: any) {
    console.log('Provider ID being passed:', doctor.provider_id);
    this.authService.fetchProfileData().then(profile => {
      const petOwnerId = profile.id;

      this.favService
        .isProviderInFavorites(petOwnerId, doctor.provider_id)
        .subscribe(isInFavorites => {
          if (isInFavorites) {
            this.favService.getFavsByPetOwnerId(petOwnerId).subscribe(favs => {
              const favToDelete = favs.find(
                fav => fav.provider_id === doctor.provider_id,
              );
              if (favToDelete && favToDelete.id !== undefined) {
                this.favService.deleteFav(favToDelete.id).subscribe(
                  async () => {
                    doctor.isFavorite = false;
                    console.log('Removed from favorites');
                    await showToast(
                      this.toastController,
                      'Removed from favorites',
                      'danger',
                    );
                  },
                  error => {
                    console.error('Error removing from favorites:', error);
                  },
                );
              }
            });
          } else {
            const fav = {
              pet_owner_id: petOwnerId,
              provider_id: doctor.provider_id,
            };
            this.favService.createFav(fav).subscribe(
              async () => {
                doctor.isFavorite = true;
                await showToast(
                  this.toastController,
                  'Added to favorites',
                  'success',
                );
                console.log('Added to favorites', doctor);
              },
              async error => {
                console.error('Error adding to favorites:', error);
                await showToast(
                  this.toastController,
                  'Error adding to favorites',
                  'danger',
                );
              },
            );
          }
        });
    });
  }
}
