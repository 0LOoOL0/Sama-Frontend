import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMyProfileComponent } from './new-my-profile.component';

describe('NewMyProfileComponent', () => {
  let component: NewMyProfileComponent;
  let fixture: ComponentFixture<NewMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMyProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
