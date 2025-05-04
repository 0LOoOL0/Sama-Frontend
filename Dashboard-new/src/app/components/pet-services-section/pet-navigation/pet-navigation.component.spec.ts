import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetNavigationComponent } from './pet-navigation.component';

describe('PetNavigationComponent', () => {
  let component: PetNavigationComponent;
  let fixture: ComponentFixture<PetNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
