import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookviewPage } from './bookview.page';

describe('BookviewPage', () => {
  let component: BookviewPage;
  let fixture: ComponentFixture<BookviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
