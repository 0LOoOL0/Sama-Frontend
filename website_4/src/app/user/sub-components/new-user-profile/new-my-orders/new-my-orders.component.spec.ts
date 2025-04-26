import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMyOrdersComponent } from './new-my-orders.component';

describe('NewMyOrdersComponent', () => {
  let component: NewMyOrdersComponent;
  let fixture: ComponentFixture<NewMyOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMyOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
