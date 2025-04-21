import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewOwnerProfileComponent } from './add-new-owner-profile.component';

describe('AddNewOwnerProfileComponent', () => {
  let component: AddNewOwnerProfileComponent;
  let fixture: ComponentFixture<AddNewOwnerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewOwnerProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewOwnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
