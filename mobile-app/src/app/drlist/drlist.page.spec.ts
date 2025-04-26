import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrlistPage } from './drlist.page';

describe('DrlistPage', () => {
  let component: DrlistPage;
  let fixture: ComponentFixture<DrlistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DrlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
