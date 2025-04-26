import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; 
import { ProviderService, Provider } from '../services/provider.service';
import { ReminderService, Reminder } from '../services/reminder.service'; 
import { PetInfoService, Pet } from '../services/pet-info.service'; 
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  groupedEvents: { date: string; events: Reminder[] }[] = [];
  todayEvents: Reminder[] = [];
  today: string = new Date().toISOString().split('T')[0];
  petOwnerId: number = 0;
  petEvents : Reminder[]= [];
  timeSlots: string[] = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30'];
  constructor(    private activatedRoute: ActivatedRoute,
    private providerService: ProviderService,
    private reminderService: ReminderService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private authService: AuthService,
    private petInfoService: PetInfoService) {
    // Sample data

  }

  async ngOnInit() {
    try {
      const profileData = await this.authService.getProfile();
      this.petOwnerId = profileData.id;
      this.fetchRemindersByOwnerId(this.petOwnerId);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
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

  groupEventsByDate() {
    const eventMap = new Map<string, Reminder[]>();
    const now = new Date();
  
    this.petEvents.forEach(event => {
      const eventDate = new Date(event.date); 
      const [hours, minutes, seconds] = event.time.split(':').map(Number);
      eventDate.setHours(hours, minutes, seconds);
  
      console.log('Processing event:', event, 'Event Date and Time:', eventDate, 'Current Date and Time:', now);
  
      const timeDifference = eventDate.getTime() - now.getTime(); // Difference in milliseconds
      const hourAndHalfInMillis = 1.5 * 60 * 60 * 1000; // 1 hour and 30 minutes in milliseconds
  
      // Include events that have passed or are within the next 1.5 hours
      if (timeDifference <= hourAndHalfInMillis) {
        const formattedDate = eventDate.toISOString().split('T')[0];
        if (!eventMap.has(formattedDate)) {
          eventMap.set(formattedDate, []);
        }
        eventMap.get(formattedDate)!.push(event);
      } else {
        console.log('Event is more than 1.5 hours ahead, skipping:', event);
      }
    });
  
    this.groupedEvents = Array.from(eventMap, ([date, events]) => ({
      date,
      events,
    }));
    
    console.log('Grouped Events:', this.groupedEvents);
    this.todayEvents = this.groupedEvents.find(group => group.date === this.today)?.events || [];
    console.log('Today\'s Events:', this.todayEvents);
  }



  async fetchRemindersByOwnerId(ownerId: number) {
    try {
      const response = await this.reminderService.getRemindersByOwnerId(ownerId);
      this.petEvents = response.data;
      this.groupEventsByDate();
      console.log('Grouped Events:', this.petEvents);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
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

