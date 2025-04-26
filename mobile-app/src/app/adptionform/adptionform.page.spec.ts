import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdptionformPage } from './adptionform.page';

describe('AdptionformPage', () => {
  let component: AdptionformPage;
  let fixture: ComponentFixture<AdptionformPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdptionformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
