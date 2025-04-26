import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHealthComponent } from './edit-health.component';

describe('EditHealthComponent', () => {
  let component: EditHealthComponent;
  let fixture: ComponentFixture<EditHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHealthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
