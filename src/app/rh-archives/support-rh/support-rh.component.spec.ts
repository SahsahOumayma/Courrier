import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportRhComponent } from './support-rh.component';

describe('SupportRhComponent', () => {
  let component: SupportRhComponent;
  let fixture: ComponentFixture<SupportRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportRhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
