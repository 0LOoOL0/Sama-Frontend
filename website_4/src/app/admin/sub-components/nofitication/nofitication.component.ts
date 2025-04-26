import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'; // Import Angular Material Icon module

@Component({
  selector: 'app-nofitication',
  standalone: true,
  imports: [CommonModule , MatIconModule],
  templateUrl: './nofitication.component.html',
  styleUrl: './nofitication.component.scss'
})
export class NofiticationComponent {
addBox(arg0: string) {
throw new Error('Method not implemented.');
}

  boxes = [
    { title: 'Notification 1', content: 'Content for notification 1' },
    { title: 'Notification 2', content: 'Content for notification 2' },
    { title: 'Notification 3', content: 'Content for notification 3' },
  ];

  monthlyBoxes = [
    { title: 'Monthly Notification 1', content: 'Content for monthly notification 1' },
    { title: 'Monthly Notification 2', content: 'Content for monthly notification 2' },
    { title: 'Monthly Notification 3', content: 'Content for monthly notification 3' },
  ];

  allBoxes = [
    { title: 'All Notification 1', content: 'Content for all notification 1' },
    { title: 'All Notification 2', content: 'Content for all notification 2' },
    { title: 'All Notification 3', content: 'Content for all notification 3' },
    { title: 'All Notification 4', content: 'Content for all notification 4' },
    { title: 'All Notification 5', content: 'Content for all notification 5' },
    { title: 'All Notification 6', content: 'Content for all notification 6' },
  ];

  editNotification(item: any) {
    console.log('Edit:', item);
    // Implement edit logic here
  }

  deleteNotification(item: any) {
    console.log('Delete:', item);
    // Implement delete logic here
  }
}