import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectProviderTypePage } from './select-provider-type.page';

describe('SelectProviderTypePage', () => {
  let component: SelectProviderTypePage;
  let fixture: ComponentFixture<SelectProviderTypePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProviderTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
