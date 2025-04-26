import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionErrorComponent } from './adoption-error.component';

describe('AdoptionErrorComponent', () => {
  let component: AdoptionErrorComponent;
  let fixture: ComponentFixture<AdoptionErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
