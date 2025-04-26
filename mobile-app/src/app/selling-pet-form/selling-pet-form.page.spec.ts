import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellingPetFormPage } from './selling-pet-form.page';

describe('SellingPetFormPage', () => {
  let component: SellingPetFormPage;
  let fixture: ComponentFixture<SellingPetFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingPetFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
