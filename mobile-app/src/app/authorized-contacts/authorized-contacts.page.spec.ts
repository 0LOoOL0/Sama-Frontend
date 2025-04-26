import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorizedContactsPage } from './authorized-contacts.page';

describe('AuthorizedContactsPage', () => {
  let component: AuthorizedContactsPage;
  let fixture: ComponentFixture<AuthorizedContactsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
