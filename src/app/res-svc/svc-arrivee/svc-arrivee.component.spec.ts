import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvcArriveeComponent } from './svc-arrivee.component';

describe('SvcArriveeComponent', () => {
  let component: SvcArriveeComponent;
  let fixture: ComponentFixture<SvcArriveeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvcArriveeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvcArriveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
