import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Import Router
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.page.html',
  styleUrls: ['./newpassword.page.scss'],
})
export class NewpasswordPage implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) {} // Inject Router

  ngOnInit() {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async updatePassword() {
    if (this.password !== this.confirmPassword) {
      await this.showAlert('Passwords Not Matching', 'The password and its confirmation must be the same.');
      return;
    }
    const email = localStorage.getItem('email');
    if (!email) {
      await this.showAlert('Email Not Found', 'Your email is lost try enter your email again.');
      return;
    }

    this.authService.updatePass(email, this.password, this.confirmPassword)
      .then(response => {
        console.log("Password updated successfully:", response.message);
        this.showAlert('Password Updated Successfully', 'Please login with your new password.');

        // Route to the root page after successful update
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error("Failed to update password:", error);
        alert("Failed to update password. Please try again.");
      });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
  }
