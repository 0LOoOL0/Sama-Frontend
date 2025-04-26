import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetdetailesPage } from './petdetailes.page';

describe('PetdetailesPage', () => {
  let component: PetdetailesPage;
  let fixture: ComponentFixture<PetdetailesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PetdetailesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
