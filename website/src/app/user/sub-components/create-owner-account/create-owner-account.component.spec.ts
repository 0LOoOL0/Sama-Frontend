import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOwnerAccountComponent } from './create-owner-account.component';

describe('CreateOwnerAccountComponent', () => {
  let component: CreateOwnerAccountComponent;
  let fixture: ComponentFixture<CreateOwnerAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOwnerAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOwnerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
