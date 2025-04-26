import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHealthConcernComponent } from './new-health-concern.component';

describe('NewHealthConcernComponent', () => {
  let component: NewHealthConcernComponent;
  let fixture: ComponentFixture<NewHealthConcernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHealthConcernComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHealthConcernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
