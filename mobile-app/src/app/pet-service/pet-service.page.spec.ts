import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetServicePage } from './pet-service.page';

describe('PetServicePage', () => {
  let component: PetServicePage;
  let fixture: ComponentFixture<PetServicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PetServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
