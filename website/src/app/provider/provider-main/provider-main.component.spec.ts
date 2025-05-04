import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMainComponent } from './provider-main.component';

describe('ProviderMainComponent', () => {
  let component: ProviderMainComponent;
  let fixture: ComponentFixture<ProviderMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
