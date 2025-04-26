import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSignComponent } from './log-sign.component';

describe('LogSignComponent', () => {
  let component: LogSignComponent;
  let fixture: ComponentFixture<LogSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogSignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
