import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  sectionStates: { [key: string]: boolean } = {
    memberships: false,
    orders: false,
    collars: false,
    adoptions: false,
    providers: false
  }

  toggleSection(section: string): void {
    this.sectionStates[section] = !this.sectionStates[section]
  }

  isSectionOpen(section: string): boolean {
    return this.sectionStates[section] || false
  }
}
