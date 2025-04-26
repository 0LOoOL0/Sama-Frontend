import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SamaPetStorePage } from './sama-pet-store.page';

describe('SamaPetStorePage', () => {
  let component: SamaPetStorePage;
  let fixture: ComponentFixture<SamaPetStorePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SamaPetStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
