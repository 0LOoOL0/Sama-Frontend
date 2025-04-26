import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sama1Page } from './sama1.page';

describe('Sama1Page', () => {
  let component: Sama1Page;
  let fixture: ComponentFixture<Sama1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Sama1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
