import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyToLaunchPromotionComponent } from './ready-to-launch-promotion.component';

describe('ReadyToLaunchPromotionComponent', () => {
  let component: ReadyToLaunchPromotionComponent;
  let fixture: ComponentFixture<ReadyToLaunchPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadyToLaunchPromotionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyToLaunchPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
