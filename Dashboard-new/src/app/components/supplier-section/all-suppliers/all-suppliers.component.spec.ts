import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSuppliersComponent } from './all-suppliers.component';

describe('AllSuppliersComponent', () => {
  let component: AllSuppliersComponent;
  let fixture: ComponentFixture<AllSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSuppliersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
