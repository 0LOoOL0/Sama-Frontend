import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderGallaryComponent } from './provider-gallary.component';

describe('ProviderGallaryComponent', () => {
  let component: ProviderGallaryComponent;
  let fixture: ComponentFixture<ProviderGallaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderGallaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderGallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
