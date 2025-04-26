import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdoptionlistPage } from './adoptionlist.page';

describe('AdoptionlistPage', () => {
  let component: AdoptionlistPage;
  let fixture: ComponentFixture<AdoptionlistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
