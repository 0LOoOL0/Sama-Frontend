import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatingComponent } from './mating.component';

describe('MatingComponent', () => {
  let component: MatingComponent;
  let fixture: ComponentFixture<MatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
