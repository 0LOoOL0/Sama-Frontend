import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorized-contacts',
  templateUrl: './authorized-contacts.page.html',
  styleUrls: ['./authorized-contacts.page.scss'],
})
export class AuthorizedContactsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

contacts = [
  {
    name: 'Brisbane Wonston',
    position: 'Store manager'
  },
  {
    name: 'Sarah Newland',
    position: 'General manager'
  }
];

 
addContact() {
 }
}