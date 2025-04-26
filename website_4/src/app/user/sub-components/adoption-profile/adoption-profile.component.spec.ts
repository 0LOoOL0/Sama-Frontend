import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionProfileComponent } from './adoption-profile.component';

describe('AdoptionProfileComponent', () => {
  let component: AdoptionProfileComponent;
  let fixture: ComponentFixture<AdoptionProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
