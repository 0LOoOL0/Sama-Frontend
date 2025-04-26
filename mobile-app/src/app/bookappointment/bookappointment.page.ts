import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService, Provider } from '../services/provider.service';
import { ReminderService, Reminder } from '../services/reminder.service'; 
import { PetInfoService, Pet } from '../services/pet-info.service'; 
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.page.html',
  styleUrls: ['./bookappointment.page.scss'],
})
export class BookappointmentPage implements OnInit {
  pets: Pet[] = [];
  selectedPetId: number | undefined;
  selectedMonth: string = '';
  selectedDate: string = '';
  availability: string[] = [];
  selectedTime: string | null = null;
  minDate: string = new Date().toISOString();
  maxDate: string = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();
  timeSlots: string[] = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
  // timeSlots: string[] = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30', '11:00 AM', '11:30 AM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'];
  providerId: number | undefined;
  serviceId: number | undefined;
  title: string | undefined;
  provider: Provider | undefined;
  reminderForm: FormGroup;
  days = [
    { name: 'M', key: 'mon', available: false },
    { name: 'T', key: 'tue', available: false },
    { name: 'W', key: 'wed', available: false },
    { name: 'T', key: 'thu', available: false },
    { name: 'F', key: 'fri', available: false },
    { name: 'S', key: 'sat', available: false },
    { name: 'S', key: 'sun', available: false },
  ];
  specialNote: string = '';
  petOwnerId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private providerService: ProviderService,
    private reminderService: ReminderService,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private toastController: ToastController,
    private authService: AuthService,
    private petInfoService: PetInfoService
  ) { 
    this.reminderForm = this.fb.group({
      title: [this.activatedRoute.snapshot.paramMap.get('title')!, Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      remind: [false, Validators.required],
      repeat: ['Doesn\'t Repeat', Validators.required],
      note: [''],
      pet_id: [null],
      provider_id: +this.activatedRoute.snapshot.paramMap.get('provider')!
    });
  }

  async ngOnInit() {
    this.providerId = +this.activatedRoute.snapshot.paramMap.get('provider')!;

    try {
      const profileData = await this.authService.getProfile();
      this.petOwnerId = profileData.id;
      this.reminderForm.patchValue({
        pet_owner_id: this.petOwnerId
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
    
    this.petInfoService
    .fetchPets()
    .then((petsData: any) => {
      this.pets = petsData;
      console.log('Pets data:', this.pets);
    })
    .catch(error => {
      console.error('Error fetching pets data:', error);
    });
     
    if (this.providerId) {
      this.loadProviderData(this.providerId);
    }


  }

  selectPet(petId: number) {
    console.log(petId)
    this.selectedPetId = petId;
    this.reminderForm.patchValue({ pet_id: petId });
  }

  dateChanged(event: any) {
    const selectedDateTime = event.detail.value;
    const selectedDate = selectedDateTime.split('T')[0]; 
    this.reminderForm.patchValue({ date: selectedDate });
    this.selectedDate = selectedDate;
    console.log('Selected Date:', selectedDate);
  }
  
  async loadProviderData(id: number) {
    this.providerService.getProviderById(id).then(
      response => {
        if (Array.isArray(response.data)) {
          this.provider = response.data[0];
        } else {
          this.provider = response.data;
        }
        if (this.provider?.availability) {
          this.availability = JSON.parse(this.provider.availability);
          this.updateAvailability();
        }
      },
      error => {
        console.error('Error fetching provider details:', error);
      },
    );
  }

  updateAvailability() {
    this.days.forEach(day => {
      day.available = this.availability.includes(day.key);
    });
  }

  selectTime(slot: string) {
    this.selectedTime = slot;
    this.reminderForm.patchValue({ time: slot });
  }

  async submitReminder() {
    console.log('Form Valid:', this.reminderForm.valid);
    console.log('Form Values:', this.reminderForm.value);
    console.log('Form Errors:', this.reminderForm.errors);

    if (this.reminderForm.valid) {
      const reminderData: Omit<Reminder, 'id'> = {
        ...this.reminderForm.value,
        pet_owner_id: this.petOwnerId,
        date: this.selectedDate,
        time: this.selectedTime,
        note: this.reminderForm.value.note,
        pet_id: this.reminderForm.value.pet_id,
        title: this.reminderForm.value.title,
        provider_id: this.reminderForm.value.provider_id
      };

      console.log('Submitting reminder with data:', reminderData);

      try {
        const response = await this.reminderService.addReminder(reminderData);
        console.log('Reminder submitted successfully:', response);

        const toast = await this.toastController.create({
          message: 'Reminder booked successfully!',
          duration: 2000,
          position: 'bottom',
          color: 'success'
          // cssClass: 'toast-success'
        });
        await toast.present();
        const defaultValues = {
          title: this.activatedRoute.snapshot.paramMap.get('title') || '',
          date: '',
          time: '',
          remind: false,
          repeat: 'Doesn\'t Repeat',
          note: '',
          pet_id: null,
          provider: +this.activatedRoute.snapshot.paramMap.get('provider')!
        };
        this.reminderForm.reset(defaultValues);
        this.selectedDate = '';
        this.selectedTime = null;
        this.specialNote = '';
      } catch (error) {
        console.error('Error submitting reminder:', error);

        const toast = await this.toastController.create({
          message: 'Failed to book reminder. Please try again.',
          duration: 2000,
          position: 'bottom',
          color: 'danger'
          // cssClass: 'toast-success'
        });
        await toast.present();
      }
    } else {
      console.warn('Form is invalid:', this.reminderForm.errors);

      const toast = await this.toastController.create({
        message: 'Please fill in all required fields.',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
        // cssClass: 'toast-success'
      });
      await toast.present();
    }
  }
}