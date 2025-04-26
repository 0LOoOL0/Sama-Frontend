import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSignupComponent } from './provider-signup.component';

describe('ProviderSignupComponent', () => {
  let component: ProviderSignupComponent;
  let fixture: ComponentFixture<ProviderSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
