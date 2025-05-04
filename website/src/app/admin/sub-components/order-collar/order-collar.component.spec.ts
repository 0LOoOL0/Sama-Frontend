import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCollarComponent } from './order-collar.component';

describe('OrderCollarComponent', () => {
  let component: OrderCollarComponent;
  let fixture: ComponentFixture<OrderCollarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCollarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCollarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
