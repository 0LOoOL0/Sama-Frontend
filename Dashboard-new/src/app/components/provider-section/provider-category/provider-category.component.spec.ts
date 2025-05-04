import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCategoryComponent } from './provider-category.component';

describe('ProviderCategoryComponent', () => {
  let component: ProviderCategoryComponent;
  let fixture: ComponentFixture<ProviderCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
