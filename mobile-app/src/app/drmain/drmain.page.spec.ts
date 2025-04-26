import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrmainPage } from './drmain.page';

describe('DrmainPage', () => {
  let component: DrmainPage;
  let fixture: ComponentFixture<DrmainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DrmainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
