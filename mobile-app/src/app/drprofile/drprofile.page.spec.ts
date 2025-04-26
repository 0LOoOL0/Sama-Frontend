import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrprofilePage } from './drprofile.page';

describe('DrprofilePage', () => {
  let component: DrprofilePage;
  let fixture: ComponentFixture<DrprofilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DrprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
