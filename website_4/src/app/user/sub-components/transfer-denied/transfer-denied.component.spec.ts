import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDeniedComponent } from './transfer-denied.component';

describe('TransferDeniedComponent', () => {
  let component: TransferDeniedComponent;
  let fixture: ComponentFixture<TransferDeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferDeniedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
