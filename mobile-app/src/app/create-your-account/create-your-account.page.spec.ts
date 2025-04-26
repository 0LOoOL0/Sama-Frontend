import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateYourAccountPage } from './create-your-account.page';

describe('CreateYourAccountPage', () => {
  let component: CreateYourAccountPage;
  let fixture: ComponentFixture<CreateYourAccountPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateYourAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
