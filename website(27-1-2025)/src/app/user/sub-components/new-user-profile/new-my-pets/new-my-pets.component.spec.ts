import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMyPetsComponent } from './new-my-pets.component';

describe('NewMyPetsComponent', () => {
  let component: NewMyPetsComponent;
  let fixture: ComponentFixture<NewMyPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMyPetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMyPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
