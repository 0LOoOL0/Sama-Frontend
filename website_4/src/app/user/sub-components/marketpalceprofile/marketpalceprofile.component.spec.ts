import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketpalceprofileComponent } from './marketpalceprofile.component';

describe('MarketpalceprofileComponent', () => {
  let component: MarketpalceprofileComponent;
  let fixture: ComponentFixture<MarketpalceprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketpalceprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketpalceprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
