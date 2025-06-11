import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportDelComponent } from './support-del.component';

describe('SupportDelComponent', () => {
  let component: SupportDelComponent;
  let fixture: ComponentFixture<SupportDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportDelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
