import { Component, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReminderService } from '../../../services/reminder.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-reminderform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './reminderform.component.html',
  styleUrl: './reminderform.component.css'
})
export class ReminderformComponent implements OnInit {
  currentMonthYear!: string;
  calendarDays: number[][] = [];
  currentDate: Date = new Date();
  weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  reminderForm: FormGroup;
  petOwnerId: number | null = null;
  selectedValue: string = 'Never';
  isChecked: boolean = false;
  isDropdownOpen: boolean = false;

  @ViewChild('dropdownButton') dropdownButton!: ElementRef;
  @ViewChild('dropdownList') dropdownList!: ElementRef;

  reminderId: number | null = null; // <-- for edit mode

  constructor(
    private fb: FormBuilder,
    private reminderService: ReminderService,
    private authService: UserAuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.reminderForm = this.fb.group({
      title: [''],
      date: [''],
      startTime: [''],
      endTime: [''],
      remind: [false],
      repeat: ['Never'],
      note: ['']
    });
  }

  ngOnInit(): void {
    this.generateCalendar();

    this.authService.getAuthenticatedPetOwnerId()
      .then(id => {
        this.petOwnerId = id;

        // Check for edit mode
        const idParam = this.route.snapshot.queryParamMap.get('id');
        if (idParam) {
          this.reminderId = +idParam;
          this.loadReminderData(this.reminderId);
        }
      })
      .catch(err => console.error('Error fetching pet owner ID', err));
  }

  async loadReminderData(id: number) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/api/reminders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const reminder = (response.data as { data: any }).data;


      this.reminderForm.patchValue({
        title: reminder.title,
        date: reminder.date,
        startTime: reminder.time?.slice(0, 5),

        remind: !!reminder.remind,
        repeat: reminder.repeat,
        note: reminder.note
      });

      this.selectedValue = reminder.repeat;
      this.isChecked = !!reminder.remind;

    } catch (error) {
      console.error('Failed to load reminder for edit:', error);
    }
  }

  async onSubmit() {
    const token = localStorage.getItem('token');
    if (!token || !this.petOwnerId) {
      console.error('Missing token or pet owner ID');
      return;
    }

    const formValue = this.reminderForm.getRawValue();
    const payload = {
      pet_owner_id: this.petOwnerId,
      pet_id: null,
      provider_id: null,
      title: formValue.title,
      date: formValue.date,
      time: formValue.startTime,
      remind: formValue.remind ? 1 : 0,
      repeat: this.selectedValue,
      note: formValue.note
    };

    try {
      if (this.reminderId) {
        await axios.put(`http://127.0.0.1:8000/api/reminders/${this.reminderId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Reminder updated successfully');
      } else {
        await axios.post('http://127.0.0.1:8000/api/reminders', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Reminder created successfully');
      }

      this.router.navigate(['/user-main-component/reminder-list']);
    } catch (err) {
      console.error('Reminder submission failed:', err);
    }

    this.router.navigate(['/user-main-component/reminder-list']);

  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectDropdownItem(value: string): void {
    this.selectedValue = value;
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    if (
      this.dropdownButton &&
      this.dropdownList &&
      !this.dropdownButton.nativeElement.contains(event.target) &&
      !this.dropdownList.nativeElement.contains(event.target)
    ) {
      this.isDropdownOpen = false;
    }
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isChecked = checkbox.checked;
  }

  generateCalendar() {
    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
    this.currentMonthYear = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(this.currentDate);
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    let week: number[] = [];
    this.calendarDays = [];

    for (let i = 0; i < adjustedFirstDay; i++) week.push(0);
    for (let day = 1; day <= daysInMonth; day++) {
      if (week.length === 7) {
        this.calendarDays.push(week);
        week = [];
      }
      week.push(day);
    }
    while (week.length < 7) week.push(0);
    this.calendarDays.push(week);
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }
}
