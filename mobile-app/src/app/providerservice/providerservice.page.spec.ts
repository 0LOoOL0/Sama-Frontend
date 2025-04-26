import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProviderservicePage } from './providerservice.page';

describe('ProviderservicePage', () => {
  let component: ProviderservicePage;
  let fixture: ComponentFixture<ProviderservicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderservicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
