import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrDepartComponent } from './enr-depart.component';

describe('EnrDepartComponent', () => {
  let component: EnrDepartComponent;
  let fixture: ComponentFixture<EnrDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrDepartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
