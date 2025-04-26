import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomAdPage } from './custom-ad.page';

describe('CustomAdPage', () => {
  let component: CustomAdPage;
  let fixture: ComponentFixture<CustomAdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
