import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportBcComponent } from './support-bc.component';

describe('SupportBcComponent', () => {
  let component: SupportBcComponent;
  let fixture: ComponentFixture<SupportBcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportBcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportBcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
