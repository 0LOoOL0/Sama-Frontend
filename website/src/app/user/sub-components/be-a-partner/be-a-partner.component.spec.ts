import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeAPartnerComponent } from './be-a-partner.component';

describe('BeAPartnerComponent', () => {
  let component: BeAPartnerComponent;
  let fixture: ComponentFixture<BeAPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeAPartnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeAPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
