import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDiscountDetailsComponent } from './new-discount-details.component';

describe('NewDiscountDetailsComponent', () => {
  let component: NewDiscountDetailsComponent;
  let fixture: ComponentFixture<NewDiscountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDiscountDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDiscountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
