import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsEmployeComponent } from './cons-employe.component';

describe('ConsEmployeComponent', () => {
  let component: ConsEmployeComponent;
  let fixture: ComponentFixture<ConsEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsEmployeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
