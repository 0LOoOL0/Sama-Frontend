import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddNewOwnerProfileComponent } from '../add-new-owner-profile/add-new-owner-profile.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-add-new-owner',
  standalone: true,  // optional, only needed if you're using Angular standalone components
  imports: [CommonModule, AddNewOwnerProfileComponent, RouterOutlet],
  templateUrl: './add-new-owner.component.html',
  styleUrls: ['./add-new-owner.component.css']
})
export class AddNewOwnerComponent {

}
