import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPetProfileComponent } from './setup-pet-profile.component';

describe('SetupPetProfileComponent', () => {
  let component: SetupPetProfileComponent;
  let fixture: ComponentFixture<SetupPetProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupPetProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupPetProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
