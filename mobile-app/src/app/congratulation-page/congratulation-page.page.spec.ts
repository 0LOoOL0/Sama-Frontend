import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CongratulationPagePage } from './congratulation-page.page';

describe('CongratulationPagePage', () => {
  let component: CongratulationPagePage;
  let fixture: ComponentFixture<CongratulationPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratulationPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
