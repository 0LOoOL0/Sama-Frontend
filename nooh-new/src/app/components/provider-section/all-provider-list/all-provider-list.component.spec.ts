import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProviderListComponent } from './all-provider-list.component';

describe('AllProviderListComponent', () => {
  let component: AllProviderListComponent;
  let fixture: ComponentFixture<AllProviderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProviderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
