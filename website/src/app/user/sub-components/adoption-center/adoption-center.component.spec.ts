import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionCenterComponent } from './adoption-center.component';

describe('AdoptionCenterComponent', () => {
  let component: AdoptionCenterComponent;
  let fixture: ComponentFixture<AdoptionCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
