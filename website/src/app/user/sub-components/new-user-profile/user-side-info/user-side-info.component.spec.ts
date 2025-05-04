import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSideInfoComponent } from './user-side-info.component';

describe('UserSideInfoComponent', () => {
  let component: UserSideInfoComponent;
  let fixture: ComponentFixture<UserSideInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSideInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSideInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
