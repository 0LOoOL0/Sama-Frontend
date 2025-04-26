import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAdDesignPromotionComponent } from './custom-ad-design-promotion.component';

describe('CustomAdDesignPromotionComponent', () => {
  let component: CustomAdDesignPromotionComponent;
  let fixture: ComponentFixture<CustomAdDesignPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomAdDesignPromotionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomAdDesignPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
