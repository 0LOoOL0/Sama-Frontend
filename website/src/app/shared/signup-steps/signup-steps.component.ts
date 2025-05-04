import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

@Component({
  selector: 'app-signup-steps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup-steps.component.html',
  styleUrl: './signup-steps.component.css'
})
export class SignupStepsComponent implements OnChanges {
  @Input({required: false}) progress: number = 1;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['progress']) {
      this.updateProgressBar();
    }
  }

  private updateProgressBar() {
    const progressBar = this.elementRef.nativeElement.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.setAttribute('data-progress', this.progress.toString());
    }
  }
}