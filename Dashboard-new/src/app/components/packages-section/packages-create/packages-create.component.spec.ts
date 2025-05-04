import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesCreateComponent } from './packages-create.component';

describe('PackagesCreateComponent', () => {
  let component: PackagesCreateComponent;
  let fixture: ComponentFixture<PackagesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
