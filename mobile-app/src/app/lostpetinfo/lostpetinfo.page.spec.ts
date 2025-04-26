import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LostpetinfoPage } from './lostpetinfo.page';

describe('LostpetinfoPage', () => {
  let component: LostpetinfoPage;
  let fixture: ComponentFixture<LostpetinfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LostpetinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
