import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvcDashComponent } from './svc-dash.component';

describe('SvcDashComponent', () => {
  let component: SvcDashComponent;
  let fixture: ComponentFixture<SvcDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvcDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvcDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
