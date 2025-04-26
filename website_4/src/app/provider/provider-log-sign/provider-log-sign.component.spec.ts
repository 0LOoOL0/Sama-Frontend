import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderLogSignComponent } from './provider-log-sign.component';

describe('ProviderLogSignComponent', () => {
  let component: ProviderLogSignComponent;
  let fixture: ComponentFixture<ProviderLogSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderLogSignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderLogSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
