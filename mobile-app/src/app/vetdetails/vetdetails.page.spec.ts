import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VetdetailsPage } from './vetdetails.page';

describe('VetdetailsPage', () => {
  let component: VetdetailsPage;
  let fixture: ComponentFixture<VetdetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VetdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
