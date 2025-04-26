import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStatusTrackerComponent } from './new-status-tracker.component';

describe('NewStatusTrackerComponent', () => {
  let component: NewStatusTrackerComponent;
  let fixture: ComponentFixture<NewStatusTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStatusTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStatusTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
