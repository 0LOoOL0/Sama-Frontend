import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdddivPicturePage } from './adddiv-picture.page';

describe('AdddivPicturePage', () => {
  let component: AdddivPicturePage;
  let fixture: ComponentFixture<AdddivPicturePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddivPicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
