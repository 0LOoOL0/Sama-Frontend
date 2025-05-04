import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderProductComponent } from './provider-product.component';

describe('ProviderProductComponent', () => {
  let component: ProviderProductComponent;
  let fixture: ComponentFixture<ProviderProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
