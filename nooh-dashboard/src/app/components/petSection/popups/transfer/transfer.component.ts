import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  @Output() transfer = new EventEmitter<string>();
  @Output() closeForm = new EventEmitter<void>();

  onSave() {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const email = emailInput ? emailInput.value : '';
    if (email) {
      this.transfer.emit(email);
    }
    this.closeForm.emit();
  }
}
