import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcDashboardComponent } from './bc-dashboard.component';

describe('BcDashboardComponent', () => {
  let component: BcDashboardComponent;
  let fixture: ComponentFixture<BcDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BcDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BcDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
