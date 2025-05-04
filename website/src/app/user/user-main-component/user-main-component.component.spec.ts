import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMainComponentComponent } from './user-main-component.component';

describe('UserMainComponentComponent', () => {
  let component: UserMainComponentComponent;
  let fixture: ComponentFixture<UserMainComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMainComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
