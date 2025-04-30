import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../services/blogs.service';
import { IBlog } from '../../../models/blog.interface'; // Shared interface

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class CreatePostComponent implements OnInit {
  blogForm: FormGroup;
  isEditMode: boolean = false;
  blogId: number | null = null;
  submitButtonText: string = 'Save Blog';


  // New properties for handling blog image
  blogImageFile: File | null = null;
  blogImageFileName: string = 'No file chosen';
  blogImageBase64: string | null = null;
  @ViewChild('blogFileInput') blogFileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      title_ar: ['', Validators.required],
      description_ar: ['', Validators.required],
      petType: ['', Validators.required],  // This field maps to backend's "tag"
      petType_ar: ['', Validators.required],  // This field maps to backend's "tag"
    });
  }

  ngOnInit(): void {
    // Check for an id parameter to decide if we're editing.
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.blogId = +params['id'];
        this.submitButtonText = 'Submit Update';

        // Fetch the blog details to populate the form.
        this.blogService.show(this.blogId).subscribe(
          response => {
            this.blogForm.patchValue({
              title: response.title,
              description: response.description,
              title_ar: response.title_ar,
              description_ar: response.description_ar,
              petType: response.tag // Map 'tag' to 'petType' in the form
            });

            // If the blog already has an image, load it:
            if (response.image) {
              this.blogImageBase64 = response.image;
            }
          },
          error => {
            console.error('Error fetching blog details', error);
          }
        );

      }
    });
  }


  // Called when the image is clicked—triggers the hidden file input.
  triggerBlogFileInput(): void {
    this.blogFileInput.nativeElement.click();
  }

  // File selection handler for blog image
  onBlogImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        // Optionally show an error message/toast here.
        this.blogImageFile = null;
        this.blogImageFileName = 'No file chosen';
        return;
      }
      this.blogImageFile = file;
      this.blogImageFileName = file.name;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          this.blogImageBase64 = e.target.result as string;
          console.log('Blog image Base64:', this.blogImageBase64);
        }
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit() {

  //    console.log('Form Valid:', this.blogForm.valid); // Check form validity
  // if (this.blogForm.valid) {
  //   // existing code...
  // } else {
  //   console.error('Form is invalid', this.blogForm.errors);
  // }

    if (this.blogForm.valid) {
      const blogData: IBlog = {
        id: this.blogId ? this.blogId : 0, // For new posts, id is 0.
        ...this.blogForm.value,
        image: this.blogImageBase64, // new image data (Base64 string)
        created_at: new Date()
      };

      if (this.isEditMode) {
        // Update the blog
        this.blogService.update(blogData).subscribe(response => {
          console.log('Blog updated successfully', response);
          this.router.navigate(['/all-blogs']);
        }, error => {
          console.error('Error updating blog', error);
        });
      } else {
        // Create a new blog
        this.blogService.add(blogData).subscribe(response => {
          console.log('Blog saved successfully', response);
          this.router.navigate(['/all-blogs']);
        }, error => {
          console.error('Error saving blog', error);
        });
      }
    }
  }

  navigateToBlog() {
    this.router.navigate(['/all-blogs']);
  }
}
