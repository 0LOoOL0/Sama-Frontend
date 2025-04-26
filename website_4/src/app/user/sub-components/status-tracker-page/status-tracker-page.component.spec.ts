import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTrackerPageComponent } from './status-tracker-page.component';

describe('StatusTrackerPageComponent', () => {
  let component: StatusTrackerPageComponent;
  let fixture: ComponentFixture<StatusTrackerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusTrackerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusTrackerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
