import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangestorePage } from './mangestore.page';

describe('MangestorePage', () => {
  let component: MangestorePage;
  let fixture: ComponentFixture<MangestorePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MangestorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
