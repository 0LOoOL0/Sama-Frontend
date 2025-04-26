import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-filtermodal',
  templateUrl: './filtermodal.component.html',
  styleUrls: ['./filtermodal.component.scss'],
})

export class FiltermodalComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  layout: string = 'list';
  priceRange: { lower: number; upper: number } = { lower: 0, upper: 100 };
  petType: string[] = [];
  reviews: string = '1';

  dismiss() {
    this.modalController.dismiss();
  }

  applyFilters() {
    const filters = {
      layout: this.layout,
      priceRange: this.priceRange,
      petType: this.petType,
      reviews: this.reviews,
    };
    this.modalController.dismiss(filters);
  }



}
