import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportSiComponent } from './support-si.component';

describe('SupportSiComponent', () => {
  let component: SupportSiComponent;
  let fixture: ComponentFixture<SupportSiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportSiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportSiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
