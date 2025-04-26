import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deletion-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './deletion-confirmation.component.html',
  styleUrl: './deletion-confirmation.component.scss'
})
export class DeletionConfirmationComponent {
  @Input() popUpMessage: string = '';
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();


ngOnInit() {
}
onCancel() {
this.cancel.emit();
}
onDelete() {
this.delete.emit();
}
}
