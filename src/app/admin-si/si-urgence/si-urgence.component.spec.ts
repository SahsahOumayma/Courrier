import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiUrgenceComponent } from './si-urgence.component';

describe('SiUrgenceComponent', () => {
  let component: SiUrgenceComponent;
  let fixture: ComponentFixture<SiUrgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiUrgenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiUrgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
