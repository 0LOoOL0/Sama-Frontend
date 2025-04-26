import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollarMainPageComponent } from './collar-main-page.component';

describe('CollarMainPageComponent', () => {
  let component: CollarMainPageComponent;
  let fixture: ComponentFixture<CollarMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollarMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollarMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
