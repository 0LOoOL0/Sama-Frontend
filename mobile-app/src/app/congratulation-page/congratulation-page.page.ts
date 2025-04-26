import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congratulation-page',
  templateUrl: './congratulation-page.page.html',
  styleUrls: ['./congratulation-page.page.scss'],
})
export class CongratulationPagePage {

  type: string = 'order';

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private router: Router) {}

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type') || '';
  }

  home() {
    this.router.navigate(['/mains']);
  }

  ionViewWillLeave() {
    console.log('Leaving the Congratulation Page');
    // Perform any cleanup actions here
  }
}