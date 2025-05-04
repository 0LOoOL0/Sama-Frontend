import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionLostMateComponent } from './adoption-lost-mate.component';

describe('AdoptionLostMateComponent', () => {
  let component: AdoptionLostMateComponent;
  let fixture: ComponentFixture<AdoptionLostMateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionLostMateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionLostMateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
