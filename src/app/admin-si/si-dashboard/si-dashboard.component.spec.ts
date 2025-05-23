import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiDashboardComponent } from './si-dashboard.component';

describe('SiDashboardComponent', () => {
  let component: SiDashboardComponent;
  let fixture: ComponentFixture<SiDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
