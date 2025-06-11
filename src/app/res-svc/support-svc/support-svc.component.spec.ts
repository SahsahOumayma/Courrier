import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportSvcComponent } from './support-svc.component';

describe('SupportSvcComponent', () => {
  let component: SupportSvcComponent;
  let fixture: ComponentFixture<SupportSvcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportSvcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportSvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
