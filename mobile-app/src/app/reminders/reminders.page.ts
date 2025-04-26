import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { IconSelectorPage } from './icon-selector.page';
// import { DOBSelectorPage } from './dobselector.page';
// import { RepeatSelectorPage } from './repeat-selector.page';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
})
export class RemindersPage implements OnInit {
  selectedTag = '';
  tagOptions = ['Treatment', 'Vaccination'];

  repeat: string = 'Doesn’t Repeat';
  dateOfBirth: string = '';

  selectedDate = new Date().toISOString();

  tags: Array<{ title: string; tag: string }> = [];

  constructor(private modalController: ModalController) {}

  isOneOfOption() {
    // console.log('date', this.selectedDate);

    return this.tagOptions.find(t => t === this.selectedTag);
  }

  updateSelectedTag(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    // console.log({
    //   event,
    //   value: (event.target as HTMLInputElement).value,
    // });

    this.selectedTag = newValue;
  }
  // async openRepeatOptions() {
  //   const modal = await this.modalController.create({
  //     component: RepeatSelectorPage,
  //   });
  //   modal.onDidDismiss().then((data) => {
  //     if (data.data) {
  //       this.repeat = data.data;
  //     }
  //   });
  //   return await modal.present();
  // }

  // async openDateOfBirth() {
  // const modal = await this.modalController.create({
  //   component: DOBSelectorPage,
  // });
  // modal.onDidDismiss().then((data) => {
  //   if (data.data) {
  //     this.dateOfBirth = data.data;
  //   }
  // });
  // return await modal.present();
  // }

  // async openTags() {
  //   const modal = await this.modalController.create({
  //     component: IconSelectorPage,
  //   });
  //   modal.onDidDismiss().then((data) => {
  //     if (data.data) {
  //       this.tags.push(data.data);
  //     }
  //   });
  //   return await modal.present();
  // }

  ngOnInit() {}
}
