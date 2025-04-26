import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProviderProfile1Page } from './provider-profile1.page';

describe('ProviderProfile1Page', () => {
  let component: ProviderProfile1Page;
  let fixture: ComponentFixture<ProviderProfile1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderProfile1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
