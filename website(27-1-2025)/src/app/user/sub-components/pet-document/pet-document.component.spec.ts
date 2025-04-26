import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDocumentComponent } from './pet-document.component';

describe('PetDocumentComponent', () => {
  let component: PetDocumentComponent;
  let fixture: ComponentFixture<PetDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetDocumentComponent]
    });
    fixture = TestBed.createComponent(PetDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
