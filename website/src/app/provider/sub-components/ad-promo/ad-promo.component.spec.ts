import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdPromoComponent } from './ad-promo.component';

describe('AdPromoComponent', () => {
  let component: AdPromoComponent;
  let fixture: ComponentFixture<AdPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdPromoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
