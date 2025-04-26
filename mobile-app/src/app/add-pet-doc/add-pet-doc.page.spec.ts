import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPetDocPage } from './add-pet-doc.page';

describe('AddPetDocPage', () => {
  let component: AddPetDocPage;
  let fixture: ComponentFixture<AddPetDocPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPetDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
