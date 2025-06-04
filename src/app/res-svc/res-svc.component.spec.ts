import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResSvcComponent } from './res-svc.component';

describe('ResSvcComponent', () => {
  let component: ResSvcComponent;
  let fixture: ComponentFixture<ResSvcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResSvcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResSvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
