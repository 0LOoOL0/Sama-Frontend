import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SamaPage } from './sama.page';

describe('SamaPage', () => {
  let component: SamaPage;
  let fixture: ComponentFixture<SamaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SamaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
