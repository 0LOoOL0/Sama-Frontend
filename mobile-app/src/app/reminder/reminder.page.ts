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
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  tag: String = "Booking";
  pets: Pet[] = [];
  petOwnerId: number = 0;
  selectedIndex = -1;
  selectedPetId: number | undefined;
  selectedPet: Pet | undefined;
  selectedMonth: string = '';
  selectedDate: string = '';
  reminderForm: FormGroup;
  availability: string[] = [];
  selectedTime: string | null = null;
  minDate: string = new Date().toISOString();
  maxDate: string = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();
  timeSlots: string[] = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
  // timeSlots: string[] = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30', '11:00 AM', '11:30 AM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'];
  providerId: number | undefined;
  provider: Provider | undefined;
  days = [
    { name: 'M', key: 'mon', available: false },
    { name: 'T', key: 'tue', available: false },
    { name: 'W', key: 'wed', available: false },
    { name: 'T', key: 'thu', available: false },
    { name: 'F', key: 'fri', available: false },
    { name: 'S', key: 'sat', available: false },
    { name: 'S', key: 'sun', available: false },
  ];
  petEvents : Reminder[]= [];

  groupedEvents: { date: string; events: Reminder[] }[] = [];
  todayEvents: Reminder[] = [];
  today: string = new Date().toISOString().split('T')[0];
  highlightedDates: any[];
  isModalOpen = false;
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
    this.highlightedDates = this.petEvents.map(event => ({
      date: event.date,
      textColor: '#800080',
      backgroundColor: '#ffc0cb',
    }));
    console.log('hDates', this.highlightedDates);

    this.reminderForm = this.fb.group({
      pet_id: [null],
      // Other form controls...
    });

  }
  remove(reminderId: number) {
    this.reminderService.deleteReminder(reminderId).then(async () => {
      // Remove the reminder from local state
      this.petEvents = this.petEvents.filter(remind => remind.id !== reminderId);
      this.groupEventsByDate();
      this.todayEvents = this.groupedEvents.find(group => group.date === this.today)?.events || [];
  
      // Show success message
      const toast = await this.toastController.create({
        message: 'Reminder deleted successfully',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    }).catch(async error => {
      // Show error message
      const toast = await this.toastController.create({
        message: 'Error deleting reminder',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      console.error('Error deleting reminder:', error);
    });
  }
  pop(index: number,provider_id: number) {
    this.selectedIndex = index;
    this.loadProviderData(provider_id);
    this.setOpen(true);
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }



  async ngOnInit() {
    this.groupEventsByDate();


    try {
      const profileData = await this.authService.getProfile();
      this.petOwnerId = profileData.id;
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
  }
  

  selectPet(petId: number) {
    console.log(petId);
    this.selectedPetId = petId;
    this.selectedPet = this.pets.find(pet => pet.id === petId);
    this.reminderForm.patchValue({ pet_id: petId });
    this.fetchRemindersByPetId(petId);
  }
  
  async fetchRemindersByPetId(petId: number) {
    try {
      const response = await this.reminderService.getRemindersByPetId(petId);
      this.petEvents = response.data;
      this.groupEventsByDate();
      console.log('Grouped Events:', this.petEvents);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  }
  async loadProviderData(id: number) {
    this.providerService.getProviderById(id).then(
      response => {
        if (Array.isArray(response.data)) {
          this.provider = response.data[0];
        } else {
          this.provider = response.data;
          console.log(response.data)
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





  groupEventsByDate() {
    const eventMap = new Map<string, Reminder[]>();
  
    // Get the current date and time
    const now = new Date();
  
    this.petEvents.forEach(event => {
      // Parse the event date and time
      const eventDate = new Date(event.date); // Assuming event.date is 'YYYY-MM-DD'
      const [hours, minutes, seconds] = event.time.split(':').map(Number); // Assuming event.time is 'HH:MM:SS'
  
      // Set the hours, minutes, and seconds on the eventDate
      eventDate.setHours(hours, minutes, seconds);
  
      // Debugging output
      console.log('Processing event:', event, 'Event Date and Time:', eventDate, 'Current Date and Time:', now);
  
      // Check if the event is today
      const isSameDay = eventDate.toDateString() === now.toDateString();
  
      if (isSameDay) {
        // If it's today, compare the time
        if (eventDate >= now) {
          const formattedDate = eventDate.toISOString().split('T')[0];
          if (!eventMap.has(formattedDate)) {
            eventMap.set(formattedDate, []);
          }
          eventMap.get(formattedDate)!.push(event);
        } else {
          // Debugging for events that are skipped because their time has passed
          console.log('Event time has passed, skipping:', event);
        }
      } else if (eventDate > now) {
        // If the event is in the future (beyond today), add it to the map
        const formattedDate = eventDate.toISOString().split('T')[0];
        if (!eventMap.has(formattedDate)) {
          eventMap.set(formattedDate, []);
        }
        eventMap.get(formattedDate)!.push(event);
      } else {
        // Debugging for events that are skipped because their date is in the past
        console.log('Event date is in the past, skipping:', event);
      }
    });
  
    // Convert the Map to an array of grouped events
    this.groupedEvents = Array.from(eventMap, ([date, events]) => ({
      date,
      events,
    }));
  
    // Debugging output
    console.log('Grouped Events:', this.groupedEvents);
  
    // Find today's events (including time consideration)
    this.todayEvents = this.groupedEvents.find(group => group.date === this.today)?.events || [];
  
    // Debugging output
    console.log('Today\'s Events:', this.todayEvents);
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-').map(Number);
    const dateObject = new Date(year, month - 1, day);

    const dayWithSuffix = this.getDayWithSuffix(day);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
    };
    const formattedDate = `${dayWithSuffix} ${dateObject.toLocaleDateString(
      'en-GB',
      options,
    )}`;

    return formattedDate;
  }

  private getDayWithSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }
}
