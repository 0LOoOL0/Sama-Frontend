import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatingProfileComponent } from './mating-profile.component';

describe('MatingProfileComponent', () => {
  let component: MatingProfileComponent;
  let fixture: ComponentFixture<MatingProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatingProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatingProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
