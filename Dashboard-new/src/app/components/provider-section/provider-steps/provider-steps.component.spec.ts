import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderStepsComponent } from './provider-steps.component';

describe('ProviderStepsComponent', () => {
  let component: ProviderStepsComponent;
  let fixture: ComponentFixture<ProviderStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderStepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
