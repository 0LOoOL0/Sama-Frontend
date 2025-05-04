import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {
  englishForm!: FormGroup;
  arabicForm!: FormGroup;
  categories = ['Cat', 'Dog Training', 'General'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.englishForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.arabicForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  submitPost(): void {
    if (this.englishForm.valid && this.arabicForm.valid) {
      const englishPost = this.englishForm.value;
      const arabicPost = this.arabicForm.value;

      // Handle submission logic here
      console.log('English Post:', englishPost);
      console.log('Arabic Post:', arabicPost);
    } else {
      alert('Please fill out both forms.');
    }
  }
}
