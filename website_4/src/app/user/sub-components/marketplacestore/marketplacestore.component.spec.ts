import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplacestoreComponent } from './marketplacestore.component';

describe('MarketplacestoreComponent', () => {
  let component: MarketplacestoreComponent;
  let fixture: ComponentFixture<MarketplacestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketplacestoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplacestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
