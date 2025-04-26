import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MypetPage } from './mypet.page';

describe('MypetPage', () => {
  let component: MypetPage;
  let fixture: ComponentFixture<MypetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MypetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
