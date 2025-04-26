import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvPage } from './adv.page';

describe('AdvPage', () => {
  let component: AdvPage;
  let fixture: ComponentFixture<AdvPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
