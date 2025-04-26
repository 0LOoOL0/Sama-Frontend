import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountTypePage } from './account-type.page';

describe('AccountTypePage', () => {
  let component: AccountTypePage;
  let fixture: ComponentFixture<AccountTypePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
