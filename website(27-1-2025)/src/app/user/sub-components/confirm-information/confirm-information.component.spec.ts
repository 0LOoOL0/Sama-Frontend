import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInformationComponent } from './confirm-information.component';

describe('ConfirmInformationComponent', () => {
  let component: ConfirmInformationComponent;
  let fixture: ComponentFixture<ConfirmInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
