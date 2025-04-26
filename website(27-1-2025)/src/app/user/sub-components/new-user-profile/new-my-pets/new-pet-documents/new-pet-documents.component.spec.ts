import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPetDocumentsComponent } from './new-pet-documents.component';

describe('NewPetDocumentsComponent', () => {
  let component: NewPetDocumentsComponent;
  let fixture: ComponentFixture<NewPetDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPetDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPetDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
