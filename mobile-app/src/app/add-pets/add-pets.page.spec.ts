import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPetsPage } from './add-pets.page';

describe('AddPetsPage', () => {
  let component: AddPetsPage;
  let fixture: ComponentFixture<AddPetsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
