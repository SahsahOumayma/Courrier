import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvcDepartComponent } from './svc-depart.component';

describe('SvcDepartComponent', () => {
  let component: SvcDepartComponent;
  let fixture: ComponentFixture<SvcDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvcDepartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvcDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
