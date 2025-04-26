import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.page.html',
  styleUrls: ['./approval.page.scss'],
})
export class ApprovalPage implements OnInit {
  currentState: 'waiting' | 'approved' = 'waiting';

  constructor() { }

  ngOnInit() {
    this.startProgress();
  }

  startProgress() {
    setTimeout(() => {
      this.currentState = 'approved';
    }, 50000); // 50 seconds to move from waiting to approved
  }

  onDone() {
    // Handle the done button click, maybe navigate to another page
  }
}