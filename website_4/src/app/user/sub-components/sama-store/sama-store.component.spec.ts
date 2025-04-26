import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamaStoreComponent } from './sama-store.component';

describe('SamaStoreComponent', () => {
  let component: SamaStoreComponent;
  let fixture: ComponentFixture<SamaStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamaStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamaStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
