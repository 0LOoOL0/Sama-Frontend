import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDiscountHistoryComponent } from './new-discount-history.component';

describe('NewDiscountHistoryComponent', () => {
  let component: NewDiscountHistoryComponent;
  let fixture: ComponentFixture<NewDiscountHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDiscountHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDiscountHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
