import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferOwnershipFormComponent } from './transfer-ownership-form.component';

describe('TransferOwnershipFormComponent', () => {
  let component: TransferOwnershipFormComponent;
  let fixture: ComponentFixture<TransferOwnershipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferOwnershipFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferOwnershipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
