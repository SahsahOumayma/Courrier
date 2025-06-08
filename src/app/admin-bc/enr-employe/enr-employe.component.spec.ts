import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrEmployeComponent } from './enr-employe.component';

describe('EnrEmployeComponent', () => {
  let component: EnrEmployeComponent;
  let fixture: ComponentFixture<EnrEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrEmployeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
