import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VetclinicPage } from './vetclinic.page';

describe('VetclinicPage', () => {
  let component: VetclinicPage;
  let fixture: ComponentFixture<VetclinicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VetclinicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
