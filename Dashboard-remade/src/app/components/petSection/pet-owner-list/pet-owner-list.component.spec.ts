import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetOwnerListComponent } from './pet-owner-list.component';

describe('PetOwnerListComponent', () => {
  let component: PetOwnerListComponent;
  let fixture: ComponentFixture<PetOwnerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetOwnerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetOwnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
