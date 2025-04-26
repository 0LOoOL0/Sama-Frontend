import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketInfoPage } from './marketinfo.page';

describe('MarketinfoPage', () => {
  let component: MarketInfoPage;
  let fixture: ComponentFixture<MarketInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
