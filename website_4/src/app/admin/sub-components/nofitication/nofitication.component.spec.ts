import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NofiticationComponent } from './nofitication.component';

describe('NofiticationComponent', () => {
  let component: NofiticationComponent;
  let fixture: ComponentFixture<NofiticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NofiticationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NofiticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
