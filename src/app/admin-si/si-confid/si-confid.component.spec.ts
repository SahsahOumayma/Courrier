import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiConfidComponent } from './si-confid.component';

describe('SiConfidComponent', () => {
  let component: SiConfidComponent;
  let fixture: ComponentFixture<SiConfidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiConfidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiConfidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
