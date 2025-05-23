import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrArriveeComponent } from './enr-arrivee.component';

describe('EnrArriveeComponent', () => {
  let component: EnrArriveeComponent;
  let fixture: ComponentFixture<EnrArriveeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrArriveeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrArriveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
