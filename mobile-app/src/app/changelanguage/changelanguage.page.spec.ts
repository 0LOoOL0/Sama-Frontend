import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangelanguagePage } from './changelanguage.page';

describe('ChangelanguagePage', () => {
  let component: ChangelanguagePage;
  let fixture: ComponentFixture<ChangelanguagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangelanguagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
