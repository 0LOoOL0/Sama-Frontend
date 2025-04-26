import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCardDetailsPage } from './my-card-details.page';

describe('MyCardDetailsPage', () => {
  let component: MyCardDetailsPage;
  let fixture: ComponentFixture<MyCardDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCardDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
