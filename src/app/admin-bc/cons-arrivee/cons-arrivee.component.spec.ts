import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsArriveeComponent } from './cons-arrivee.component';

describe('ConsArriveeComponent', () => {
  let component: ConsArriveeComponent;
  let fixture: ComponentFixture<ConsArriveeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsArriveeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsArriveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
