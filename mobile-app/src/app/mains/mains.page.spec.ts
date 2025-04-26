import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainsPage } from './mains.page';

describe('MainsPage', () => {
  let component: MainsPage;
  let fixture: ComponentFixture<MainsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
