import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRolesManagementComponent } from './dashboard-roles-management.component';

describe('DashboardRolesManagementComponent', () => {
  let component: DashboardRolesManagementComponent;
  let fixture: ComponentFixture<DashboardRolesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRolesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRolesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
