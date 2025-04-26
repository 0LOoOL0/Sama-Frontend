import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LostformPage } from './lostform.page';

describe('LostformPage', () => {
  let component: LostformPage;
  let fixture: ComponentFixture<LostformPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LostformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
