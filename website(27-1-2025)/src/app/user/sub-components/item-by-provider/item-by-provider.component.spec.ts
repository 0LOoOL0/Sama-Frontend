import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemByProviderComponent } from './item-by-provider.component';

describe('ItemByProviderComponent', () => {
  let component: ItemByProviderComponent;
  let fixture: ComponentFixture<ItemByProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemByProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemByProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
